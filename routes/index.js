const router = require("express").Router();

// Import our files containing our routes
const notesRouter = require("./apiroutes");
const htmlRouter = require("./htmlroutes");

router.use("/api", notesRouter);
router.use("/", htmlRouter);

module.exports = router;
