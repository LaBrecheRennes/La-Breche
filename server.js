const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Data storage - in a real application, use a database
let registrations = [];
let availableSpots = 50; // Default number of available spots
let totalSpots = 50;

// Load data from file if exists (simple persistence)
try {
  if (fs.existsSync('./data.json')) {
    const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
    registrations = data.registrations || [];
    availableSpots = data.availableSpots || 50;
    totalSpots = data.totalSpots || 50;
    console.log('Data loaded from file');
  }
} catch (err) {
  console.error('Error loading data from file:', err);
}

// Function to save data to file
function saveData() {
  try {
    fs.writeFileSync('./data.json', JSON.stringify({
      registrations,
      availableSpots,
      totalSpots
    }, null, 2));
  } catch (err) {
    console.error('Error saving data to file:', err);
  }
}

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Routes

// Get available spots
app.get('/api/spots', (req, res) => {
  res.json({ availableSpots });
});

// Register new participant
app.post('/api/register', async (req, res) => {
  try {
    const { name, surname, email } = req.body;
    
    // Check if required fields are provided
    if (!name || !surname || !email) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Check if there are available spots
    if (availableSpots <= 0) {
      return res.status(400).json({ error: 'No spots available' });
    }
    
    // Check for duplicate email
    if (registrations.some(reg => reg.email === email)) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    // Add registration
    const newRegistration = {
      name,
      surname,
      email,
      date: new Date()
    };
    
    registrations.push(newRegistration);
    availableSpots -= 1;
    
    // Save data
    saveData();
    
    // Send email notification if env variables are set
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.ADMIN_EMAIL) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.ADMIN_EMAIL,
          subject: 'New Registration',
          html: `
            <h2>New Registration</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Surname:</strong> ${surname}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Available Spots Remaining:</strong> ${availableSpots}</p>
          `
        });
        
        // Also send confirmation to user
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Registration Confirmation',
          html: `
            <h2>Registration Confirmation</h2>
            <p>Hello ${name},</p>
            <p>Thank you for registering. Your registration has been received successfully.</p>
            <p>Best regards,</p>
            <p>The Registration Team</p>
          `
        });
      } catch (emailErr) {
        console.error('Email sending failed:', emailErr);
        // Continue with registration even if email fails
      }
    }
    
    res.status(201).json({ success: true });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin routes

// Get admin stats
app.get('/api/admin/stats', (req, res) => {
  res.json({
    availableSpots,
    totalSpots,
    registeredUsers: registrations.length
  });
});

// Update available spots
app.post('/api/admin/spots', (req, res) => {
  try {
    const { totalSpots: newTotalSpots } = req.body;
    
    if (newTotalSpots === undefined || newTotalSpots < 0) {
      return res.status(400).json({ error: 'Invalid total spots value' });
    }
    
    // Calculate new available spots based on existing registrations
    totalSpots = parseInt(newTotalSpots);
    availableSpots = Math.max(0, totalSpots - registrations.length);
    
    // Save data
    saveData();
    
    res.json({ success: true, availableSpots, totalSpots });
  } catch (err) {
    console.error('Update spots error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all registrations
app.get('/api/admin/registrations', (req, res) => {
  res.json(registrations);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Available spots: ${availableSpots}`);
  console.log(`Total registrations: ${registrations.length}`);
});
