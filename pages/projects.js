/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { Button } from 'react-bootstrap';
import { getProjects } from '../api/projectData';
import { useAuth } from '../utils/context/authContext';
import ProjectCard from '../components/cards/ProjectCard';

function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  const { user } = useAuth();

  const getAllTheProjects = () => {
    getProjects(user.uid).then(setProjects);
  };

  useEffect(() => {
    getAllTheProjects();
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {projects.map((project) => (
        <ProjectCard key={project.progress_id} projectObj={project} onUpdate={getAllTheProjects} />
      ))}
    </div>

  );
}

export default ProjectsPage;
