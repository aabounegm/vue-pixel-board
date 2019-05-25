<template>
	<div class="container">
		<div v-for="i in rows" :key="i" class="row">
			<div v-for="j in cols" :key="i*rows+j" class="pixel">

			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	props: {
		cols: {
			type: Number,
			default: 5,
		},
		rows: {
			type: Number,
			default: 6,
		},
	},
});
</script>

<style lang="scss" scoped>
.container {
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
}
.pixel {
	border: 1px solid black;
	box-sizing: border-box;
	flex: auto;
}
</style>
