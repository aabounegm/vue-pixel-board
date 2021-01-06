<template>
	<canvas
		ref="canvas"
		draggable
		:width="cols * pixelSize"
		:height="rows * pixelSize"
		@dragstart.prevent="dragging = true"
		@mouseup.prevent="dragging = false"
		@mousemove="mouseEnterPixel"
		@mouseleave="dragging = false"
		@click="clicked"
	/>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';

export default Vue.extend({
	props: {
		cols: {
			type: Number,
			required: true,
			validator(val: number) {
				return val > 0;
			},
		},
		rows: {
			type: Number,
			required: true,
			validator(val: number) {
				return val > 0;
			},
		},
		// grid: {
		// 	type: [Boolean, String],
		// 	default: true,
		// 	validator(value: boolean|string): boolean {
		// 		if (typeof value === 'boolean') {
		// 			return true;
		// 		}
		// 		return /#[\da-f]{6}/.test(value);
		// 	},
		// },
		color: {
			type: String,
			default: '#000000',
			validator(value) {
				return /#[\da-f]{6}/.test(value);
			},
		},
		clearing: {
			type: Boolean,
			default: false,
		},
		readonly: {
			type: Boolean,
			default: false,
		},
		// checkers: {
		// 	type: [Boolean, String],
		// 	default: false,
		// 	validator(value: boolean|string) {
		// 		if(typeof value === 'boolean') {
		// 			return true;
		// 		}
		// 		return /#[\da-f]{6}/.test(value);
		// 	},
		// },
		// highlightOnHover: {
		// 	type: Boolean,
		// 	default: true,
		// },
		pixelSize: {
			type: Number,
			default: 10,
		},
	},
	data() {
		return {
			ctx: null as unknown as CanvasRenderingContext2D,
			imageData: null as unknown as ImageData,
			dragging: false,
		};
	},
	mounted() {
		const canvas = this.$refs.canvas as HTMLCanvasElement;
		const ctx = canvas.getContext('2d');
		if (ctx == null) {
			throw new Error('Context not defined');
		}
		this.ctx = ctx;
		this.imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	},
	methods: {
		mouseEnterPixel(e: MouseEvent) {
			if (!this.dragging) {
				return;
			}
			this.clicked(e);
		},
		clicked(e: MouseEvent) {
			const { offsetX: x, offsetY: y } = e;
			if (this.readonly) {
				return;
			}
			const clickedColor = this.ctx.getImageData(x, y, 1, 1).data;
			let color: string = this.color;
			let fillMethod = this.ctx.fillRect;
			if (this.clearing !== (e.type === 'contextmenu')) {
				color = '';
				fillMethod = this.ctx.clearRect;
			}
			this.ctx.fillStyle = color;
			fillMethod.apply(this.ctx, [x - x % this.pixelSize, y - y % this.pixelSize, this.pixelSize, this.pixelSize]);
			this.$emit('input', {
				x: Math.floor(x / this.pixelSize),
				y: Math.floor(y / this.pixelSize),
				color,
			});

			// const rightClickXorClearing = this.clear !== (e.type === 'contextmenu');
			// info.color = rightClickXorClearing ? '' : this.color;
			// const oldColor = this.getColor(info.row, info.col);
		},
		clearBoard() {
			const { width, height } = this.ctx.canvas;
			this.ctx.clearRect(0, 0, width, height);
		},
		loadImage(img: HTMLImageElement) {
			this.ctx.drawImage(img, 0, 0);
		},
		/*getColor(row: number, col: number) {
			if(!Array.isArray(this.data[row])) {
				return '';
			}
			return this.data[row][col] || '';
		},
		setColor(row: number, col: number, color: string) {
			if(!Array.isArray(this.data)) {
				this.data = [];
			}
			if(!Array.isArray(this.data[row])) {
				this.$set(this.data, row, []);
			}
			this.$set(this.data[row], col, color);
		},
		*/
	},
});
</script>
