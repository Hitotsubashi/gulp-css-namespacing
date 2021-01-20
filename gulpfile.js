const { src, dest, series } = require('gulp');
const del = require('del');
const cssNamespacing = require('./src');

const clean = () => del(['tests/modified']);

const ns = () => src('tests/origin/*.css', { base: 'tests/origin' })
  .pipe(cssNamespacing([
    { namespace: 'bsp-', path: [/bootstrap-grid/], not: [/container/] },
    { namespace: 'cst-' },
    { namespace: 'bsp-', path: [/bootstrap/], only: [/container/] },
  ]))
  .pipe(dest('tests/modified'));

const test = series([clean, ns]);
module.exports = {
  test,
};
