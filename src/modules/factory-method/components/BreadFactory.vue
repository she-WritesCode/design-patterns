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
        <h4>Choose a size</h4>
        <Dropdown
          v-model:modelValue="selectedSize"
          :options="availableSizes"
          placeholder="Select a size"
        />
      </div>
      <div v-if="selectedBreadType">
        <h4>Do you want it sliced??</h4>
        <InputSwitch v-model="isSliced" aria-describedby="text-error" />
      </div>

      <div v-if="selectedBreadType">
        <h4>That would go for</h4>
        <p>
          {{
            (bread ? bread.price : 0).toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
            })
          }}
        </p>
      </div>
      <div :key="Number(bread?.boxed) + 'test'" v-if="bread">
        <Button :disabled="bread?.boxed" @click="bread?.box()" label="Buy" />
      </div>
      <div :key="Number(bread?.boxed)" v-if="bread?.boxed">
        <div>
          <h2>Hurray! You just bought a great bread</h2>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Dropdown from "primevue/dropdown";
import InputSwitch from "primevue/inputswitch";
import Button from "primevue/button";
import { ref, computed, watch } from "vue";
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

const availableSizes = ref([BreadSize.SM, BreadSize.MD, BreadSize.LG]);
const selectedSize = ref<BreadSize | null>(null);
const isSliced = ref<boolean>(false);

const bread = computed<Bread | undefined>(() => {
  if (!selectedBreadType.value) return undefined;
  return selectedFactory.value?.createBread(
    selectedBreadType.value,
    selectedSize.value || BreadSize.MD,
    isSliced.value
  );
});

watch(
  () => selectedLocation.value,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      selectedBreadType.value = null;
    }
  }
);
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
