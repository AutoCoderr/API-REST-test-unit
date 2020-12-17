"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const express = require('express');
exports.UserController = express.Router();
const User_1 = require("../Entities/User");
exports.UserController.get('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = new User_1.User(req.query.firstname ? req.query.firstname : "", req.query.lastname ? req.query.lastname : "", req.query.email ? req.query.email : "", req.query.birthday ? new Date(req.query.birthday) : new Date("1900-01-01"), req.query.password ? req.query.password : "");
    if (user.isValid() && (yield user.save())) {
        res.send(JSON.stringify({ status: "success", msg: "User successfully created" }));
    }
    else {
        res.send(JSON.stringify({ status: "error", msg: "Invalid user" }));
    }
}));
