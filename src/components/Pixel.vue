<template>
	<div 
		style="height:100%; width:100%;"
		:style="{'background-color': color}"
		draggable="true"
		@dragstart.prevent="trigger($event); dragging=true"
		@click.prevent="trigger"
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
	data() {
		return {
			dragging: false,
		};
	},
	methods: {
		trigger(e: MouseEvent) {
			if(this.dragging) {
				this.dragging = false;
				return;
			}
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
