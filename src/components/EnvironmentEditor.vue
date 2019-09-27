<template>
  <div class="environment-editor">
    <selector
      v-model="selectedWorkspace"
      v-on:change="selectWorkspace"
      v-bind:items="availableWorkspaces"
    />
    <selector
      v-if="availableEnvironments.length > 0"
      v-model="selectedEnvironment"
      v-on:change="selectEnvironment"
      v-bind:items="availableEnvironments"
    />
    <environment-form
      v-bind:environment="environmentBeingEdited"
    />
  </div>
</template>

<script>
import {
  compose,
  curry,
  equals,
  filter,
  path,
  pathOr,
} from 'ramda';
import { getWorkspaces, getWorkspaceEnvironments, getEnvironment } from '../services/postman';
import Selector from './Selector.vue';
import EnvironmentForm from './EnvironmentForm.vue';

const getTeamWorkspaces = () => {
  const filterByType = curry((type, workspaces) => {
    const isTypeTeam = compose(
      equals('team'),
      path(['type']),
    );

    return filter(
      isTypeTeam,
      workspaces,
    );
  });

  return getWorkspaces()
    .then(pathOr([], ['data', 'workspaces']))
    .then(filterByType('team'))
    .catch(console.error);
};

export default {
  name: 'EnvironmentEditor',
  components: {
    Selector,
    EnvironmentForm,
  },
  data() {
    return {
      selectedWorkspace: undefined,
      availableWorkspaces: [],
      selectedEnvironment: undefined,
      availableEnvironments: [],
      environmentBeingEdited: undefined,
    };
  },
  mounted() {
    return getTeamWorkspaces()
      .then((workspaces) => {
        this.availableWorkspaces = workspaces;
      });
  },
  methods: {
    selectWorkspace(workspaceId) {
      this.selectedWorkspace = workspaceId;
      this.selectedEnvironment = undefined;
      this.availableEnvironments = [];

      getWorkspaceEnvironments(workspaceId)
        .then((environments) => {
          console.log(environments);
          this.availableEnvironments = environments;
        });
    },
    selectEnvironment(environment) {
      this.selectedEnvironment = environment;

      console.log(environment);
      getEnvironment(environment)
        .then((environmentResponse) => {
          this.environmentBeingEdited = environmentResponse;
        });
    },
  },
};
</script>

<style scoped lang="stylus">
</style>
