// program-resource.api.js
import api from '../config/axios.config';

/* ================= PROGRAM APIs ================= */

export const getPrograms = () => api.get('/programs/');

export const getProgramById = (id) =>
  api.get(`/programs/${id}`);

export const createProgram = (programData) =>
  api.post('/programs/', programData);

export const updateProgram = (id, programData) =>
  api.put(`/programs/${id}`, programData);

export const submitProgramForApproval = (programId) =>
  api.patch(`/programs/${programId}/submit`);

export const approveProgram = (programId) =>
  api.patch(`/programs/${programId}/approve`);

export const changeProgramStatus = (programId, status) =>
  api.patch(`/programs/${programId}/status/${status}`);

export const deleteProgram = (id) =>
  api.delete(`/programs/${id}`);


/* ================= RESOURCE APIs ================= */

export const getAllResources = () =>
  api.get('/resources/');

export const getResourceById = (id) =>
  api.get(`/resources/${id}`);

export const getResourcesByProgram = (programId) =>
  api.get('/resources', {
    params: { programId }
  });

export const addResource = (resourceData) =>
  api.post('/resources/', resourceData);

export const changeResourceStatus = (resourceId, status) =>
  api.patch(`/resources/${resourceId}`, null, {
    params: { status }
  });

export const allocateResource = (resourceId) =>
  api.patch(`/resources/${resourceId}/allocate`);

export const deleteResource = (resourceId) =>
  api.delete(`/resources/${resourceId}`);

export const getProgramUtilization = (programId) =>
  api.get(`/resources/${programId}/utilizations`);