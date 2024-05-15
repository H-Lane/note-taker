const router = require('express').Router();

// Import our files containing our routes
const notesRouter = require('./api');
const htmlRouter = require('./');

router.use('/api', notesRouter);
router.use('/', htmlRouter);

module.exports = router;