const server = require("../api/server");

const router = require("express").Router();

const users = require("./usersModel.js");
const restricted = require("../auth/restricted-middleware.js");

router.get("/", restricted, (req, res) => {
    users.find()
    .then(users => {
        res.status(200).json({ data: users });
    })
    .catch(err => res.send(err))
});

router.put("/:id", restricted, checkDepartment(["hr", "admin"]), (req, res) => {
    // use req.decodedToken data to restrict access by checking the role
    res.status(200).json({ hello: "you made it!" });
});

function checkDepartment(dep) {
    return function (req, res, next) {
        if (dep.includes(req.decodedToken.dep)) {
            next();
        } else {
            res.status(403).json({ you: "can't touch this!" });
        }
    };
}

module.exports = router;