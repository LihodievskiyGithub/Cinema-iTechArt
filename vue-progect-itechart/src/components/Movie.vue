<template>
    <div class="movie">
        <!-- когда мы захотим получить какое-то значение из нашего объекта фильма здесь, мы можем привязаться к этому значению -->
		<img :src="movie.poster" alt="Movie poster" @click="openDetails()">
		<!-- <router-link to="/movie-preview/:id">
			<img :src="movie.poster" alt="Movie poster" @click="openDetails">
		</router-link> -->
        
        <div class="description">
            <div class="basic-info">
                <h3>{{movie.name}}</h3>
                <span :style="{'background-color': raitingColor}">{{movie.rating}}</span>
            </div>
                <p>{{movie.genre}}</p>
                <p>{{movie.year}}</p>
        </div>
    </div>
</template>

<script>
import ratingMixin from '../mixin/getRatingColor'

export default {
	mixins: [ratingMixin],
    props: {
        movie: {
            type: Object,
            default: () => {}
        }
    },
	methods: {
			openDetails () {
			console.log('hello');
			this.$router.push({
				name: 'moviePreview',
				params: { id: this.movie.id }
		})
	}
	}
		// И затем мы можем использовать этот метод push, 
		// который фактически переместит наше состояние на другой маршрут, добавит еще одну вставку в наш объект истории
		// передаем имя роутера и параметры (которые мы поределили)
	
}
</script>

<style lang='scss' scoped>
// #5eb85e
// #ffa809
// #e10505
	.movie {
		flex: 1;
		margin: 1rem;
		min-width: 300px;
		max-width: 300px;
		position: relative;

		img {
			max-width: 100%;
			box-shadow: 0 14px 28px rgba(0, 0, 0, 0.473),
				0 10px 10px rgba(0, 0, 0, 0.473);
			margin-bottom: 7px;
			border-radius: 15px;
			cursor: pointer;
		}

		.description {
			padding: 1rem 0;

			.basic-info {
				display: flex;
				justify-content: space-between;

				h3 {
					margin: 0;
					text-align: left;
					color: white;
				}

				span {
					border-radius: 10px;
					font-size: 20px;
					width: 53px;
					color: white;
				}
			}

			p {
				margin: 5px 0;
				color: rgb(143, 143, 143);
				text-align: left;
			}
		}
	}
</style>
