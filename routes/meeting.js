
import express from 'express';
import Meeting from '../models/meetings.js';
// import auth from '../middleware/auth.js';
import {requireSignIn } from "../middleware/authMiddleware.js";
import getZoomAccessToken from "../helpers/zoomAuth.js";
import {createZoomMeeting,deleteZoomMeeting} from "../helpers/zoomApi.js"
// import { createZoomMeeting, getZoomAccessToken } from '../helpers/zoomApi.js';

const router = express.Router();
router.get('/', requireSignIn, async (req, res) => {
    res.send('Middleware is working');
    try {
        const meetings = await Meeting.find({ user: req.user.id }).sort({ date: -1 });
        res.json(meetings);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.post('/', requireSignIn, async (req, res) => {
    const { title, date, duration } = req.body;
    if (!title || !date || !duration) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        // Zoom JWT token 
        const zoomToken = await getZoomAccessToken();
        // Create 
        const zoomMeeting = await createZoomMeeting(title, date, duration, zoomToken);
        console.log(zoomMeeting);
        
        const newMeeting = new Meeting({
            user: req.user._id, 
            title,
            date,
            duration,
            zoomMeetingId: zoomMeeting.id
        });
        console.log(newMeeting);
        console.log(user , title, date, duration, zoomMeetingId);
        
        const meeting = await newMeeting.save();
        res.json(meeting); 
    } catch (error) {
        console.error('Error in create meeting:', error.message);
        res.status(500).send('Serverr Error');
    }
});

router.delete('/:id', requireSignIn, async (req, res) => {
    try {
        // Find meeting by ID
        const meeting = await Meeting.findById(req.params.id);

        if (!meeting) {
            return res.status(404).json({ msg: 'Meeting not found' });
        }

        // Check auth
        if (meeting.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        // Delete 
        await deleteZoomMeeting(meeting.zoomMeetingId);
        // Delete from database
        await meeting.remove();

        res.json({ msg: 'Meeting removed' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


export default router;
