const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const requestIp = require('request-ip');
const couponRoutes = require('./routes/coupons');

const app = express();

// CORS Configuration
const corsOptions = {
  origin: 'https://coupon-redeem-iota.vercel.app', // Allow requests from the frontend (React app)
  credentials: true, // Allow cookies to be sent with requests
  methods: 'GET,POST,PUT,DELETE', // Allowed methods
  allowedHeaders: 'Content-Type, Authorization', // Allowed headers
};

// Middleware
app.use(cors(corsOptions)); // Use the CORS middleware with the specified options
app.use(express.json());
app.use(cookieParser());
app.use(requestIp.mw());

// Use routes
app.use('/api/coupons', couponRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
