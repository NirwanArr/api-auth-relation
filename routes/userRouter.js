const router = require("express").Router();

const User = require("../controller/userController");
const Auth = require("../controller/authController");


router.post("/", Auth.register);
router.get("/", User.getAllUsers);
router.get("/:id", User.findUserById);
router.patch("/:id",User.updateUser);
router.delete("/:id", User.deleteUser);

module.exports = router;