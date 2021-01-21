const { PluginError } = require('gulp-util');
const through = require('through2');
const ns = require('css-namespacing');
const pathsep = require('path').sep;
const validateOptions = require('./validate');

const PLUGIN_NAME = 'gulp-css-namespacing';

const isString = (value) => typeof (value) === 'string';
const isRegExp = (value) => value instanceof RegExp;
const isEmpty = (value) => [null, undefined].includes(value);

function getOption(filepath, options) {
  let matchoption;
  for (let i = 0; i < options.length; i += 1) {
    if (Array.isArray(options[i].path)) {
      const matchpath = options[i].path;
      if (!isEmpty(matchpath)) {
        for (let j = 0; j < matchpath.length; j += 1) {
          if (isRegExp(matchpath[j]) && matchpath[j].test(filepath)) {
            const { path, ...result } = options[i];
            return result;
          }
          if (isString(matchpath[j]) && filepath.includes(matchpath[j])) {
            const { path, ...result } = options[i];
            return result;
          }
        }
      } else {
        const { path, ...result } = options[i];
        matchoption = result;
      }
    }
  }
  return matchoption;
}

module.exports = function transform(option) {
  validateOptions(option);
  return through.obj(function handle(file, encoding, callback) {
    if (file.isBuffer()) {
      const content = file.contents.toString();
      const filepath = file.path.split(pathsep).join('/');
      console.log(filepath);
      const matchoption = getOption(filepath, option);
      console.log(matchoption);
      if (matchoption && matchoption.namespace) {
        // eslint-disable-next-line
          file.contents = new Buffer.from(ns(content, matchoption));
      }
      this.push(file);
      return callback();
    }
    this.emit('error', new PluginError(PLUGIN_NAME, 'only support Buffers'));
    return callback(null, file);
  });
};
