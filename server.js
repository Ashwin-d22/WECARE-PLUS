const express = require("express");
const path = require("path");
const Database = require("better-sqlite3");

const app = express();
const PORT = process.env.PORT || 3000;
const db = new Database(path.join(__dirname, "data", "wecare-plus.db"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

db.exec(`
CREATE TABLE IF NOT EXISTS hospitals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  address TEXT,
  city TEXT,
  phone TEXT,
  latitude REAL,
  longitude REAL,
  emergency INTEGER DEFAULT 0
);
CREATE TABLE IF NOT EXISTS beds (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  hospital_id INTEGER NOT NULL,
  bed_type TEXT NOT NULL,
  total INTEGER DEFAULT 0,
  available INTEGER DEFAULT 0,
  FOREIGN KEY(hospital_id) REFERENCES hospitals(id)
);
CREATE TABLE IF NOT EXISTS doctors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  hospital_id INTEGER,
  experience TEXT,
  phone TEXT,
  FOREIGN KEY(hospital_id) REFERENCES hospitals(id)
);
CREATE TABLE IF NOT EXISTS appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  booking_id TEXT UNIQUE NOT NULL,
  patient_name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT,
  hospital_id INTEGER,
  doctor_id INTEGER,
  appointment_date TEXT NOT NULL,
  appointment_time TEXT NOT NULL,
  consultation_type TEXT,
  status TEXT DEFAULT 'Confirmed',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  report_id TEXT UNIQUE NOT NULL,
  patient_name TEXT,
  patient_dob TEXT,
  report_date TEXT,
  report_type TEXT,
  status TEXT DEFAULT 'Available'
);
`);

app.get("/api/health", (req, res) => res.json({ ok: true, app: "WECARE PLUS" }));
app.get("/api/hospitals", (req, res) => {
  res.json(db.prepare("SELECT * FROM hospitals ORDER BY name").all());
});
app.get("/api/beds", (req, res) => {
  res.json(db.prepare(`
    SELECT b.*, h.name AS hospital_name
    FROM beds b JOIN hospitals h ON h.id=b.hospital_id
    ORDER BY h.name, b.bed_type
  `).all());
});
app.get("/api/doctors", (req, res) => {
  res.json(db.prepare(`
    SELECT d.*, h.name AS hospital_name
    FROM doctors d LEFT JOIN hospitals h ON h.id=d.hospital_id
    ORDER BY d.name
  `).all());
});

app.post("/api/appointments", (req, res) => {
  const {
    patient_name, mobile, email, hospital_id, doctor_id,
    appointment_date, appointment_time, consultation_type
  } = req.body;

  if (!patient_name || !mobile || !appointment_date || !appointment_time) {
    return res.status(400).json({ error: "Patient name, mobile, date and time are required." });
  }

  const booking_id = "WCP-" + Date.now().toString(36).toUpperCase();
  const stmt = db.prepare(`
    INSERT INTO appointments
    (booking_id,patient_name,mobile,email,hospital_id,doctor_id,appointment_date,appointment_time,consultation_type)
    VALUES (?,?,?,?,?,?,?,?,?)
  `);
  stmt.run(
    booking_id, patient_name, mobile, email || null,
    hospital_id || null, doctor_id || null,
    appointment_date, appointment_time, consultation_type || "In-person"
  );

  res.status(201).json({
    booking_id,
    status: "Confirmed",
    message: "Appointment booked successfully."
  });
});

app.get("/api/appointments/:bookingId", (req, res) => {
  const row = db.prepare(`
    SELECT a.*, h.name AS hospital_name, d.name AS doctor_name, d.specialty
    FROM appointments a
    LEFT JOIN hospitals h ON h.id=a.hospital_id
    LEFT JOIN doctors d ON d.id=a.doctor_id
    WHERE a.booking_id=?
  `).get(req.params.bookingId);

  if (!row) return res.status(404).json({ error: "Booking not found." });
  res.json(row);
});

app.post("/api/reports", (req, res) => {
  const report_id = req.body.report_id || ("LAB-" + Date.now().toString(36).toUpperCase());
  const { patient_name, patient_dob, report_date, report_type } = req.body;
  db.prepare(`
    INSERT OR REPLACE INTO reports(report_id,patient_name,patient_dob,report_date,report_type)
    VALUES(?,?,?,?,?)
  `).run(report_id, patient_name || null, patient_dob || null, report_date || null, report_type || "Diagnostic");
  res.status(201).json({ report_id, status: "Available" });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`WECARE PLUS running at http://localhost:${PORT}`);
});
