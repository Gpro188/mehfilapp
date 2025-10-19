const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0'; // Bind to all interfaces

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'build')));

// For any other routes, serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/results', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
  console.log(`Local access: http://localhost:${PORT}`);
  console.log(`Network access: http://YOUR_IP_ADDRESS:${PORT}`);
});