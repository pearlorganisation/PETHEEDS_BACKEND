import express from 'express';
import { createCoupon, deleteCoupon, getAllCoupons, getCouponById, updateCoupon } from '../controllers/coupon.js';
import { verifyTokenMiddleware } from '../middlewares/verifyToken.js';

const router = express.Router();

// Coupon routes
router.route('/').get(verifyTokenMiddleware,getAllCoupons).post(createCoupon);

router.route('/:id').get(getCouponById).delete(deleteCoupon).patch(updateCoupon);

export const CouponRouter =  router;