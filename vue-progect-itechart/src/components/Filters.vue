<template>
    <div id="filters">
        <h3>Filters</h3>
        <p v-for="(filter, idx) in filters" :key="idx" @click="applyFilter(filter)">
			{{ filter.name }}
		</p>
    </div>
</template>

<script>
export default {
	data () {
		return {
			filters: [
				{
					name: "Rating highest",
					key: 'rating',
					order: 'asc'
				},
				{
					name: "Rating lowest",
					key: 'rating',
					order: 'desc'
				},
				{
					name: "Year oldest",
					key: 'year',
					order: 'desc'
				},
				{
					name: "Year newest",
					key: 'year',
					order: 'asc'
				},
			]
		}
	},
	methods: {
		// обращаемся к каждому элементу массива из action
		applyFilter (filter) {
			this.$store.dispatch('filter', filter)
		}
	}
}
</script>

<style lang='scss' scoped>
	#filters {
		text-align: left;
		color: rgb(143, 143, 143);
		cursor: pointer;

		p {
			margin-left: 10px;
		}
	}
</style>