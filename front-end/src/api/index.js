// Capa API principal (Firebase Firestore -> Firebase Services)
// Consumimos los servicios desde firebaseService.js
// Endpoints: /api/mentors, /api/courses, etc. ahora usan Firebase

import { 
  getMentorsFirebase, 
  getMentorFirebase, 
  createMentorFirebase, 
  updateMentorFirebase, 
  deleteMentorFirebase, 
  getUsersFirebase, 
  getUserFirebase, 
  createUserFirebase, 
  updateUserFirebase, 
  deleteUserFirebase 
} from '../services/firebaseService';

/* ---------------------- MENTORS ---------------------- */
export async function getMentors(query = "") {
  return await getMentorsFirebase();
}

export async function getMentor(id) {
  return await getMentorFirebase(id);
}

export async function createMentor(data) {
  return await createMentorFirebase(data);
}

export async function updateMentor(id, data) {
  return await updateMentorFirebase(id, data);
}

export async function deleteMentor(id) {
  return await deleteMentorFirebase(id);
}

/* ---------------------- USERS ---------------------- */
export async function getUsers(query = "") {
  return await getUsersFirebase();
}

export async function getUser(id) {
  return await getUserFirebase(id);
}

export async function createUser(data) {
  return await createUserFirebase(data);
}

export async function updateUser(id, data) {
  return await updateUserFirebase(id, data);
}

export async function deleteUser(id) {
  return await deleteUserFirebase(id);
}

/* ---------------------- COURSES ---------------------- */
// TODO: Implementar en firebaseService.js
export async function getCourses(query = "") {
  throw new Error("Courses not implemented yet in Firebase");
}

export async function getCourse(id) {
  throw new Error("Courses not implemented yet in Firebase");
}

export async function createCourse(data) {
  throw new Error("Courses not implemented yet in Firebase");
}

export async function updateCourse(id, data) {
  throw new Error("Courses not implemented yet in Firebase");
}

export async function deleteCourse(id) {
  throw new Error("Courses not implemented yet in Firebase");
}

/* ---------------------- BOOKINGS ---------------------- */
// TODO: Implementar en firebaseService.js
export async function createBooking(data) {
  throw new Error("Bookings not implemented yet in Firebase");
}
