<template>
  <svg
    v-if="isReserved || isBought"
    :class="{bought: isBought}"
    viewBox="-1 0 54 24"
    width="100%"
    height="100%"
  >
    <path
      fill="currentColor"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M52,17.3c0,3.7-3.7,6.7-7.5,6.7H7.5C3.7,24,0,21,0,17.3C0,16,1,15,2.2,15h2.8c0.5,2.3,2.5,4,4.9,4h32 c2.4,0,4.5-1.7,4.9-4h2.8C51,15,52,16,52,17.3z M7,13.9c0,1.7,1.3,3,3,3h32c1.7,0,3-1.3,3-3v-0.4c0,0-0.1-0.5,0.5-0.5s5.5,0,5.5,0V2 c0-1.1-0.9-2-2-2h-7H10H3C1.9,0,1,0.9,1,2v11c0,0,4.9,0,5.4,0S7,13.5,7,13.5V13.9z"
    ></path>
  </svg>

  <svg v-else viewBox="-1 0 54 24" width="100" height="100%">
    <path
      fill="currentColor"
      d="M51.2,13.8V3c0-1.7-1.3-3-3-3h-44c-1.7,0-3,1.3-3,3v10.5C0.5,13.9,0,14.6,0,15.6c0,5,4,8.4,9,8.4h34 c5,0,9-3.4,9-8.4C52,14.8,51.7,14.2,51.2,13.8z M4.2,2h44c0.6,0,1,0.4,1,1v10H49c0,0,0,0,0,0h-1.6c0,0-1.7,0-2,0S45,13.3,45,13.3 c0,1.7-1.3,3-3,3H10c-1.7,0-3-1.3-3-3c0,0,0-0.3-0.4-0.3c-0.4,0-3.5,0-3.5,0V3C3.2,2.5,3.6,2,4.2,2z M43,22H9c-4.1,0-7-2.7-7-6.4 C2,15.1,2.6,15,3,15h2.4c0.7,1.9,2.5,3.3,4.7,3.3h32c2.2,0,4-1.4,4.7-3.3H49c0.4,0,1,0.1,1,0.6C50,19.3,47.1,22,43,22z"
    ></path>
  </svg>
</template>

<script>
export default {
  props: {
    isReserved: {
      type: Boolean,
      default: false,
    },
    isBought: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
svg {
  color: rgb(173, 53, 50);
}

.bought {
  color: grey;
}
</style>