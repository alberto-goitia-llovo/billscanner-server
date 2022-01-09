"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import middlewares from '../middlewares';
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/auth', route);
    route.get('', (req, res) => {
        return res.status(200).json('You are using the authentication API');
    });
    route.get('/signin', (req, res) => {
        console.log('req.query', req.query);
        return res.status(200).json({ token: "1234" });
    });
};
//# sourceMappingURL=auth.js.map