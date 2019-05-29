<template>
	<div
		class="board"
		draggable="true"
		@dragstart.prevent="dragStart"
		@mouseup.prevent="dragEnd"
		:style="cssProps"
	>
		<div
			v-for="(_, i) in rows"
			:key="i"
			class="row"
		>
			<pixel
				v-for="(_, j) in cols"
				:key="`${i},${j}`"
				class="pixel"
				:class="{grid, checkers: checkers && i%2 === j%2, highlightOnHover}"
				:row="i"
				:col="j"
				:color="getColor(i, j)"
				@click="clicked"
				@mouseenter.native="mouseEnterPixel($event, i, j)"
			>
				<slot v-bind="{row: i, col: j, color: getColor(i,j)}">
				</slot>
			</pixel>
		</div>
	</div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import Pixel from './Pixel.vue';
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
		value: {
			type: Array as () => string[][],
			default: () => [[]],
		},
		grid: {
			type: [Boolean, String],
			default: true,
			validator(value: boolean|string): boolean {
				if(typeof value === 'boolean') {
					return true;
				} else if(typeof value === 'string') {
					const dummy = document.createElement('div');
					dummy.style.border = value;
					return dummy.style.border === value;
				}
				return false;
			},
		},
		color: {
			type: String,
			default: '#000000',
		},
		clear: Boolean,
		readonly: Boolean,
		checkers: {
			type: [Boolean, String],
			default: false,
			validator(value: boolean|string) {
				if(typeof value === 'boolean') {
					return true;
				}
				const dummy = document.createElement('div');
				dummy.style.backgroundColor = value;
				return dummy.style.backgroundColor === value;
			},
		},
		highlightOnHover: {
			type: Boolean,
			default: true,
		},
	} as {[propName: string]: PropOptions},
	data() {
		return {
			data: [[]] as string[][],
			dragging: false,
		};
	},
	computed: {
		cssProps(): any {
			return {
				'--border': this.grid === true ? '1px solid black' : this.grid,
				'--checker-color': this.checkers === true ? 'rgba(0, 0, 0, 0.1)' : this.checkers,
			};
		},
	},
	methods: {
		dragStart(e: MouseEvent) {
			this.dragging = true;
		},
		dragEnd(e: MouseEvent) {
			this.dragging = false;
		},
		mouseEnterPixel(e: MouseEvent, i: number, j: number) {
			if(!this.dragging) {
				return;
			}
			this.clicked(e, {row: i, col: j, color: this.getColor(i, j)});
		},
		clicked(e: MouseEvent, info: {row: number, col: number, color: string}) {
			if(this.readonly) {
				return;
			}
			if(!Array.isArray(this.data)) {
				this.data = [];
			}
			if(!Array.isArray(this.data[info.row])) {
				this.$set(this.data, info.row, []);
			}
			const rightClickXorClearing = this.clear !== (e.type === 'contextmenu');
			info.color = rightClickXorClearing ? '' : this.color;
			const oldColor = this.getColor(info.row, info.col);
			if(info.color !== oldColor) {
				this.$set(this.data[info.row], info.col, info.color);
				this.$emit('input', this.data);
				this.$emit('update:pixel', info);
			}
		},
		clearBoard() {
			this.data = [];
			this.$emit('input', []);
		},
		getColor(row: number, col: number) {
			if(!Array.isArray(this.data[row])) {
				return '';
			}
			return this.data[row][col] || '';
		},
	},
	components: {
		Pixel,
	},
});
</script>

<style lang="scss" scoped>
.board {
	display: flex;
	flex-wrap: nowrap;
	flex-direction: column;
	border: 1px solid black;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
}
.row {
	display: flex;
	flex-wrap: nowrap;
	flex-direction: row;
	flex: auto;
	.pixel {
		box-sizing: border-box;
		flex: auto;
		&.grid {
			border-right: var(--border);
			border-bottom: var(--border);
			&:last-child {
				border-right: none;
			}
		}
		&.checkers {
			background-color: var(--checker-color);
		}
		&.highlightOnHover:hover:not(:active) {
			background-color: rgba(1, 1, 1, 0.2);
		}
	}
	&:last-child .pixel {
		border-bottom: none;
	}
}
</style>
