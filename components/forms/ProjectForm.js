import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createProject, updateProject, getProgress } from '../../api/projectData';

const initialState = {
  name: '',
  image: '',
  progress_name: '',
  notes: '',
};
// function that sets empty array or initial state for form inputs to go.
function ProjectForm({ obj }) { // Project from component
  const [formInput, setFormInput] = useState(initialState);
  // sets form at initial state
  const [progresses, setProgress] = useState([]);
  // sets progress state to an empty array
  const router = useRouter();
  // provides routing functions
  const { user } = useAuth();

  useEffect(() => {
    getProgress(user.uid).then(setProgress);
    // hook task used to fetch progress data and update the state with result
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);
  // updates the form input if obj.firebaseKey exists
  const handleChange = (e) => { // function designed to update form input state whenever a form value changes.
    const { name, value } = e.target; // destructures name and value of input feild from event object
    setFormInput((prevState) => ({ // updates form input state and updates specific field with new value
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // arrow function designed to handle form submissions with event as parameter
    e.preventDefault(); // stops form from preforming default submission
    if (obj.firebaseKey) { // if present updates existing
      updateProject(formInput).then(() => router.push('/projects'));
    } else { // if not present creates new project
      const payload = { ...formInput, uid: user.uid }; // creates new object payload that adds the uid of user and then uses to creates new project
      createProject(payload).then(({ name }) => { // calls create project function then destructures returned object to get name property (unique identifier in new project in firebase)
        const patchPayload = { firebaseKey: name }; // creates patch payload object that contains firebaseKey with new projects name.
        updateProject(patchPayload).then(() => { // calls update project function which updates new project with unique firebase key.
          router.push('/projects'); // routes to projects page
        });
      });
    }
  };

  return ( // defines components rendered output
    <Form onSubmit={handleSubmit}> {/* renders form component */}
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Project</h2>

      {/* NAME INPUT  */}
      <Form.Group controlId="floatingInput2" className="mb-3">
        <Form.Label> Project Name</Form.Label>
        <Form.Control
          className="height50"
          type="text"
          placeholder="Enter Project Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      {/* IMAGE INPUT  */}
      <Form.Group controlId="floatingInput1" className="mb-3">
        <Form.Label>Project/Pattern Image</Form.Label>
        <Form.Control
          className="height50"
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
        />
      </Form.Group>

      {/* PROGRESS SELECT */}
      <Form.Group controlId="floatingSelect">
        <Form.Label>Progress</Form.Label>
        <Form.Select
          name="progress_id" // sets name attribute whish is used in handleChange to identify imput field //
          onChange={handleChange} // attach handle change function
          className="mb-3 height50"
          value={formInput.progress_id} // sets current value of input feild based on form input sate //
          required
        >
          <option value="">Select Progress</option>
          {
            progresses.map((progress) => ( // maps over array
              <option
                key={progress.progress_id} // sets unique key for each option
                value={progress.progress_id}
              >
                {progress.progress_name}
              </option>
            ))
          }
        </Form.Select>
      </Form.Group>

      {/* DESCRIPTION TEXTAREA  */}
      <Form.Group controlId="floatingTextarea" label="Notes" className="mb-3">
        <Form.Label>Notes</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Notes"
          style={{ height: '100px' }}
          name="notes"
          value={formInput.notes}
          onChange={handleChange}
          required
        />
      </Form.Group>

      {/* SUBMIT BUTTON  */}
      <Button type="submit" className="copy-btn">{obj.firebaseKey ? 'Update' : 'Create'} Project</Button>
    </Form>
  );
}

ProjectForm.propTypes = {
  obj: PropTypes.shape({ // defines the structure of the prop
    name: PropTypes.string,
    image: PropTypes.string,
    progress_name: PropTypes.string,
    notes: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

ProjectForm.defaultProps = { // provides default values for properties
  obj: initialState,
};

export default ProjectForm;
