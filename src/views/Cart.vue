<script setup lang="ts">
import { WebpayPlus } from 'transbank-sdk';
import { useCartStore } from '../store/index';
import axios from 'axios';
import { ref } from 'vue';

const createTransaction = async () => {
  let buyOrder = 'O-' + Math.floor(Math.random() * 10000) + 1;
  let sessionId = 'S-' + Math.floor(Math.random() * 10000) + 1;
  let amount = cartStore.totalCost;
  let returnUrl = 'http://localhost:8081/transaction';

  const response = await axios.post('http://localhost:8081/transaction', {
    buyOrder,
    sessionId,
    amount,
    returnUrl,
  });
  const { token, url } = response.data;
  transaction.value = { token, url };
};
const transaction = ref({ token: '', url: '' });
const cartStore = useCartStore();
const cartEvents = cartStore.events;

const getImgUrl = (name: string) => {
  return new URL(`../assets/${name}`, import.meta.url).href;
};
</script>

<template>
  <div class="container">
    <h1>Carro</h1>
    <div class="items">
      <div class="item" v-for="event in cartEvents" :key="event.id">
        <img class="event-img" :src="getImgUrl(event.url)" />
        <div class="detail">
          <p>{{ event.name }}</p>
          <p>{{ event.price }}</p>
          <p>x{{ event.quantity }}</p>
        </div>
      </div>
      <p>TOTAL >> {{ cartStore.totalCost }}</p>
      <button @click="createTransaction">Webpay</button>
      <form
        :action.prevent="transaction.url"
        method="POST"
        v-if="transaction.token != ''"
      >
        <input
          type="hidden"
          name="token_ws"
          :value="transaction.token"
        />
        <input type="submit" value="Pagar" />
      </form>
    </div>
  </div>
</template>

<style scoped>
.container {
  color: #000;
}
.items {
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.item {
  display: flex;
  gap: 10px;
  cursor: pointer;
}
.event-img {
  height: 80px;
}
.detail {
  text-align: end;
}
</style>
