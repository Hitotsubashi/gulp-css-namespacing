const { validate } = require('schema-utils');
const {
  elementCheck, pathCheck, notCheck, onlyCheck,
} = require('./schema');

function validateOptions(options) {
  validate(elementCheck.schema, options, elementCheck.config);
  options.forEach((element) => {
    if (Array.isArray(element.path)) {
      element.path.forEach((val) => {
        validate(pathCheck.schema, val, pathCheck.config);
      });
    }
    if (Array.isArray(element.only)) {
      element.only.forEach((val) => {
        validate(onlyCheck.schema, val, onlyCheck.config);
      });
    }
    if (Array.isArray(element.not)) {
      element.not.forEach((val) => {
        validate(notCheck.schema, val, notCheck.config);
      });
    }
  });
}

module.exports = validateOptions;
