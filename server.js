const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Application = require('./models/application');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/admissionDB')
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// HTML Routes
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views', 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views', 'admin.html'));
});

// API Routes
// 1. Submit an application (Student)
app.post('/api/apply', async (req, res) => {
    try {
        const newApplication = new Application(req.body);
        await newApplication.save();
        res.send('<script>alert("Application Submitted Successfully!"); window.location.href="/";</script>');
    } catch (err) {
        res.status(400).send('Error submitting application: ' + err.message);
    }
});

// 2. Get all applications (Admin)
app.get('/api/applications', async (req, res) => {
    try {
        const apps = await Application.find();
        res.json(apps);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Admission Portal running on http://localhost:${PORT}`));