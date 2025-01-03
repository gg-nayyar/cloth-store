"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const user_controller_1 = require("../controller/user.controller");
const router = express_1.default.Router();
router.post('/register', user_controller_1.register);
router.post('/login', user_controller_1.login);
router.get('/logout', user_controller_1.logout);
router.get('/profile', auth_middleware_1.authMiddleware, user_controller_1.profile);
router.get('/getUserbyId/:id', user_controller_1.getUserbyId);
router.get('/google', user_controller_1.googleAuthRedirect);
router.get('/google/callback', user_controller_1.googleAuthCallback);
exports.default = router;
