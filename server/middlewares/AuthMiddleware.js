const { verify } = require("jsonwebtoken")

const validateToken = (req, res, next) => {
    const acessToken = req.header("acessToken");

    if (!acessToken) return res.send({ error: "User not logged in!"})

    try{
        const validToken = verify(acessToken, "importantsecret")

        if (validToken) {
            return next();
        }

    } catch (err) {
        return res.send({ error: err})
    }
}
module.exports = { validateToken };