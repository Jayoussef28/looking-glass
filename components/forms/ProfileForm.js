import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createProfile, updateProfile } from '../../api/profileData';

const initialState = {
  user_name: '',
  image: '',
  email: '',
  bio: '',
};

function ProfileForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
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
      updateProfile(formInput).then(() => router.push(`/profile/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createProfile(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateProfile(patchPayload).then(() => {
          router.push('/profile');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Profile</h2>

      {/* USERNAME INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Username" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Username"
          name="user_name"
          value={formInput.user_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Profile Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* Email INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Email" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter email"
          name="email"
          value={formInput.email}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* BIO TEXTAREA  */}
      <FloatingLabel controlId="floatingTextarea" label="Bio" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="bio"
          style={{ height: '100px' }}
          name="bio"
          value={formInput.bio}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit" className="copy-btn">{obj.firebaseKey ? 'Update' : 'Create'} Profile</Button>
    </Form>
  );
}

ProfileForm.propTypes = {
  obj: PropTypes.shape({
    user_name: PropTypes.string,
    image: PropTypes.string,
    email: PropTypes.string,
    bio: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};
ProfileForm.defaultProps = {
  obj: initialState,
};

export default ProfileForm;
