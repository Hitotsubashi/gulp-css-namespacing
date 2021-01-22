# gulp-css-namespacing

[中文文档](https://github.com/Hitotsubashi/gulp-css-namespacing/blob/master/README_CN.md)

A Gulp Plugin dedicated to handling CSS namespaces. It is based on [css-namespacing](https://www.npmjs.com/package/css-namespacing).

This plugin has two functions:

- This plugin is mainly used to prevent global contamination of styles caused by the introduction of third-party CSS.

- During development, when compiling CSS code, it will automatically add namespace to the specified classname according to the options. 

## Getting Started

To begin, you'll need to install `gulp-css-namespacing`:

```console
npm install gulp-css-namespacing --save-dev
```

Then add the plugin to your `gulpfile.js`. For example:

**gulpfile.js**

```js
const { src, dest } = require('gulp');
const cssNamespacing = require('gulp-css-namespacing')

const namespace = () => src('src/style', { base: 'src/style' })
  .pipe(
    cssNamespacing([
      { namespace: 'my-', path: [/test.css/] },
    ])
  )
  .pipe(dest('dist/style',{bases:'dist/style'}));

module.exports = {
  namespace,
};
```

Suppose there is a CSS file as followed called `test.css`.

**src/style/test.css**
```css
.container-fluid,
.container {
  margin-right: auto;
  margin-left: auto;
}

.container-fluid {
  padding-right: 2rem;
  padding-left: 2rem;
}
```

After running `yarn gulp test` , the compiled CSS file is as followed.

**dist/style/test.css**
```css
.my-container-fluid,
.my-container {
  margin-right: auto;
  margin-left: auto;
}

.my-container-fluid {
  padding-right: 2rem;
  padding-left: 2rem;
}
```

In the `options`, you can set which classnames do not need to be prefixed, or only which classnames need to be prefixed, and the value of the namespace.

In addition, in the CSS code, you can use `@namespacing` flexibly set the above configuration.If you want to learn more,check [here](https://github.com/Hitotsubashi/css-namespacing#atrulenamespacing).

If you want to learn more about the result after namespacing, please check [css-namespacing](https://github.com/Hitotsubashi/css-namespacing).

## API

### **cssNamespacing(*options*)**
### options

Type: `Array`
Default: `undefined`

element in `options` is an object,and it contains the following properties.

|Name|Type|Default|Necessary|Description|
|----|----|-------|-----------|---------|
|[`path`](#path)|`{Array<String/RegExp>}`|`undefined`|`false`|An array that contains the matching path for the CSS file to add the namespace to|
|[`value`](#value)|`{String}`|`undefined`|`false`|the value of namespace you want to prefix|
|[`not`](#not)|`{Array<RegExp>}`|`undefined`|`false`|An array that contains the matching classnames that are not prefixed by specified namespace|
|[`only`](#only)|`{Array<RegExp>}`|`undefined`|`false`|An array that contains the matching classnames that will only be prefixed by specified namespace|
### path

Type: `{Array<String|RegExp>}`
Default: `undefined`

**Attention: In view of the different situation of file separators caused by different operating platforms, I have done processing to unify the separator to `'/'`.**

Here shows different situation about the difinition of `options`:

**1.use RegExp in Array**

For example:

```js
const options=[
  { 
    value: 'bsp-', 
    path: [/node_modules\/bootstrap/],
  }
]
```

It will find matched files through `Regexp.prototype.test` like `path.test(filepath)`

**2.use String in Array**

For example:

```js
const options=[
  { 
    value: 'bsp-', 
    path: ['./node_modules/bootstrap/dist/css/bootstrap.min.css'],
  }
]
```
It will find matched files through `String.prototype.includes` like `filepath.includes(path)`

**3.path is not defined**

For example:
```js
const options=[
  { 
    value: 'my-' 
  }
]
```
At this time,it will adds a namespace to the class names of all the scanned CSS files.

### value

Type: `{String}`
Default: `undefined`

if value is `undefined`,for example:
```js
const options=[
  { 
    path:[/bootstrap/] 
  }
]
```

At this time,the scanned files will not be processed.
### not

Type:`{Array<RegExp>}`
Default:`undefined`

For example:
```js
const options=[
  {
    path:[/bootstrap/], 
    not:[/^box$/],
  }
]
```
At this time,all classnames named `box` will not be prefixed with namespace in the code of the CSS file being scanned.

### only
For example:
```js
const options=[
  { 
    path:[/bootstrap/],
    not:[/^box$/],
  }
]
```
At this time,in the code of the CSS file being scanned,only the classname named `box` will be prefixed with namespace
## License

[MIT](./LICENSE)