<template>
  <div class="factory-method">
    <BreadFactory />
  </div>
</template>

<script setup lang="ts">
import BreadFactory from "@/modules/factory-method/components/BreadFactory.vue";
</script>

<style>
@media (min-width: 1024px) {
  .factory-method {
    min-height: 100vh;
    align-items: center;
  }
}
</style>
