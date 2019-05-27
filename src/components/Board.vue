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
				:class="{grid}"
				:row="i"
				:col="j"
				:color="data[i] && data[i][j]"
				@click="clicked"
				@mouseenter.native="mouseEnterPixel($event, i, j)"
			>
				<slot :row="i" :col="j">
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
			default: 20,
			validator(val: number) {
				return val > 0;
			},
		},
		rows: {
			type: [Number, String],
			default: 10,
			validator(val: number) {
				return val > 0;
			},
		},
		value: {
			type: Array as () => any[][],
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
			if(!Array.isArray(this.data)) {
				this.data = [];
			}
			if(!Array.isArray(this.data[info.row])) {
				this.$set(this.data, info.row, []);
			}
			const rightClickXorClearing = this.clear !== (e.type === 'contextmenu');
			info.color = rightClickXorClearing ? '' : this.color;
			this.$set(this.data[info.row], info.col, info.color);
			this.$emit('input', this.data);
			this.$emit('update:pixel', info);
		},
		getColor(row: number, col: number) {
			if(!Array.isArray(this.data[row])) {
				return '';
			}
			return this.data[row][col] || '';
		},
	},
	mounted() {
		if(Array.isArray(this.value)) {
			this.data = this.value;
		}
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
	}
	&:last-child .pixel {
		border-bottom: none;
	}
}
</style>
