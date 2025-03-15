const express = require('express');
const router = express.Router();
const requestIp = require('request-ip');


const coupons = [
    { id: '1', code: 'COUPON623', description: '10% off Valid for 13 days' },
    { id: '2', code: 'COUPON456', description: 'Free shipping Valid for 3 days' },
    { id: '3', code: 'WELCOME45', description: 'Free Car valid for 30 days' },
    { id: '4', code: 'SUMMER21', description: '15% off on your next purchase Valid for 10 days' },
    { id: '5', code: 'DISCOUNT50', description: '50% off on electronics Valid for 7 days' },
    { id: '6', code: 'FREESHIP10', description: 'Free shipping Valid for 15 days' },
    { id: '7', code: 'BIRTHDAY25', description: '25% off on all items Valid for 14 days' },
    { id: '8', code: 'WELCOME2025', description: '10% off your first purchase Valid for 20 days' },
    { id: '9', code: 'SAVEBIG20', description: 'Save 20% on orders over $100 Valid for 12 days' },
    { id: '10', code: 'BUYONEGETONE', description: 'Buy 1 Get 1 Free Valid for 30 days' },
    { id: '11', code: 'FLASHSALE15', description: '15% off Flash Sale Valid for 1 day' },
    { id: '12', code: 'NEWYEAR2025', description: '20% off Valid for 14 days' },
    { id: '13', code: 'EXTRA10', description: 'Extra 10% off on clearance items Valid for 5 days' },
    { id: '14', code: 'COUPON100', description: '100% cashback Valid for 30 days' },
    { id: '15', code: 'BLACKFRIDAY', description: 'Up to 50% off Valid for 2 days' },
    { id: '16', code: 'SHOP40', description: '40% off Valid for 10 days' },
    { id: '17', code: 'CLEARANCE20', description: '20% off on clearance items Valid for 8 days' },
    { id: '18', code: 'HAPPYSALE', description: 'Save 30% on your order Valid for 20 days' },
    { id: '19', code: 'EASTER10', description: '10% off on all orders Valid for 5 days' },
    { id: '20', code: 'WINTER10', description: '10% off on winter clothing Valid for 7 days' },
    { id: '21', code: 'SPRINGSALE', description: '20% off Valid for 15 days' },
    { id: '22', code: 'FREEDOM15', description: '15% off Valid for 10 days' },
    { id: '23', code: 'SUMMER30', description: '30% off on summer collection Valid for 14 days' },
    { id: '24', code: 'SPECIALOFFER', description: 'Up to 25% off Valid for 30 days' },
    { id: '25', code: 'WELCOME25', description: '25% off on your first order Valid for 30 days' },
    { id: '26', code: 'VETERANS10', description: '10% off for veterans Valid for 15 days' },
    { id: '27', code: 'THANKYOU20', description: '20% off for loyal customers Valid for 30 days' },
    { id: '28', code: 'GIFT10', description: '10% off on gift items Valid for 10 days' },
    { id: '29', code: 'CUPON50', description: '50% off Valid for 7 days' },
    { id: '30', code: 'HOLIDAYSALE', description: 'Up to 60% off Valid for 5 days' },
    { id: '31', code: 'SHOPPING20', description: '20% off sitewide Valid for 14 days' },
    { id: '32', code: 'XMAS10', description: '10% off on Christmas items Valid for 12 days' },
    { id: '33', code: 'ENDOFSEASON', description: 'Up to 40% off Valid for 5 days' },
    { id: '34', code: 'THANKSGIVING', description: '20% off Valid for 14 days' },
    { id: '35', code: 'DISCOUNT25', description: '25% off Valid for 30 days' },
    { id: '36', code: 'FLASHDEAL', description: 'Flash Deal 20% off Valid for 1 day' },
    { id: '37', code: 'SUMMERFUN', description: 'Enjoy 30% off Valid for 10 days' },
    { id: '38', code: 'VIP30', description: '30% off for VIP customers Valid for 7 days' },
    { id: '39', code: 'GET15OFF', description: '15% off on orders above $50 Valid for 14 days' },
    { id: '40', code: 'BULKBUY25', description: '25% off on bulk orders Valid for 30 days' },
    { id: '41', code: 'COUPON50OFF', description: '50% off on orders above $200 Valid for 10 days' },
    { id: '42', code: 'FLASH20', description: '20% off on all items Valid for 5 days' },
    { id: '43', code: 'BLACKFRIDAY15', description: '15% off on Black Friday Valid for 2 days' },
    { id: '44', code: 'FREESHIP5', description: 'Free shipping for orders over $50 Valid for 7 days' },
    { id: '45', code: 'WELCOME30', description: '30% off on your first order Valid for 30 days' },
    { id: '46', code: 'AUTUMN20', description: '20% off Valid for 12 days' },
    { id: '47', code: 'BONUS15', description: '15% off on next purchase Valid for 20 days' },
    { id: '48', code: 'SEASONALSALE', description: 'Save up to 35% Valid for 14 days' },
    { id: '49', code: 'HAPPYNEWYEAR', description: '20% off on New Year Special items Valid for 30 days' },
    { id: '50', code: 'WINTERSALE', description: 'Save up to 50% Valid for 20 days' },
];


const claimedCouponsByIp = new Map();


const checkCouponClaim = (req, res, next) => {
    const clientIp = requestIp.getClientIp(req);
    const claimedCoupon = claimedCouponsByIp.get(clientIp);

    if (claimedCoupon) {
        return res.status(400).json({ 
            message: 'You have already claimed a coupon!', 
            coupon: claimedCoupon 
        });
    }
    next();
};


router.get('/random', (req, res) => {
    const randomCoupon = coupons[Math.floor(Math.random() * coupons.length)];
    res.json(randomCoupon);
});


router.post('/claim/:id', checkCouponClaim, (req, res) => {
    const clientIp = requestIp.getClientIp(req);
    const couponId = req.params.id;
    const coupon = coupons.find(c => c.id === couponId);

    if (!coupon) {
        return res.status(404).json({ message: 'Coupon not found' });
    }

    
    claimedCouponsByIp.set(clientIp, coupon);

    res.json({
        message: 'Coupon claimed successfully!',
        coupon: coupon,
    });
});

module.exports = router;