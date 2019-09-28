<template>
  <div id="app">
    <v-app>
      <v-content>
        <EnvironmentEditor />
      </v-content>
    </v-app>
  </div>
</template>

<script>
import EnvironmentEditor from './components/EnvironmentEditor.vue';

console.log('app');
console.log(process.env);

export default {
  name: 'app',
  components: {
    EnvironmentEditor,
  },
};
</script>
<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
