<template>
  <v-container>
    <v-row
      v-for="envVal in alphabeticalValues"
      v-bind:key="generateKey(envVal.key)"
      no-gutters
    >
      <v-col
        cols="1"
      >
        {{ envVal.enabled }}
      </v-col>
      <v-col
        cols="7"
      >
        {{ envVal.key }}
      </v-col>
      <v-col
        cols="2"
      >
        {{ envVal.value }}
      </v-col>
      <v-col
        cols="2"
      >
        Button
      </v-col>
    </v-row>
  </v-container>
    <!-- <div class="container">
      <template v-for="envVal in alphabeticalValues">
        <div v-bind:key="generateKey(envVal.key + 'enabled')">{{ envVal.enabled}}</div>
        <div v-bind:key="generateKey(envVal.key + 'key')">{{ envVal.key }}</div>
        <div v-bind:key="generateKey(envVal.key + 'value')">{{ envVal.value }}</div>
        <div v-bind:key="generateKey(envVal.key + 'button')">Button</div>
      </template>
    </div> -->
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
.col
  word-wrap anywhere
  text-align start
</style>
