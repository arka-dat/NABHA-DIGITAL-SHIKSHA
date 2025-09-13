const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

// In-memory user store (replace with DB in production)
const users = [];

app.use(cors());
app.use(bodyParser.json());

// Sign Up Endpoint
app.post('/api/student-signup', (req, res) => {
    const { name, class: studentClass, password } = req.body;
    if (!name || !studentClass || !password) {
        return res.json({ success: false, message: 'All fields required.' });
    }
    // Check if user exists
    if (users.find(u => u.name === name && u.class === studentClass)) {
        return res.json({ success: false, message: 'User already exists.' });
    }
    users.push({ name, class: studentClass, password });
    res.json({ success: true });
});

// Login Endpoint
app.post('/api/student-login', (req, res) => {
    const { name, password } = req.body;
    const user = users.find(u => u.name === name && u.password === password);
    if (user) {
        res.json({ success: true, user: { name: user.name, class: user.class } });
    } else {
        res.json({ success: false, message: 'Invalid credentials.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
