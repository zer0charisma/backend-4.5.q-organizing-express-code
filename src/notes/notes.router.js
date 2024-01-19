const router = require("express").Router();
const controller = require("./notes.controller");

// Define the router:
router.route("/")
    .get(controller.list)
    .post(controller.create);

router.route("/:noteId")
    .get(controller.read)
    .put(controller.update)
    .delete(controller.delete);

module.exports = router;
