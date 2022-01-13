<template>
  <div class="header-container">
    <span class="timer-container" v-if="timerFinishedDate"
      >{{ timer }} for payment</span
    >
  </div>
</template>

<script>
import moment from "moment";
import { subscribe } from "../services/socketIo";

export default {
  data() {
    return {
      currentDate: new Date(),
      intervalId: null,
      timerFinishedDate: null,
    };
  },
  computed: {
    timer() {
      if (!this.timerFinishedDate) return null;
      const timerFinishedDate = moment(this.timerFinishedDate);
      const timer = timerFinishedDate.diff(this.currentDate);
      return moment(timer).format("mm:ss");
    },
  },
  methods: {
    timerCreatedHandler({ timer }) {
      if (this.timerFinishedDate) return;
      this.currentDate = new Date();
      this.timerFinishedDate = new Date(timer.finishedDate);
      this.intervalId = setInterval(() => {
        this.currentDate = new Date();
      }, 1000);
    },

    timerDeletedHandler() {
      this.timerFinishedDate = null;
      clearInterval(this.intervalId);
    },
  },

  async created() {
    subscribe("timer-created", this.timerCreatedHandler.bind(this));
    subscribe("timer-deleted", this.timerDeletedHandler.bind(this));
    subscribe("timer-is-out", this.timerDeletedHandler.bind(this));
  },
};
</script>

<style scoped>
.header-container {
  border-bottom: 1px solid grey;
  margin: 0px 50px;
}

.timer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: white;

  animation-name: blinker;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(1.0,2.0,0,1.0);
  animation-duration: 1s;
  -webkit-animation-name: blinker;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: cubic-bezier(1.0,2.0,0,1.0);
  -webkit-animation-duration: 1s;
}

@keyframes blinker {
  from { opacity: 1.0; }
  to { opacity: 0.0; }
}
 
@-webkit-keyframes blinker {
  from { opacity: 1.0; }
  to { opacity: 0.0; }
}
</style>