exports.elementCheck = {
  schema: {
    type: 'object',
    properties: {
      namespace: {
        type: 'string',
      },
      path: {
        instanceof: 'Array',
      },
      not: {
        instanceof: 'Array',
      },
      only: {
        instanceof: 'Array',
      },
    },
    additionalProperties: false,
  },
  config: {
    name: 'element in array "option"',
    baseDataPath: 'element',
  },
};

exports.optionCheck = {
  schema: {
    type: 'array',
  },
  config: {
    name: 'option',
    baseDataPath: 'option',
  },
};

exports.pathCheck = {
  schema: {
    anyOf: [
      { type: 'string' },
      { instanceof: 'RegExp' },
    ],
  },
  config: {
    name: 'path',
    baseDataPath: 'path',
  },
};

exports.notCheck = {
  schema: {
    instanceof: 'RegExp',
  },
  config: {
    name: 'not',
    baseDataPath: 'not',
  },
};

exports.onlyCheck = {
  schema: {
    instanceof: 'RegExp',
  },
  config: {
    name: 'only',
    baseDataPath: 'only',
  },
};
