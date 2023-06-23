const Joi = require("joi");
const validate = require("./schema.validation");

const courseSchema = Joi.object({
  courseName: Joi.string().allow(null,"")
    .min(3)
    .max(30)
    .required()
    .trim()
    .messages({ "string.base": "course name Missing / Invalid filed" }),
    // courseImg:Joi.string().allow(null,""),
  
  courseImg:Joi.any().allow(null,""),

  category: Joi.string().allow(null,"")
    .min(3)
    .max(30)
    .trim()
    .messages({ "string.base": "category Missing / Invalid filed" }),

  lecturer: Joi.string().allow(null,"")
    .min(3)
    .max(30)
    .trim()
    .messages({ "string.base": "lecturer name Missing / Invalid filed" }),

  description: Joi.string().allow(null,"")
    .min(3)
    .max(300)
    .trim()
    .messages({ "string.base": "description Missing / Invalid filed" }),

  price: {
    coursePrice: Joi.number().allow(null,"")
      .integer()
      .min(15)
      .messages({ "string.base": "price Missing / Invalid filed" }),

    privetPrice: Joi.number().allow(null,"")
      .integer()
      .min(15)
      .messages({ "string.base": "price Missing / Invalid filed" }),

    copyPrice: Joi.number().allow(null,"")
      .integer()
      .min(15)
      .messages({ "string.base": "printCopy Missing / Invalid filed" }),

  },
  totalHours: Joi.number().allow(null,"")
    .integer()
    .min(15)
    .messages({ "string.base": "PrivetSession Missing / Invalid filed" }),
  isPrivetSession: Joi.boolean().messages({
    "string.base": "PrivetSession Missing / Invalid filed",
  }),
  printCopy: {
    isPrintAvailable: Joi.boolean().allow(null,"").messages({
      "string.base": "printCopy Missing / Invalid filed",
    }),
    copyStockAmount: Joi.number().allow(null,"")
      .integer()
      .min(15)
      .messages({ "string.base": "printCopy Missing / Invalid filed" }),

  },
  addedBy: Joi.string().allow(null,""),
});

const courseSchemaValidation = (adminInput) => validate(adminInput, courseSchema);

const showPageSchema = Joi.object({
  page: Joi.number().integer(),
});

const showPageSchemaValidation = (userInput) =>validate(userInput, showPageSchema);

const showCategorySchema = Joi.object({
  category: Joi.string()
    .alphanum()
    .min(3)
    .max(25)
    .messages({ "string.base": "category Missing / Invalid filed" }),
});

const showCategorySchemaValidation = (userInput) =>validate(userInput, showCategorySchema);

const editProductSchema = Joi.object({
  productID: Joi.string()
    .required()
    .messages({ "string.base": "productID name Missing / Invalid filed" }),
  filedToUpdate: Joi.string()
    .required()
    .messages({ "string.base": "filed to update Missing / Invalid filed" }),
  dataUpdated: Joi.string()
    .required()
    .messages({ "string.base": "data Updated filed Missing / Invalid filed" }),
});

const editProductSchemaValidation = (adminInput) =>validate(adminInput, editProductSchema);

const deleteCourseSchema = Joi.object({
  productID: Joi.string()
    .required()
    .max(24)
    .messages({ "string.base": "productID Missing / Invalid filed" }),
});

const deleteCourseSchemaValidation = (adminInput) => validate(adminInput, deleteCourseSchema);



module.exports = {
  courseSchemaValidation,
  showPageSchemaValidation,
  showCategorySchemaValidation,
  editProductSchemaValidation,
  deleteCourseSchemaValidation,
};
