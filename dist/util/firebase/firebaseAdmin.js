"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.db = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var firebase_admin_1 = __importDefault(require("firebase-admin"));
var config = {
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    projectId: process.env.FIREBASE_PROJECT_ID
};
if (!firebase_admin_1["default"].apps.length) {
    firebase_admin_1["default"].initializeApp({
        credential: firebase_admin_1["default"].credential.cert(config)
    });
}
exports.db = firebase_admin_1["default"].firestore();
