const { register, signIn, allUsers } = require('../controllers/UserControllers');

const router = require('express').Router();

router.post("/register", register);
router.post("/signin", signIn);
router.get("/allUsers/:id", allUsers);
module.exports =router;