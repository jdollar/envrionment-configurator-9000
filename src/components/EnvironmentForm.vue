<template>
  <div class="form">
    <div class="container">
      <template v-for="envVal in alphabeticalValues">
        <div v-bind:key="generateKey(envVal.key + 'enabled')">{{ envVal.enabled}}</div>
        <div v-bind:key="generateKey(envVal.key + 'key')">{{ envVal.key }}</div>
        <div v-bind:key="generateKey(envVal.key + 'value')">{{ envVal.value }}</div>
        <div v-bind:key="generateKey(envVal.key + 'button')">Button</div>
      </template>
    </div>
  </div>
</template>

<script>
import { sortBy, prop } from 'ramda';

export default {
  name: 'EnvironmentForm',
  props: {
    environment: Object,
  },
  data() {
    return {
      keys: new Set([]),
    };
  },
  computed: {
    alphabeticalValues() {
      return this.environment ? sortBy(prop('key'), this.environment.values) : [];
    },
  },
  beforeUpdate() {
    this.keys.clear();
  },
  methods: {
    generateKey(simpleKey, count = 0) {
      const key = simpleKey + count;
      console.log(key);
      if (this.keys.has(key)) {
        return this.generateKey(simpleKey, count + 1);
      }

      this.keys.add(key);
      return key;
    },
  },
};
</script>

<style scoped lang="stylus">
.form
  margin-top 1em
.container
  display grid
  grid-template-columns 10% 50% 20% 20%
</style>
