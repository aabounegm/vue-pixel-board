<template>
	<div id="app">
		<board
			:rows="10"
			:cols="20"
			v-model="arr"
			:color="color"
		>
			<!-- <template v-slot="props">
				{{props.data}}
			</template> -->
		</board>
		<input type="color" v-model="color"/>
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
		};
	},
	methods: {
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
