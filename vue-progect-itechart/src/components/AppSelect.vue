<template>
  <form class="dropdown">
    <select v-model="cinemaModel" class="dropdown-select">
      <option value="" hidden disabled selected>Cinema</option>
      <option :value="option._id" v-for="option in cinemas" :key="option">
        {{ option.name }}
      </option>
    </select>
  </form>
  <form class="dropdown">
    <select v-model="cityModel" name="" id="" class="dropdown-select">
      <option value="" hidden disabled selected>City</option>
      <option :value="option._id" v-for="option in cities" :key="option">
        {{ option.cityName }}
      </option>
    </select>
  </form>
  <form class="dropdown">
    <select v-model="timeModel" class="dropdown-select">
      <option value="" hidden disabled selected>Time</option>
      <option :value="option._id" v-for="option in times" :key="option">
        {{ option.time }}
      </option>
    </select>
  </form>
  <form class="dropdown">
    <select v-model="dateModel" class="dropdown-select">
      <option value="" hidden disabled selected>Date</option>
      <option :value="option._id" v-for="option in dates" :key="option">
        {{ option.month }}
      </option>
    </select>
  </form>
</template>

<script>
import cinemaService from "../services/cinema";
import cityService from "../services/city";
import timeService from "../services/time";
import dateService from "../services/date";

export default {
  emits: [
    "filtersChange",
  ],
  props: {
    filters: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      cities: [],
      cinemas: [],
      dates: [],
      times: [],
    };
  },
  methods: {
    async fetchCities() {
      try {
        this.cities = await cityService.getCity();
      } catch (err) {
        console.log(err);
      }
    },

    async fetchCinemas() {
      const params = {};
      if (this.filters.city) {
          params.cityId = this.filters.city
        }
      try {
        this.cinemas = await cinemaService.getCinemas(params);
      } catch (err) {
        console.log(err);
      }
    },
    async fetchTimes() {
      try {
        this.times = await timeService.getTime();
      } catch (err) {
        console.log(err);
      }
    },

    async fetchDates() {
      try {
        this.dates = await dateService.getDate();
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    cinemaModel: {
      get() {
        return this.filters.cinema
      }, 
      set(value) {
        this.$emit("filtersChange", {...this.filters, cinema: value})
        console.log(value)
      },
    },
       cityModel: {
      get() {
        return this.filters.city
      }, 
      set(value) {
        this.$emit("filtersChange", {...this.filters, city: value})
        console.log(value)
      },
    },
       dateModel: {
      get() {
        return this.filters.date
      }, 
      set(value) {
        this.$emit("filtersChange", {...this.filters, date: value})
        console.log(value)
      },
    },
       timeModel: {
      get() {
        return this.filters.time
      }, 
      set(value) {
        this.$emit("filtersChange", {...this.filters, time: value})
        console.log(value)
      },
    }
  },
  watch: {
    "filters.city": function() {
      this.fetchCinemas();
    }
  },
  created() {
    this.fetchCinemas();
    this.fetchCities();
    this.fetchTimes();
    this.fetchDates();
  },
};
</script>

<style>
.dropdown {
  margin: 0 7px;
  display: inline-block;
  position: relative;
  overflow: hidden;
  height: 28px;
  width: 150px;
  background: #f2f2f2;
  border: 1px solid;
  border-color: white #f7f7f7 whitesmoke;
  border-radius: 3px;
  background-image: -webkit-linear-gradient(
    top,
    transparent,
    rgba(0, 0, 0, 0.06)
  );
  background-image: -moz-linear-gradient(top, transparent, rgba(0, 0, 0, 0.06));
  background-image: -o-linear-gradient(top, transparent, rgba(0, 0, 0, 0.06));
  background-image: linear-gradient(
    to bottom,
    transparent,
    rgba(0, 0, 0, 0.06)
  );
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
}

.dropdown:before,
.dropdown:after {
  content: "";
  position: absolute;
  z-index: 2;
  top: 9px;
  right: 10px;
  width: 0;
  height: 0;
  border: 4px dashed;
  border-color: #888888 transparent;
  pointer-events: none;
}

.dropdown:before {
  border-bottom-style: solid;
  border-top: none;
}

.dropdown:after {
  margin-top: 7px;
  border-top-style: solid;
  border-bottom: none;
}

.dropdown-select {
  position: relative;
  width: 130%;
  margin: 0;
  padding: 6px 8px 6px 10px;
  height: 28px;
  line-height: 14px;
  font-size: 12px;
  color: #62717a;
  text-shadow: 0 1px white;
  background: #f2f2f2; /* Fallback for IE 8 */
  background: rgba(
    0,
    0,
    0,
    0
  ) !important; /* "transparent" doesn't work with Opera */
  border: 0;
  border-radius: 0;
  -webkit-appearance: none;
}

.dropdown-select:focus {
  z-index: 3;
  width: 100%;
  color: #394349;
  outline: 2px solid #49aff2;
  outline: 2px solid -webkit-focus-ring-color;
  outline-offset: -2px;
}

.dropdown-select > option {
  margin: 3px;
  padding: 6px 8px;
  text-shadow: none;
  background: #f2f2f2;
  border-radius: 3px;
  cursor: pointer;
}
</style>