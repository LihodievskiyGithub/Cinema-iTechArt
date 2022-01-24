<template>
  <div class="add-block">
    <button @click="addList = !addList" class="add-block__button">
      <img src="../assets/images/add.svg" />
    </button>
    <ul :class="{ active: addList }" class="add-block__list">
      <li class="add-block__item">
        <button class="add-block__item-button" @click="showModalSession = true">
          Add Session
        </button>
      </li>
      <li class="add-block__item">
        <button class="add-block__item-button" @click="showHallModal = true">
          Add hall
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addList: false,
      showHallModal: false,
      showModalSession: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.add-block {
  position: relative;
  width: 23px;
  height: 23px;
  margin-left: auto;

  &__button {
    background: transparent;
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    padding: 0;
    cursor: pointer;

    img {
      height: 100%;
      object-fit: contain;
    }
  }
  &__list {
    position: absolute;
    top: 27px;
    right: 0;
    background: #ffffff;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 200px;
    opacity: 0;
    visibility: hidden;
    overflow: hidden;
    border-radius: 15px;
    transition: all 0.4s ease-in-out;
    z-index: 1;

    &.active {
      opacity: 1;
      visibility: visible;
    }
  }

  &__item {
    height: 25px;
    border-bottom: 1px solid #000;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      .add-block__item-button {
        background: #000;
        color: #fff;
      }
    }

    &-button {
      height: 100%;
      width: 100%;
      padding: 0;
      background: transparent;
      border: none;
      outline: none;
      font-weight: 500;
      text-transform: uppercase;
      cursor: pointer;
    }
  }
}
</style>