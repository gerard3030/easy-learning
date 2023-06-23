const Joi = require("joi");
const validate = require("./schema.validation");

const ordersSchema = Joi.object({
  courseID: Joi.string()
    .min(24)
    .max(200)
    .alphanum()
    .required()
    .trim()
    .messages({ "string.base": "courseID Missing / Invalid filed" }),
  userID: Joi.string()
    .min(24)
    .max(200)
    .alphanum()
    .required()
    .trim()
    .messages({ "string.base": "userID Missing / Invalid filed" }),
  copiesNeeded: Joi.number().min(0).max(100),
  privetLesson: Joi.number().min(0).max(100),
});

const ordersSchemaValidation = (userInput) => validate(userInput, ordersSchema);

module.exports = {
  ordersSchemaValidation,
};
