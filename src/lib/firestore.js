import { db } from "./firebase";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

// ── PROFILE ──────────────────────────────────────────────────────────────────
export async function getProfile() {
  const snap = await getDoc(doc(db, "site", "profile"));
  return snap.exists() ? snap.data() : null;
}
export async function saveProfile(data) {
  await setDoc(doc(db, "site", "profile"), { ...data, updatedAt: serverTimestamp() }, { merge: true });
}

// ── PUBLICATIONS ─────────────────────────────────────────────────────────────
export async function getPublications() {
  const snap = await getDocs(collection(db, "publications"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
export async function addPublication(data) {
  return await addDoc(collection(db, "publications"), { ...data, createdAt: serverTimestamp() });
}
export async function updatePublication(id, data) {
  await updateDoc(doc(db, "publications", id), { ...data, updatedAt: serverTimestamp() });
}
export async function deletePublication(id) {
  await deleteDoc(doc(db, "publications", id));
}

// ── RESEARCH INTERESTS ────────────────────────────────────────────────────────
export async function getResearchInterests() {
  const snap = await getDocs(collection(db, "research_interests"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
export async function saveResearchInterest(id, data) {
  await setDoc(doc(db, "research_interests", id), { ...data, updatedAt: serverTimestamp() }, { merge: true });
}
export async function deleteResearchInterest(id) {
  await deleteDoc(doc(db, "research_interests", id));
}

// ── EXPERIENCE ────────────────────────────────────────────────────────────────
export async function getExperiences() {
  const snap = await getDocs(collection(db, "experiences"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
export async function addExperience(data) {
  return await addDoc(collection(db, "experiences"), { ...data, createdAt: serverTimestamp() });
}
export async function updateExperience(id, data) {
  await updateDoc(doc(db, "experiences", id), { ...data, updatedAt: serverTimestamp() });
}
export async function deleteExperience(id) {
  await deleteDoc(doc(db, "experiences", id));
}

// ── EDUCATION ─────────────────────────────────────────────────────────────────
export async function getEducation() {
  const snap = await getDocs(collection(db, "education"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
export async function addEducation(data) {
  return await addDoc(collection(db, "education"), { ...data, createdAt: serverTimestamp() });
}
export async function updateEducation(id, data) {
  await updateDoc(doc(db, "education", id), { ...data, updatedAt: serverTimestamp() });
}
export async function deleteEducation(id) {
  await deleteDoc(doc(db, "education", id));
}

// ── CONFERENCES ───────────────────────────────────────────────────────────────
export async function getConferences() {
  const snap = await getDocs(collection(db, "conferences"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
export async function addConference(data) {
  return await addDoc(collection(db, "conferences"), { ...data, createdAt: serverTimestamp() });
}
export async function updateConference(id, data) {
  await updateDoc(doc(db, "conferences", id), { ...data, updatedAt: serverTimestamp() });
}
export async function deleteConference(id) {
  await deleteDoc(doc(db, "conferences", id));
}

// ── AWARDS ────────────────────────────────────────────────────────────────────
export async function getAwards() {
  const snap = await getDocs(collection(db, "awards"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
export async function addAward(data) {
  return await addDoc(collection(db, "awards"), { ...data, createdAt: serverTimestamp() });
}
export async function updateAward(id, data) {
  await updateDoc(doc(db, "awards", id), { ...data, updatedAt: serverTimestamp() });
}
export async function deleteAward(id) {
  await deleteDoc(doc(db, "awards", id));
}

// ── NEWS COVERAGE ─────────────────────────────────────────────────────────────
export async function getNewsCoverage() {
  const snap = await getDocs(collection(db, "news_coverage"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
export async function addNews(data) {
  return await addDoc(collection(db, "news_coverage"), { ...data, createdAt: serverTimestamp() });
}
export async function updateNews(id, data) {
  await updateDoc(doc(db, "news_coverage", id), { ...data, updatedAt: serverTimestamp() });
}
export async function deleteNews(id) {
  await deleteDoc(doc(db, "news_coverage", id));
}

// ── SKILLS ────────────────────────────────────────────────────────────────────
export async function getSkills() {
  const snap = await getDoc(doc(db, "site", "skills"));
  return snap.exists() ? snap.data() : null;
}
export async function saveSkills(data) {
  await setDoc(doc(db, "site", "skills"), { ...data, updatedAt: serverTimestamp() }, { merge: true });
}

// ── MEMBERSHIPS ───────────────────────────────────────────────────────────────
export async function getMemberships() {
  const snap = await getDocs(collection(db, "memberships"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
export async function addMembership(data) {
  return await addDoc(collection(db, "memberships"), { ...data, createdAt: serverTimestamp() });
}
export async function deleteMembership(id) {
  await deleteDoc(doc(db, "memberships", id));
}
