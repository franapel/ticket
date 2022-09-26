<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const { status, amount } = route.query;
router.push("/transaction");
</script>

<template>
  <div class="container">
    <h1>{{ status }}</h1>
    <h1>{{ amount }}</h1>
  </div>
</template>

<style scoped>
.container {
  color: #000;
}
</style>
