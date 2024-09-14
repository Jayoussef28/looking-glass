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
  notes: '',
};

function ProjectForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [progresses, setProgress] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getProgress(user.uid).then(setProgress);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateProject(formInput).then(() => router.push('/projects'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createProject(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateProject(patchPayload).then(() => {
          router.push('/projects');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
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
          name="progress_id"
          onChange={handleChange}
          className="mb-3 height50"
          value={formInput.progress_id}
          required
        >
          <option value="">Select Progress</option>
          {
            progresses.map((progress) => (
              <option
                key={progress.firebaseKey}
                value={progress.name}
              >
                {progress.name}
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
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Project</Button>
    </Form>
  );
}

ProjectForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    progress_id: PropTypes.string,
    notes: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

ProjectForm.defaultProps = {
  obj: initialState,
};

export default ProjectForm;
