<script setup lang="ts">
import { ref } from 'vue';
import { useEventStore, useCartStore } from '../store/index';
import { router } from '../router';
import { IEvent } from '../store';

const eventStore = useEventStore();
const cartStore = useCartStore();
const events = eventStore.events;
const selectedEvent = ref(events[0]);
const eventQuantity = ref(0);
const handleClickEvent = (event: IEvent) => {
  selectedEvent.value = event;
  eventQuantity.value = 0;
};
const getImgUrl = (name: string) => {
  return new URL(`../assets/${name}`, import.meta.url).href;
};
</script>

<template>
  <div class="container">
    <p class="cart pointer" @click="() => router.push('/cart')">
      {{ cartStore.count }}
    </p>
    <div class="selected text-center pointer">
      <img class="selected-img" :src="getImgUrl(selectedEvent.url)" />
      <p>{{ selectedEvent.name }}</p>
      <p>{{ selectedEvent.price }}</p>
      <div class="quantity">
        <input v-model="eventQuantity" />
        <button
          @click="
            () =>
              cartStore.addEvent({
                ...selectedEvent,
                quantity: Number(eventQuantity),
              })
          "
        >
          Agregar
        </button>
      </div>
    </div>
    <div class="options">
      <div
        class="text-center pointer"
        v-for="event in events"
        :key="event.id"
        @click="() => handleClickEvent(event)"
      >
        <img class="event-img" :src="getImgUrl(event.url)" />
        <p>{{ event.name }}</p>
        <p>{{ event.price }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.quantity {
  width: fit-content;
  display: flex;
  margin: 0 auto;
}
.text-center {
  text-align: center;
}
.pointer {
  cursor: pointer;
}
.cart {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 30px;
  right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: aqua;
  border-radius: 100%;
}
.container {
  color: #000;
}
.selected {
  width: fit-content;
  margin: 0 auto;
  margin-bottom: 50px;
}
.options {
  width: fit-content;
  margin: 0 auto;
  display: flex;
  gap: 20px;
}
.event-img {
  height: 180px;
}
.selected-img {
  height: 280px;
}
</style>
