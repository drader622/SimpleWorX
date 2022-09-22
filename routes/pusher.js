const express = require('express');
const router = express.Router();
const Pusher = require('pusher');
require('dotenv').config({ path: './.env' });

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: "us2",
    useTLS: true
});

router.get('/', (req, res) => {
    res.send('submitWO');
});

router.post('/', (req, res) => {
    pusher.trigger('my-channel', 'my-event', {
        reload: req.body.reload,
        woNum: req.body.woNum,
    });
    res.json('')
});

module.exports = router;