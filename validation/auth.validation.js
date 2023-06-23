const Joi = require("joi");
const validate = require("./schema.validation");

const registerSchema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(200)
    .alphanum()
    .required()
    .trim()
    .messages({ "string.base": "first name Missing / Invalid filed" }),
  lastName: Joi.string().allow(null,"")
    .min(3)
    .max(200)
    .alphanum()
    .trim()
    .messages({ "string.base": "last name Missing / Invalid filed" }),
  email: Joi.string()
    .min(10)
    .max(200)
    .email()
    .required()
    .trim()
    .messages({ "string.email": "Invalid Email" }),
  password: Joi.string()
    .regex(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()+-_=]).{3,255}"
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain upper+lower case letter, number and a symbol",
    }),
  phone:Joi.string().length(10).regex(new RegExp("^(?=.*[0-9])"))
  .allow(null,"")
    .messages({ "string.base": "phone Missing / Invalid filed" }),
  address: {
    country: Joi.string().allow(null,"")
      .min(3)
      .max(200)
      .messages({ "string.base": "country Missing / Invalid filed" }),
    city: Joi.string().allow(null,"")
      .min(3)
      .max(200)
      .messages({ "string.base": "city Missing / Invalid filed" }),
    street: Joi.string().allow(null,"")
      .min(3)
      .max(200)
      .messages({ "string.base": "street Missing / Invalid filed" }),
    houseNumber: Joi.string().allow(null,"")
      .min(1)
      .max(200)
      .messages({ "string.base": "houseNumber Missing / Invalid filed" }),
    zip: Joi.string().allow(null,"")
      .min(3)
      .max(200)
      .messages({ "string.base": "zip Missing / Invalid filed" }),
  },
});

const validateRegisterSchema = (userInput) =>
  validate(userInput, registerSchema);

const loginSchema = Joi.object({
  email: Joi.string()
    .min(10)
    .max(200)
    .email()
    .required()
    .trim()
    .messages({ "string.email": "Invalid Email" }),
  password: Joi.string()
    .regex(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()+-_=]).{3,255}"
      )
    )
    .required()
    .messages({
      "string.pattern.base":
      "Password must contain upper+lower case letter, number and a symbol",
    }),
});

const validateLoginSchema = (userInput) => validate(userInput, loginSchema);

const resetPasswordSchema = Joi.object({
  email: Joi.string()
    .min(10)
    .max(200)
    .email()
    .required()
    .trim()
    .messages({ "string.email": "Invalid Email" }),
  newPassword: Joi.string()
    .regex(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()+-_=]).{3,255}"
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain upper+lower case letter, number and a symbol",
    }),
  phone: Joi.string()
    .min(9)
    .max(15)
    .messages({ "string.base": "phone Missing / Invalid filed" }),
});

const validateResetPasswordSchema = (userInput) =>validate(userInput, resetPasswordSchema);

const resetPasswordSchemaNew = Joi.object({
  email: Joi.string()
    .min(10)
    .max(200)
    .email()
    .required()
    .trim()
    .messages({ "string.email": "Invalid Email" }),
  newPassword: Joi.string()
    .regex(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()+-_=]).{3,255}"
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain upper+lower case letter, number and a symbol",
    }),
  phone: Joi.string()
    .min(9)
    .max(15)
    .messages({ "string.base": "phone Missing / Invalid filed" }),
});

const validateResetPasswordSchemaNew = (userInput) =>validate(userInput, resetPasswordSchemaNew);


const unblock = Joi.object({
  email: Joi.string()
    .min(10)
    .max(200)
    .email()
    .required()
    .trim()
    .messages({ "string.email": "Invalid Email" }),
  // password: Joi.string()
  //   .regex(
  //     new RegExp(
  //       "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()+-_=]).{3,255}"
  //     )
  //   )
  //   .required()
  //   .messages({
  //     "string.pattern.base":
  //     "Password must contain upper+lower case letter, number and a symbol",
  //   }),
  userUnblockEmail: Joi.string()
    .min(10)
    .max(200)
    .email()
    .required()
    .trim()
    .messages({ "string.email": "Invalid Email" }),
});

const validateUnblockSchema = (userInput) => validate(userInput, unblock);


const editUserSchema = Joi.object({
  firstName: Joi.string()
  .min(3)
  .max(200)
  .alphanum()
  .trim()
  .messages({ "string.base": "first name Missing / Invalid filed" }),
lastName: Joi.string().allow(null,"")
  .min(3)
  .max(200)
  .alphanum()
  .trim()
  .messages({ "string.base": "last name Missing / Invalid filed" }),
userEmail: Joi.string()
  .min(10)
  .max(200)
  .email()
  .required()
  .trim()
  .messages({ "string.email": "Invalid Email" }),

newEmail: Joi.string().min(10).max(200).email().trim().messages({ "string.email": "Invalid Email" }),
userIMG: Joi.string().allow(null,"").trim().messages({ "string.base": "img Missing / Invalid filed" }),
isVip: Joi.bool().allow(null).messages({ "string.base": "vip Missing / Invalid filed" }),

phone: Joi.string().allow(null,"")
  .min(10)
  .max(14)
  .messages({ "string.base": "phone Missing / Invalid filed" }),
address: {
  country: Joi.string().allow(null,"")
    .min(3)
    .max(200)
    .messages({ "string.base": "country Missing / Invalid filed" }),
  city: Joi.string().allow(null,"")
    .min(3)
    .max(200)
    .messages({ "string.base": "city Missing / Invalid filed" }),
  street: Joi.string().allow(null,"")
    .min(3)
    
    .max(200)
    .messages({ "string.base": "street Missing / Invalid filed" }),
  houseNumber: Joi.string().allow(null,"")
    .min(1)
    .max(200)
    .messages({ "string.base": "houseNumber Missing / Invalid filed" }),
  zip: Joi.string().allow(null,"")
    .min(3)
    .max(200)
    .messages({ "string.base": "zip Missing / Invalid filed" }),
},
})

const validateEditUserSchema = (userInput) => validate(userInput, editUserSchema);

const deleteUserSchema = Joi.object({
  email: Joi.string()
  .min(10)
  .max(200)
  .email()
  .required()
  .trim()
  .messages({ "string.email": "Invalid Email" }),
})

const validateDeleteUserSchema = (userInput) => validate(userInput, deleteUserSchema);


const userInfoSchema = Joi.object({
  userID:Joi.string()
  .min(3)
  .max(200)
  .trim()
  .messages({ "string.base": "userID Missing / Invalid filed" }),
})

const registerAdminSchema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(200)
    .alphanum()
    .required()
    .trim()
    .messages({ "string.base": "first name Missing / Invalid filed" }),
  lastName: Joi.string().allow(null,"")
    .min(3)
    .max(200)
    .alphanum()
    .trim()
    .messages({ "string.base": "last name Missing / Invalid filed" }),
  email: Joi.string()
    .min(10)
    .max(200)
    .email()
    .required()
    .trim()
    .messages({ "string.email": "Invalid Email" }),
  password: Joi.string()
    .regex(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()+-_=]).{3,255}"
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain upper+lower case letter, number and a symbol",
  }),
  phone:Joi.string().length(10).regex(new RegExp("^(?=.*[0-9])"))
  .allow(null,"")
    .messages({ "string.base": "phone Missing / Invalid filed" }),
  isAdmin:Joi.boolean(),
  address: {
    country: Joi.string().allow(null,"")
      .min(3)
      .max(200)
      .messages({ "string.base": "country Missing / Invalid filed" }),
    city: Joi.string().allow(null,"")
      .min(3)
      .max(200)
      .messages({ "string.base": "city Missing / Invalid filed" }),
    street: Joi.string().allow(null,"")
      .min(3)
      .max(200)
      .messages({ "string.base": "street Missing / Invalid filed" }),
    houseNumber: Joi.string().allow(null,"")
      .min(1)
      .max(200)
      .messages({ "string.base": "houseNumber Missing / Invalid filed" }),
    zip: Joi.string().allow(null,"")
      .min(3)
      .max(200)
      .messages({ "string.base": "zip Missing / Invalid filed" }),
  },
});

const validateRegisterAdminSchema = (userInput) => validate(userInput, registerAdminSchema);


const validateUserInfoSchema = (userInput) => validate(userInput, userInfoSchema);


module.exports = {
  validateRegisterSchema,
  validateLoginSchema,
  validateResetPasswordSchema,
  validateUnblockSchema,
  validateResetPasswordSchemaNew,
  validateUserInfoSchema,
  validateEditUserSchema,
  validateDeleteUserSchema,
  validateRegisterAdminSchema
};
