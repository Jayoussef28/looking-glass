import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import Button from 'react-bootstrap/Button';
import { deleteProfile } from '../../api/profileData';

function ProfileCard({ profileObj, onUpdate }) {
  const deleteThisProfile = () => {
    if (window.confirm(`Delete ${profileObj.user_name}?`)) {
      deleteProfile(profileObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (

    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column row no-gutters">
        <Container>
          <Row>
            <Col xs={6} md={-8}>
              <Image src={profileObj.image} thumbnail />
            </Col>
          </Row>
        </Container>
      </div>
      <div className="text-white ms-5 details">
        <h3>{profileObj.user_name}</h3>
        {profileObj.email}
        <p>{profileObj.bio}</p>
        <hr />
        <Button variant="danger" onClick={deleteThisProfile} className="m-2">
          DELETE
        </Button>
      </div>
    </div>

  );
}

ProfileCard.propTypes = {
  profileObj: PropTypes.shape({
    image: PropTypes.string,
    user_name: PropTypes.string,
    email: PropTypes.string,
    bio: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ProfileCard;
