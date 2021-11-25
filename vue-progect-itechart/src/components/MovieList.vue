<template>
	<div id="movie-container">
		<movie v-for="movie in movies" :key="movie.id" :movie="movie" />
	</div>
</template>

<script>
	import Movie from "./Movie";

	export default {
		components: {
			Movie,
		},
		data() {
			return {
				myMovies: [],
			}
		},
	computed: { // выводим список через computed св-во
		movies() {
				return this.$store.getters.getMovies;
			},
		},
	// created () { // или через массив и хук жизненного цикла
	// 	this.movies = this.$store.getters.getMovies
	// }
	// НЕ БУДЕТ РАБОТАТЬ С ПОИСКОМ ... вызываем фильмы на нашем created () , что означает, что это будет запускаться только один раз, потому что наш компонент создается только один раз.
}
</script>

<style lang='scss' scoped>
	#movie-container {
		padding-top: 1rem;
		display: flex;
		flex-wrap: wrap;
		flex-grow: 2;
		justify-content: center;
	}
</style>