# vue-pixel-board

Pixel drawing board SFC for Vue

> :warning: Warning!
> This library is under heavy reconstruction. Please visit later. 


[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/aabounegm/vue-pixel-board/Release)](https://github.com/aabounegm/vue-pixel-board/actions?query=workflow%3ARelease%20to%20NPM)
[![npm](https://img.shields.io/npm/v/vue-pixel-board)](https://www.npmjs.com/package/vue-pixel-board)
[![npm bundle size](https://img.shields.io/bundlephobia/min/vue-pixel-board)](https://bundlephobia.com/result?p=vue-pixel-board)
[![npm bundle zipped size](https://img.shields.io/bundlephobia/minzip/vue-pixel-board)](https://bundlephobia.com/result?p=vue-pixel-board)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

```sh
npm install vue-pixel-board
```

## Usage

### Register component
To register globally:
```javascript
import Vue from 'vue';
import PixelBoard from 'vue-pixel-board';

Vue.component('pixel-board', PixelBoard);
```

Or to use in your component without global registration, just add it to the `components` option:
```javascript
export default Vue.extend({
    name: 'your-component',
    components: {
        PixelBoard,    // Using ES6 shorthand notation
    },
});
```

### Using the component

Available props:

| Prop  | Type       | Default value | Description |
|-------|------------|---------------|-------------|
| rows* | `number` | | Specifies the number of rows in the board |
| cols* | `number` | | Specifies the number of columns in the board |
| color | `string` | `"#000000"` | Any valid CSS color propertty value. The color to use for newly colored pixels |
| clear | `boolean`| `false` | Specifies whether new clicks will color a pixel or remove the color |
| readonly | `boolean` | `false` | Makes the board uneditable |
<!-- | value | `string[][]` | `[]` | The color in each pixel | -->
<!-- | checkers | `boolean\|string` | `false` | Gives the board a checker style. If string, has to be a valid value for the CSS `background-color` property | -->
<!-- | grid | `boolean\|string` | `true` | If boolean, controls the visibility of grid lines. If string controls the shape of grid line (has to be a valid value for the CSS `border` property) | -->
<!-- | highlightOnHover | `boolean` | `true` | Highlight the pixel the mouse is currently hovering on | -->

_\* Marks required props_

Emitted events:
- `input`: Fired when any pixel's value gets updated. Contains the information `{ x: number, y: number, color: string }`.

Example usage:
```vue
<template>
    <div class="wrapper">
        <pixel-board
            :rows="rowCount"
            :cols="colCount"
            :color="color"
            :clear="deletingState"
        />
    </div>
    <input type="color" v-model="color"/>
    <input type="checkbox" v-model="deletingState"/>🗑️
</template>

<script lang="ts">
import Vue from 'vue';
import PixelBoard from 'vue-pixel-board';

export default Vue.extend({
    data() {
        rowCount: 80,
        colCount: 80,
        color: '#000000',
        deletingState: false,
    },
    components: {
        PixelBoard,
    },
});
</script>

<style scoped>
.wrapper {
    height: 800px;
    width: 800px;
}
</style>
```

_For a more detailed example, check [this](./src/App.vue)_

### Notes:
- The board will take up the entire space of its container
- The aspect ratio of the pixels is not preserved. Make sure to size the container with respect to the number of rows/cols to make them squares (or whatever rectangle size)


## License

[MIT License](./LICENSE)
