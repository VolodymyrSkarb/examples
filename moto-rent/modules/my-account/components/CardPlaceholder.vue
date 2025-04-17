<template>
  <div class="list-card">
    <div class="list-item" v-for="(item) in perPage" :key="item">
      <div class="placeholder-glow content">
        <span class="placeholder name-moto col-3"></span>
        <span class="placeholder col-5"></span>
      </div>
      <div class="placeholder-glow actions">
        <span class="placeholder col-10"></span>
        <span class="placeholder"></span>
        <span class="placeholder col-10"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps<{perPage: number}>();
</script>
