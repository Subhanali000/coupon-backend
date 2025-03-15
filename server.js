const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const requestIp = require('request-ip');
const couponRoutes = require('./routes/coupons'); 

const app = express();

// Middleware
app.use(cors({ origin: 'https://coupon-redeem-iota.vercel.app', credentials: true })); // Allow frontend to access
app.use(express.json());
app.use(cookieParser());
app.use(requestIp.mw()); 

// Use routes
app.use('/api/coupons', couponRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
