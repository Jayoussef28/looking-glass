import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getProjects = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/projects.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteProject = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/projects/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getSingleProject = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/projects/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createProject = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/projects.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateProject = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/projects/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getProgress = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/progress.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const viewProjectDetails = (projectsFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleProject(projectsFirebaseKey), getProjects(projectsFirebaseKey)])
    .then(([progressObject, progressProjectArray]) => {
      resolve({ ...progressObject, project: progressProjectArray });
    }).catch((error) => reject(error));
});
export {
  getProjects,
  createProject,
  deleteProject,
  getSingleProject,
  updateProject,
  getProgress,
  viewProjectDetails,
};
