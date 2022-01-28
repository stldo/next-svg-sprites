# next-svg-sprites [![npm][1]][2]

Generate SVG sprites from imported files using [SVG sprite loader][3].

## Installation

```sh
npm install next-svg-sprites svg-sprite-loader
```

## Usage

### `next-with-plugins`

```js
/* next.config.js */

const withPlugins = require('next-with-plugins')

module.exports = withPlugins({
  plugins: [
    {
      resolve: 'next-svg-sprites',
      options: {
        /* next-svg-sprites options here */
      }
    }
  ]
})
```

### Standalone

```js
/* next.config.js */

const withSvgSprites = require('next-svg-sprites')

module.exports = withSvgSprites({
  /* Next.js config options here */
}, {
  /* next-svg-sprites options here */
})
```

### JavaScript import

```js
import React from 'react'
import icon from 'images/icon.svg'

export default () => (
  <svg viewBox={icon.viewBox}>
    <use xlinkHref={icon.symbol}/>
  </svg>
)
```

### CSS

```css
.icon {
  background-image: url('images/icon.svg') no-repeat 0;
}
```

## Options

### minifyIds

Type: `boolean`. Default: `process.env.NODE_ENV === 'production'`.

Minify symbol ids, enabled if `process.env.NODE_ENV === 'production'` by
default.

### pluginOptions

Type: `Object`. Default: `{ plainSprite: true }`.

Options used by `svg-sprite-loader/plugin`. By default, `plainSprite` is set to
`true`.

### SVG sprite loader options

Any other option passed to `next-svg-sprites` will be passed to
`svg-sprite-loader` — more info about its options can be found [here][4]. By
default, this plugin will set the followig options:

```js
{
  esModule: false,
  extract: true,
  spriteFilename: 'static/sprites.[contenthash].svg',
  symbolId: '[name]--[hash:base64:5]',
}
```

> Note: if `minifyIds` is set to `true`, `symbolId` will be ignored.

## License

[The MIT License][license]

[1]: https://img.shields.io/npm/v/next-svg-sprites
[2]: https://www.npmjs.com/package/next-svg-sprites
[3]: https://github.com/JetBrains/svg-sprite-loader
[4]: https://github.com/JetBrains/svg-sprite-loader#configuration
[license]: ./LICENSE
