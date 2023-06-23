const Joi = require("joi");
const validate = require("./schema.validation");

const wishListSchema = Joi.object({
  productID: Joi.string()
    .min(24)
    .max(200)
    .alphanum()
    .required()
    .trim()
    .messages({ "string.base": "Missing / Invalid filed" }),
});

const wishListSchemaValidation = (userInput) =>validate(userInput, wishListSchema);

const removeListItemSchema = Joi.object({
  // listID: Joi.string()
  //   .min(24)
  //   .max(200)
  //   .alphanum()
  //   .required()
  //   .trim()
  //   .messages({ "string.base": "Missing / Invalid filed" }),

  courseID: Joi.string()
    .min(24)
    .max(200)
    .alphanum()
    .required()
    .trim()
    .messages({ "string.base": "Missing / Invalid filed" }),
});

const removeListItemSchemaValidation = (userInput) =>validate(userInput, removeListItemSchema);

module.exports = {
  wishListSchemaValidation,
  removeListItemSchemaValidation,
};
