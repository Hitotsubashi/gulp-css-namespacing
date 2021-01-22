const { src, dest, series } = require('gulp');
const del = require('del');
const cssNamespacing = require('./src');

const clean = () => del(['tests/modified']);

const nsfile = () => src('tests/file/origin/*.css', { base: 'tests/file/origin' })
  .pipe(cssNamespacing([
    { namespace: 'bsp-', path: [/\/bootstrap-grid\.css/], not: [/container/] },
    { namespace: 'cst-' },
    { namespace: 'bsp-', path: [/\/bootstrap\.min\.css/], only: [/container/] },
  ]))
  .pipe(dest('tests/file/modified'));

const nsUnit = () => src('tests/unit/origin/*.css', { base: 'tests/unit/origin' })
  .pipe(cssNamespacing([
    { namespace: 'en-', path: [/\/origin\/normal\.css/] },
    { namespace: 'en-', path: [/\/origin\/not\.css/], not: [/container/] },
    { namespace: 'en-', path: [/\/origin\/only\.css/], only: [/container/] },
  ]))
  .pipe(dest('tests/unit/modified'));

const testfile = series([clean, nsfile]);
const testunit = series([clean, nsUnit]);

module.exports = {
  testfile,
  testunit,
};
