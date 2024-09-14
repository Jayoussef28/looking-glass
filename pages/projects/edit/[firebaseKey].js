import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleProject } from '../../../api/projectData';
import ProjectForm from '../../../components/forms/ProjectForm';

export default function EditProject() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleProject(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<ProjectForm obj={editItem} />);
}
