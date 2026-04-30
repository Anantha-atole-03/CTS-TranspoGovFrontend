// program resource api calls
import api from '../config/axios.config';

function getPrograms() {
    return api.get('/programs/');
}

function getProgramById(id) {
    return api.get(`/programs/${id}/`);
}

function createProgram(programData) {
    return  api.post('/programs/', programData);
}
    
async function updateProgram(id, programData) {
    return await api.put(`/programs/${id}/`, programData);
}

async function submitProgramForApproval(programId) {
    return await api.patch(`/programs/${programId}/submit`);
}

async function approveProgram(programId) {
    return await api.patch(`/programs/${programId}/approve`);
}

async function changeProgramStatus(status, programId) {
    return await api.patch(`/programs/${programId}/status/${status}`);
}

function deleteProgram(id) {
    return api.delete(`/programs/${id}/`);
}

function getProgramResources(programId) {
    return api.get(`/programs/${programId}/resources/`);
}

function addResourceToProgram(programId, resourceData) {
    return api.post(`/programs/${programId}/resources/`, resourceData);
}

function getAllResources() {
    return api.get('/resources/');
}
    
export { getPrograms, getProgramById, createProgram, updateProgram, submitProgramForApproval, approveProgram, changeProgramStatus, deleteProgram, getProgramResources, addResourceToProgram , getAllResources};