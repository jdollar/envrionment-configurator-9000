<template>
  <div class="selector">
    <select
      v-bind:value="value"
      v-on:change="$emit('change', $event.target.value)"
    >
      <option value=""/>
      <option
        v-for="item in items"
        v-bind:key="item.uid || item.id"
        v-bind:value="item.uid || item.id"
      >
        {{ item.name }}
      </option>
    </select>
  </div>
</template>

<script>

export default {
  name: 'Selector',
  props: {
    value: String,
    items: Array,
  },
};
</script>

<style scoped lang="stylus">
</style>
