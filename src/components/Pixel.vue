<template>
	<div 
		style="height:100%; width:100%;"
		:style="{'background-color': color}"
		draggable="true"
		@dragstart.prevent="trigger"
		@click.prevent="trigger"
		@contextmenu.prevent="trigger"
	>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	props: {
		row: Number,
		col: Number,
		color: String,
	},
	methods: {
		trigger(e: MouseEvent) {
			this.$emit('click', e, {
				row: this.row,
				col: this.col,
				color: this.color,
			});
		},
	},
});
</script>

<style lang="scss" scoped>

</style>
