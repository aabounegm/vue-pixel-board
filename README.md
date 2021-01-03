# vue-pixel-board

Pixel drawing board SFC for Vue

> :warning: Warning!
> This library is under heavy reconstruction. Please visit later. 

## Table of Contents

- [Installing](#installing)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installing

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
<!-- | value | `String[][]` | `[]` | The color in each pixel | -->
| rows* | `Number` | | Specifies the number of rows in the board |
| cols* | `Number` | | Specifies the number of columns in the board |
| color | `String` | `"#000000"` | Any valid CSS color propertty value. The color to use for newly colored pixels |
| clear | `Boolean`| `false` | Specifies whether new clicks will color a pixel or remove the color |
<!-- | grid | `Boolean\|String` | `true` | If boolean, controls the visibility of grid lines. If string controls the shape of grid line (has to be a valid value for the CSS `border` property) | -->
| readonly | `Boolean` | `false` | Makes the board uneditable |
<!-- | checkers | `Boolean\|String` | `false` | Gives the board a checker style. If string, has to be a valid value for the CSS `background-color` property | -->
<!-- | highlightOnHover | `Boolean` | `true` | Highlight the pixel the mouse is currently hovering on | -->

_\* Marks required props_

Emitted events:
- `input`: Fired when the data is updated. Sends the entire 2D array of colors. Used for the `v-model` directive.
- `update:pixel`: Fired when a pixel's value is updated, with information about only this pixel. Useful to update a database with sparse information.

Example usage:
```html
<template>
	<div class="wrapper">
		<board
			v-model="grid"
			:rows="rowCount"
			:cols="colCount"
			:color="color"
			:clear="deletingState"
		></board>
	</div>
	<input type="color" v-model="color"/>
	<input type="checkbox" v-model="deletingState"/>🗑️
</template>

<script lang="ts">
import Vue from 'vue';
import PixelBoard from 'vue-pixel-board';

export default Vue.extend({
	data() {
		grid: [[]],
		rowCount: 80,
		colCount: 80,
		color: '#000000',
		deletingState: false,
	},
	components: {
		PixelBoard
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


## Future improvements:
### Release v0.1
- [ ] Touch-friendliness
- [ ] Clear board function
- [ ] Checkerboard style
- [ ] Highlight hovered pixel
### Release v1.0
- Other formats for 'value' for various levels of sparseness:
  - Array of objects (`{row: number, col: number, color: string}`)
  - Nested objects (`{[row: number]: {[col: number]: string}}`)
- Custom data object instead of color string (might be useful for slots)
### Release v2.0
- Rewrite using Canvas API:
  - Load from image
  - Export as image

## License

[MIT License](./LICENSE)
