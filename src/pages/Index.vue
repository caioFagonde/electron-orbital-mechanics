<template>
  <q-page class="full-width full-height">
    <propagator-summary title="Orbital propagator" active></propagator-summary>
  </q-page>
</template>

<script lang="ts">
/* eslint-disable */
import { Todo, Meta, Satellite } from 'components/models';
import PropagatorSummary from 'components/CompositionComponent.vue';
import { defineComponent, ref } from 'vue';
import useStore from 'src/pinia/index.js';
import { electronApi } from 'src/api/electron-api';

export default defineComponent({
  name: 'PageIndex',
  components: { PropagatorSummary },
  setup() {
    const store = useStore();

    // create initial missionConfig and propagatorConfig to store
    store.setMissionConfig({
      dt: 1,
      totalTime: 100,
      initialDate: '2021-01-01T00:00:00.000Z',
      primary: 'Earth',
      tbp: false,
      srp: false,
      drag: false,
      lift: false,
      rel: false,
      nMax: 0,
      mMax: 0,
    });
    store.setPropagatorConfig({
      relTol: 1e-13,
      absTol: 1e-13,
    });


    return { store };
  },
});
</script>
