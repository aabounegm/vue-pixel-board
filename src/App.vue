<template>
	<div id="app">
		<board
			:rows="10"
			:cols="20"
			v-model="arr"
			:color="color"
			:clear="deleting"
			:readonly="readonly"
			ref="board"
		>
			<template v-slot="{row, col, color}">
				{{`(${row}, ${col}) [${color}]`}}
			</template>
		</board>
		<input type="color" v-model="color"/>&nbsp;
		<input type="checkbox" v-model="deleting"/>
		{{ deleting ? '🗑️' : '✏️' }}&nbsp;&nbsp;
		<input type="checkbox" v-model="readonly"/>
		{{ readonly ? '🚫' : '⭕' }}&nbsp;&nbsp;
		<button @click="clear">Clear</button>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Board from './components/Board.vue';
export default Vue.extend({
	data() {
		return {
			arr: [],
			color: '#000000',
			deleting: false,
			readonly: false,
		};
	},
	methods: {
		clear() {
			(this.$refs.board as any).clearBoard();
		},
	},
	components: {
		Board,
	},
});
</script>

<style lang="scss">
#app {
	height: 400px;
}
</style>
