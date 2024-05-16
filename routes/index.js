const router = require("express").Router();

// Import our files containing our routes
const notesRouter = require("./apiroutes");
const htmlRouter = require("./htmlroutes");

router.use("/api", notesRouter);
router.use("/notes", htmlRouter);

module.exports = router;
