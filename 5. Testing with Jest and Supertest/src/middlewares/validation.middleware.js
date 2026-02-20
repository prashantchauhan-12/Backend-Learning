const { body, validationResult } = require('express-validator');


const validateResult = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    next();
}

const registerUserValidationRules = [
    body("username")
        .isString()
        .withMessage("username must be a string")
        .isLength({ min: 3, max: 20 })
        .withMessage("username must be between 3 and 20 character"),

    body('email')
        .isEmail()
        .withMessage("email must be a valid email"),

    body('password')
        .isString()
        .withMessage("password must be a string")
        .isLength({ min: 6, max: 20 })
        .withMessage("password must be between 6 and 20 character"),

    validateResult
]

module.exports = {
    registerUserValidationRules
}
