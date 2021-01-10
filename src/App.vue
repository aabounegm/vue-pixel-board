<template>
	<div id="app">
		<div class="board-wrapper">
			<board
				ref="board"
				:rows="30"
				:cols="60"
				:pixel-size="size"
				:color="color"
				:clearing="deleting"
				:readonly="readonly"
				:grid="grid"
				:checkers="checkers"
			/>
		</div>
		<input
			v-model="color"
			type="color"
		>&nbsp;
		<input
			v-model="deleting"
			type="checkbox"
		>
		{{ deleting ? '🗑️' : '✏️' }}&nbsp;&nbsp;
		<input
			v-model="readonly"
			type="checkbox"
		>
		{{ readonly ? '🚫' : '⭕' }}&nbsp;&nbsp;
		<!-- <input type="checkbox" v-model="grid"/>
		{{ grid ? '╬' : '┼' }}&nbsp;&nbsp;
		<input type="checkbox" v-model="checkers"/>
		{{ checkers ? '🏁' : '⬜' }}&nbsp;&nbsp; -->
		<button @click="clear">
			Clear
		</button>

		<button @click="save">
			Save as Image
		</button>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Board from './components/Board.vue';

export default Vue.extend({
	components: {
		Board,
	},
	data() {
		return {
			arr: [],
			color: '#000000',
			deleting: false,
			readonly: false,
			grid: true,
			checkers: false,
			slot: false,
			size: 15,
		};
	},
	methods: {
		clear() {
			(this.$refs.board as any).clearBoard();
		},
		
		save() {
			(this.$refs.board as any).downloadImage();
		},
	},
});
</script>

<style>
#app {
	height: 500px;
}
.board-wrapper {
	border: 1px solid;
	display: block;
	height: 450px;
	width: 900px;
}
</style>
