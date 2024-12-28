// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: functions.config().firebase.firebase_api_key,
  authDomain: functions.config().firebase.firebase_authdomain,
  databaseURL: functions.config().firebase.database_url,
  projectId: functions.config().firebase.firebase_project_id,
  storageBucket: functions.config().firebase.storage_bucket,
  messagingSenderId: functions.config().firebase.messenger_id,
  appId: functions.config().firebase.app_id
};

// Initialize Firebase app and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Handle form submission
document.getElementById("contact-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = e.target.name.value.trim();
  const collegeId = e.target.collegeId.value.trim();
  const registration = e.target.registration.value.trim();
  const feedback = e.target.feedback.value.trim();

  if (!name || !collegeId || !registration || !feedback) {
    alert("Please fill out all fields.");
    return;
  }

  try {
    const docRef = await addDoc(collection(db, "feedbacks"), {
      name,
      collegeId,
      registration,
      feedback,
      timestamp: serverTimestamp(),
    });
    console.log("Feedback submitted with ID:", docRef.id);
    alert("Feedback submitted successfully!");
    e.target.reset();
  } catch (error) {
    console.error("Error submitting feedback:", error);
    alert("Error: Unable to submit feedback.");
  }
});
