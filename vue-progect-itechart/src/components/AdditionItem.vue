<template>
  <div>
    <slot />
    <div class="counter">
      <i class="fas fa-minus" @click="handleMinus"></i>
      {{ modelValue }}
      <i class="fas fa-plus" @click="handlePlus"></i>
    </div>
    ${{cost}}
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
    cost: {
        type: Number,
        default: 0,
    }
  },

  methods: {
    handleMinus() {
      if (this.modelValue > 0) {
        this.$emit("update:modelValue", this.modelValue - 1);
      }
    },
    handlePlus() {
      this.$emit("update:modelValue", this.modelValue + 1);
    },
  },
};
</script>

<style>
</style>