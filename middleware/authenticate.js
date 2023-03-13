const jwt = require('jsonwebtoken');
const fs = require("fs");
const path=require("path")

function authenticate(req, res, next) {
    let token = req.headers.authentication?.split(" ")[1];

    let blacklist = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../blacklist.json"), "utf-8"));

    if (blacklist.includes(token)) {
        res.send("You are blacklisted")
    }

    else {
        if (token) {
            jwt.verify(token, 'normaltoken', function (err, decoded) {
                if (decoded) {
                    req.role=decoded.user_role;
                    next()
                }
                else {
                    res.send(err.message)
                }
            });
        }
        else {
            res.send("Token Unavailable")
        }
    }
}

module.exports={
    authenticate
}