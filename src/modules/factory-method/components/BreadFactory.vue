<template>
  <div class="bread-factory">
    <header class="heading-section">
      <h1>Bread Factory</h1>
    </header>
    <section class="body-section">
      <div>
        <h4>Pick a location</h4>
        <Dropdown
          v-model:modelValue="selectedLocation"
          :options="locations"
          placeholder="Select a location"
        />
      </div>
      <div v-if="selectedLocation">
        <h4>What kind of Bread do you want?</h4>
        <Dropdown
          v-model:modelValue="selectedBreadType"
          :options="availableBreadTypes"
          placeholder="Select a bread type"
        />
      </div>

      <div v-if="selectedBreadType">
        <h4>Here is your bread</h4>
        <p>
          {{ bread ? JSON.stringify(bread, null, 2) : null }}
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Dropdown from "primevue/dropdown";
import { ref, computed } from "vue";
import { LagosBreadFactory } from "../creators/LagosBreadFactory";
import { IbadanBreadFactory } from "../creators/IbadanBreadFactory";
import type { BreadFactory } from "../BreadFactory";
import { BreadSize } from "../BreadFactory";
import type { Bread } from "../BreadFactory";
const factories: BreadFactory[] = [new LagosBreadFactory(), new IbadanBreadFactory()];
const locations = ref(factories.map((factory) => factory.address));
const selectedLocation = ref<string | null>(null);
const selectedFactory = computed(() => {
  return factories.find((factory) => factory.address === selectedLocation.value);
});
const availableBreadTypes = computed(() => {
  return Array.from(selectedFactory.value?.availableBread.keys() ?? []);
});

const selectedBreadType = ref<string | null>(null);
const bread = computed<Bread | undefined>(() => {
  if (!selectedBreadType.value) return undefined;
  return selectedFactory.value?.createBread(selectedBreadType.value, BreadSize.SM, false);
});
</script>

<style>
.heading-section {
  background: #000;
  color: #fff;
  padding: 5rem 1rem;
}
.body-section {
  background: #fff;
  color: #000;
  padding: 2rem 1rem;
}
</style>
