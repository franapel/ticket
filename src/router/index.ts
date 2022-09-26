import { createRouter, createWebHistory } from 'vue-router';
import Events from '../views/Events.vue';
import Cart from '../views/Cart.vue';
import Transaction from '../views/Transaction.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: Events },
    { path: '/cart', name: 'Cart', component: Cart },
    { path: '/transaction', name: 'Transaction', component: Transaction },
  ],
});
