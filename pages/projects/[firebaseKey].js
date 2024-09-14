import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'react-bootstrap/Image';
// import Button from 'react-bootstrap/Button';
import { getSingleProject } from '../../api/projectData';

export default function ViewProject() {
  const [projectDetails, setProjectDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleProject(firebaseKey).then(setProjectDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <Image src={projectDetails.image} thumbnail />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {projectDetails.name}
        </h5>
        <p> {projectDetails.progress_id}
        </p>
        <p>{projectDetails.notes}</p>
        <hr />

      </div>
    </div>
  );
}
