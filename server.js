const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

let patients = [];
let tokenNumber = 1;

// 🧠 AI Priority Logic (Simple)
function calculatePriority(patient) {
  let score = 0;
  if (patient.emergency) score += 50;
  if (patient.age > 60) score += 20;
  return score;
}

// 📝 Patient Registration
app.post("/register", (req, res) => {
  const patient = req.body;

  patient.token = tokenNumber++;
  patient.priority = calculatePriority(patient);

  patients.push(patient);

  // Sort queue by priority
  patients.sort((a, b) => b.priority - a.priority);

  res.json({
    message: "Patient Registered",
    token: patient.token
  });
});

// 📊 Get Queue (Admin Dashboard)
app.get("/queue", (req, res) => {
  res.json(patients);
});

// 👨‍⚕️ Doctor Availability
let doctorAvailable = true;
app.post("/doctor-status", (req, res) => {
  doctorAvailable = req.body.available;
  res.json({ doctorAvailable });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
