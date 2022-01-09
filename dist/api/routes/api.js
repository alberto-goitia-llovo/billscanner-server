"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import middlewares from '../middlewares';
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/api', route);
    route.get('', (req, res) => {
        return res.json({ message: "Estas usando la api, si, campeón" }).status(200);
    });
};
//# sourceMappingURL=api.js.map