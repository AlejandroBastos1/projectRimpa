import { Router } from "express";
import {
  login,
  register,
  logout,
  updateUser,
  verifyToken,
  updateProfilePic,
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middleware/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/imgs/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de archivo no permitido"));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const routerAuth = Router();

routerAuth.post("/api/registro", validateSchema(registerSchema), register);
routerAuth.post("/api/login", validateSchema(loginSchema), login);
routerAuth.post("/api/logout", logout);
routerAuth.get("/api/verify", verifyToken);
routerAuth.put("/api/updateUser/:id", updateUser);
routerAuth.put(
  "/api/updateUserPic/:id",
  upload.single("fotoUsuario"),
  updateProfilePic
);

export default routerAuth;
