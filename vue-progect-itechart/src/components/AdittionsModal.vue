<template>
  <modal @close="$emit('close')">
    <template v-slot:header>
      <h3 class="m-0">Additional Stuff</h3>
    </template>
    <template v-slot:body>
      <additon-item :cost="cost.cola" v-model="cola">
        <img src="../assets/images/coca-cola.jpg" alt="Cola" />
      </additon-item>
      <additon-item :cost="cost.popcorn" v-model="popcorn">
        <img src="../assets/images/popcorn.png" alt="Popcorn" />
      </additon-item>
      <additon-item :cost="cost.chips" v-model="chips">
        <img src="../assets/images/pringles.png" alt="Chips" />
      </additon-item>
      {{cost.total}}
    </template>
    <template v-slot:footer>
      <button @click="handleSave" class="saveStuff">Save</button>
    </template>
  </modal>
</template>

<script>
import Modal from "./Modal.vue";
import AdditonItem from "./AdditionItem.vue";
import calculateStuffSum from "../services/calculateStuffSum.js";

export default {
  components: { Modal, AdditonItem },
  data() {
    return {
      chips: 0,
      cola: 0,
      popcorn: 0,
    };
  },
  methods: {
    handleSave() {
      this.$emit("save", {
        chips: this.chips,
        cola: this.cola,
        popcorn: this.popcorn,
      });
    },
  },


  computed: {
    cost() {
      return calculateStuffSum({
        chips: this.chips,
        cola: this.cola,
        popcorn: this.popcorn,
      });
    },
  },
};
</script>

<style scoped>
img {
  width: 100px;
  height: 100px;
}

.saveStuff {
  background: green !important;
}
</style>