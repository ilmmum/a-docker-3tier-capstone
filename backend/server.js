const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://mongodb:27017/dockerapp';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch(err => console.log('❌ MongoDB Connection Error:', err));

// Health Check Endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'backend-api',
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// Root Endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Docker 3-Tier Application API',
        endpoints: {
            health: '/health',
            api: '/api'
        }
    });
});

// Sample Data Endpoint
app.get('/api/data', async (req, res) => {
    res.json({
        message: 'Sample data from backend',
        data: [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' }
        ]
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});