import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { getNotifications, deleteAllNotifications, deleteNotification } from '../controllers/notification.controller.js';

const router = express.Router();

router.get("/", protectRoute, getNotifications);
router.delete("/", protectRoute, deleteAllNotifications);
router.delete("/:id", protectRoute, deleteNotification);

export default router