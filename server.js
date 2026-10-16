const express = require('express');
const mongoose = require('mongoose');
const path = require('node:path');
const fs = require('node:fs');
const { loadEnvFile } = require('node:process');

const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) loadEnvFile(envPath);

const noteRoutes = require('./routes/NoteRoutes.js');
const app = express();
const PORT = process.env.PORT || 8081;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('<h2>Welcome to the Note taking application - Server root path contents</h2>');
});
app.use('/api', noteRoutes);

app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ message: 'Request body must contain valid JSON' });
    }
    res.status(500).json({ message: 'Server Error' });
});

async function start() {
    if (!process.env.MONGODB_URI) {
        console.error('Set MONGODB_URI in .env before starting the server');
        process.exitCode = 1;
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
        console.log('Successfully connected to the MongoDB Atlas server');
        app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
    } catch (err) {
        console.error('Could not connect to the DB:', err.message);
        process.exitCode = 1;
    }
}

if (require.main === module) start();
module.exports = app;
