<template>
  <div class="selector">
    <v-select
      v-bind:items="formatItemsForSelect(items)"
    />
    <!-- <md-field>
      <md-select
        placeholder="Workspace"
        v-bind:value="value"
        v-on:change="$emit('change', $event.target.value)"
      >
        <md-option
          v-for="item in items"
          v-bind:key="item.uid || item.id"
          v-bind:value="item.uid || item.id"
        >
          {{ item.name }}
        </md-option>
      </md-select>
    </md-field> -->
  </div>
</template>

<script>
import { reduce } from 'ramda';

export default {
  name: 'Selector',
  props: {
    value: String,
    items: Array,
  },
  methods: {
    formatItemsForSelect(items) {
      const newItems = reduce((acc, item) => ([
        ...acc,
        {
          value: item.uid || item.id,
          text: item.name,
        }
      ]), [], items);

      console.log(newItems);

      return newItems;
    },
  },
};
</script>

<style scoped lang="stylus">
</style>
