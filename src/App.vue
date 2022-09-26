<script setup lang="ts">
import { useEventStore } from './store/index';
const eventStore = useEventStore();
eventStore.fetchEvents();
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
