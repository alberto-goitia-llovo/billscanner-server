"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/test', route);
    route.get('/testdata', (req, res) => {
        return res.json({ data: { text: "this is some piece of data" } }).status(200);
    });
};
//# sourceMappingURL=tests.js.map