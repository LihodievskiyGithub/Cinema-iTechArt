<template>
  <div class="wrap">
    <button><span>{{title}}</span></button>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    }
  }
};
</script>

<style lang='scss' scoped>
$orange: #d67c21;

button {
  position: relative;
  display: flex;

  background: none;
  outline: none;
  border: none;
  padding: 0;
  cursor: pointer;
  
  color: #eee;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: .05em;
  
  span {
    position: relative;
    z-index: 1;
    display: block;
    min-width: 1em;
    padding: 1em;
    border-radius: 2em;
    // background-color: $orange;
    border: 1px solid darken($orange, 5%);
    box-shadow: -5px 5px 10px rgba(0,0,0,0.2);
    transition: transform .1s, box-shadow .2s, background-color .2s;
  }
  &::after {
    content: '';
    position: absolute;
    top: -1em;
    bottom: -1em;
    left: -1em;
    right: -1em;
    border-radius: 4em;
    box-shadow: 0 0 0px rgba(0,0,0,0.2), inset 0 0 0px rgba(0,0,0,0.2);
    transition: box-shadow .1s;
  }
  
  &:hover,
  &:focus {
    span {
      background-color: lighten($orange, 3%);
    }
  }
  &:active {
    span {
      background-color: $orange;
      transform: scale(0.99);
      box-shadow: -2px 2px 5px rgb(0, 0, 0);
    }
    &::after {
      box-shadow: 0 0 2px rgb(0, 0, 0), inset -3px 3px 1em rgba(0,0,0,0.2);
    }
  }
}

body {
  background-color: $orange;
}
.wrap {
  width: fit-content;
  text-align: center;
  margin-bottom: 3px;
  
  button {
    margin: 1em;
  }
}
</style>