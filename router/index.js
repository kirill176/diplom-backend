const Router = require("express").Router;
const UserController = require("../controllers/user-controller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");
const fileController = require("../controllers/file-controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  UserController.registration
);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/activate/:link", UserController.activate);
router.get("/refresh", UserController.refresh);
router.get("/user", authMiddleware, UserController.getUser);
router.post(
  "/addFile",
  authMiddleware,
  upload.single("file"),
  fileController.addFile
);
router.post("/removeFile", authMiddleware, fileController.removeFile);

module.exports = router;
