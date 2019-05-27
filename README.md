# vue-pixel-board

Pixel drawing board SFC for Vue

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Install

Using [npm](https://npmjs.com/):
```sh
npm install vue-pixel-board
```

## Usage

### Register component
To register globally:
```javascript
import Vue from 'vue';
import PixelBoard from 'vue-pixel-board';

Vue.use(PixelBoard);
// or
Vue.component('pixel-board', PixelBoard);
```

To use in your component, just add it to the `components` option:
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

|Prop|Type|Default value|Notes|
|---|---|---|---|
|value|String[][]|||
|rows|Number| |Specifies the number of rows in the board|
|cols|Number| |Specifies the number of columns in the board|
|color|String|#000000|Any valid CSS color propertty value. The color to use for newly colored pixels|
|clear|Boolean| |Specifies whether new clicks will color a pixel or remove the color|
|grid|Boolean\|String|true|If boolean, controls the visibility of grid lines. If string controls the shape of grid line (has to be a valid value for the CSS `border` property)|
| | | | |
| | | | |

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

### Notes:
- The board will take up the entire space of its container
- The aspect ratio of the pixels is not preserved. Make sure to size the container with respect to the number of rows/cols to make them squares (or whatever rectangle size)


## Contributing
...

Future improvements:
- Touch-friendliness
- Exporting as image
- Custom data object instead of color string
- Clear board function

## License
