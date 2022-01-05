<template>
  <div class="container">
    <div class="container-text">
      <span class="header-text">
        <h4 class="text">Типы мест</h4>
      </span>
      <div class="cinema-name">Silver Screen cinemas в ТРЦ "ArenaCity"</div>

      <div class="item-1">
        <movie-seat />
        <div>
          <div class="seats-name">
            <span class="name">Кинокресло</span>
          </div>
          <div class="seats-price">
            <span class="price">13,00 BYN</span>
          </div>
          <div class="seats-description">
            <span class="description"
              >Одноместное комфортное широкое кресло с подстаканником.</span
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
            <span class="price">26,00 BYN</span>
          </div>
          <div class="seats-description">
            <span class="description"
              >Места для двоих повышенного комфорта. Сидения соединены таким
              образом, чтобы настроить зрителя на приятный просмотр. Уютные и
              невероятно мягкие и удобные диванчики идеально подойдут для
              свиданий, а также семейных и дружеских просмотров. Цена указана за
              двойное место.</span
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
            <span class="price">35,00 BYN</span>
          </div>
          <div class="seats-description">
            <span class="description"
              >Двухместные мягкие диванчики с подголовниками. Комфорт этого
              кресла моментально позволит вам расслабиться и почувствовать себя
              как дома. Цена указана за двойное место.</span
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