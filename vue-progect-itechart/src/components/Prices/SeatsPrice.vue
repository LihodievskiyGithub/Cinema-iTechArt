<template>
  <div class="container">
    <div class="container-text">
      <span class="header-text">
        <h4 class="text">Type of seats</h4>
      </span>
      <div class="cinema-name">Cinema City</div>

      <div class="item-1">
        <movie-seat />
        <div>
          <div class="seats-name">
            <span class="name">Movie seat</span>
          </div>
          <div class="seats-price">
            <span class="price">7 $</span>
          </div>
          <div class="seats-description">
            <span class="description"
              >Single comfortable wide armchair with cup holder.</span
            >
          </div>
        </div>
      </div>

      <div class="item-2">
        <love-seat />

        <div>
          <div class="seats-name">
            <span class="name">Love Seat</span>
          </div>
          <div class="seats-price">
            <span class="price">10 $</span>
          </div>
          <div class="seats-description">
            <span class="description"
              >Comfortable armchair for one person with adjustable backrest and
              footrest height. Each chair has its own table. Thanks to the
              innovative mechanism, you can watch a movie almost horizontally
              while still sitting in your seat in the cinema hall.</span
            >
          </div>
        </div>
      </div>

      <div class="item-3">
        <sofa-seat />

        <div>
          <div class="seats-name">
            <span class="name">Premiere Sofa</span>
          </div>
          <div class="seats-price">
            <span class="price">15 $</span>
          </div>
          <div class="seats-description">
            <span class="description">
              Double soft sofas with headrests. The comfort of this armchairs
              will instantly allow you to relax and feel like at home.</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieSeat from "../Seats/MovieSeat.vue";
import LoveSeat from "../Seats/LoveSeat.vue";
import SofaSeat from "../Seats/SofaSeat.vue";
export default {
  components: {
    MovieSeat,
    LoveSeat,
    SofaSeat,
  },
};
</script>

<style lang="scss" scoped>
.header-text h4 {
  margin: 25px 0px;
  color: rgba(255, 255, 255, 0.8);
}

.container-text {
  margin: 0px 50px 0px 0px;
}

.cinema-name {
  line-height: 50px;
  opacity: 0.5;
  color: rgba(255, 255, 255, 0.651);
}

.name {
  margin: 1.125em 0px;
  text-size-adjust: 100%;
  white-space: pre-line;
  font: 400 1em / 1.625em Ubuntu, Roboto, Arial, Helvetica, sans-serif;
  color: rgba(255, 255, 255, 0.8);
}

.seats-price {
  margin-left: 20px;
  flex: 0 0 auto;
}

.item-1 {
  /* display: flex; */
  padding: 15px 0px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);

  svg {
    width: 60px;
  }
}

.item-2 {
  padding: 15px 0px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  color: rgb(173, 53, 50);
}

.item-3 {
  padding: 15px 0px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  color: rgb(188, 140, 50);
}

.price {
  color: rgba(255, 255, 255, 0.8);
}

.description {
  /* padding-top: 15px; */
  color: rgba(255, 255, 255, 0.39);
}
</style>