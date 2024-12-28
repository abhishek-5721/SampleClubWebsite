// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZN2ZKBclS2HudX2stHNJtiIRJjGTpGAw",
  authDomain: "clubwebsite-1f787.firebaseapp.com",
  databaseURL: "https://clubwebsite-1f787-default-rtdb.firebaseio.com",
  projectId: "clubwebsite-1f787",
  storageBucket: "clubwebsite-1f787.firebasestorage.app",
  messagingSenderId: "415269066484",
  appId: "1:415269066484:web:c9bfa106e3268e46dbf0a1"
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
