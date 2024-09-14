import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteProject } from '../../api/projectData';

function ProjectCard({ projectObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE PROJECT AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS
  const deleteThisProject = () => {
    if (window.confirm(`Delete ${projectObj.name}?`)) {
      deleteProject(projectObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={projectObj.image} alt={projectObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{projectObj.name}</Card.Title>
        {/* DYNAMIC LINK TO VIEW THE PROJECT DETAILS  */}
        <Link href={`/projects/${projectObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE PROJECT DETAILS  */}
        <Link href={`/projects/edit/${projectObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisProject} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

ProjectCard.propTypes = {
  projectObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    sale: PropTypes.bool,
    price: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ProjectCard;
