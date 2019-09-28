<template>
  <div class="environment-editor">
    <v-select
      label="Workspace"
      v-model="selectedWorkspace"
      v-on:change="selectWorkspace"
      v-bind:items="availableWorkspaces"
    />
    <v-select
      v-if="availableEnvironments.length > 0"
      label="Environment"
      v-model="selectedEnvironment"
      v-on:change="selectEnvironment"
      v-bind:items="availableEnvironments"
    />
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
    ></v-progress-circular>

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
  reduce,
} from 'ramda';
import { getWorkspaces, getWorkspaceEnvironments, getEnvironment } from '../services/postman';
// import Selector from './Selector.vue';
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

const formatResponseForSelect = items => reduce(
  (acc, item) => ([
    ...acc,
    {
      text: path(['name'], item),
      value: item.uid || item.id,
    },
  ]),
  [],
  items,
);

export default {
  name: 'EnvironmentEditor',
  components: {
    // Selector,
    EnvironmentForm,
  },
  data() {
    return {
      loading: false,
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
        this.availableWorkspaces = formatResponseForSelect(workspaces);
      });
  },
  methods: {
    selectWorkspace(workspaceId) {
      this.selectedWorkspace = workspaceId;
      this.selectedEnvironment = undefined;
      this.availableEnvironments = [];

      getWorkspaceEnvironments(workspaceId)
        .then((environments) => {
          this.availableEnvironments = formatResponseForSelect(environments);
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
