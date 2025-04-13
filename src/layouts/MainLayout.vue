<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Galileo Orbital Propagator </q-toolbar-title>

        <div>A High-Precision Orbital Propagator</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Orbital Propagator </q-item-label>

        <q-item clickable tag="a" target="_blank">
          <q-item-section avatar>
            <q-icon name="satellite_alt" />
          </q-item-section>
          <div @click="toggleSatelliteModal">
            <q-item-section>
              <q-item-label>Add satellite</q-item-label>
              <q-item-label caption>
                Configure new satellite
              </q-item-label>
            </q-item-section>
          </div>

        </q-item>

        <!-- <AddSatelliteModal v-model:show="showAddSatelliteModal" @add-satellite="addSatellite"
          :modalValue="showAddSatelliteModal" /> -->

        <q-dialog v-model="showAddSatelliteModal" persistent>
          <q-card style="min-width: 600px; max-width: 900px">
            <q-card-section>
              <div class="text-h5">Add New Satellite</div>
            </q-card-section>

            <q-separator />

            <q-card-section>
              <!-- Tab Navigation -->
              <q-tabs v-model="activeTab" class="text-primary" align="justify">
                <q-tab name="physical" label="Physical Parameters" />
                <q-tab name="orbital" label="Orbital Parameters" />
                <q-tab name="attitude" label="Attitude Parameters" />
              </q-tabs>

              <q-separator />

              <!-- Tab Content -->
              <q-tab-panels v-model="activeTab" animated>
                <!-- Physical Parameters -->
                <q-tab-panel name="physical">
                  <q-form>
                    <q-input v-model="satellite.name" label="Name" outlined required />
                    <q-input v-model.number="satellite.mass" label="Mass (kg)" type="number" outlined required />
                    <q-input v-model="satellite.Cd" label="Drag Coefficient (Cd)" type="number" outlined />
                    <q-input v-model="satellite.Cl" label="Lift Coefficient (Cl)" type="number" outlined />
                    <q-input v-model="satellite.Cr" label="Reflectivity Coefficient (Cr)" type="number" outlined />
                  </q-form>
                </q-tab-panel>

                <!-- Orbital Parameters -->
                <q-tab-panel name="orbital">
                  <q-form>
                    <q-input v-model="satellite.a0" label="Semi-major Axis (km)" type="number" outlined />
                    <q-input v-model="satellite.e0" label="Eccentricity" type="number" outlined />
                    <q-input v-model="satellite.i0" label="Inclination (°)" type="number" outlined />
                    <q-input v-model="satellite.raan0" label="RAAN (°)" type="number" outlined />
                    <q-input v-model="satellite.argp0" label="Argument of Perigee (°)" type="number" outlined />
                    <q-input v-model="satellite.nu0" label="True Anomaly (°)" type="number" outlined />
                  </q-form>
                </q-tab-panel>

                <!-- Attitude Parameters -->
                <q-tab-panel name="attitude">
                  <q-form>
                    <q-input v-model="satellite.q" label="Quaternion (q)" outlined />
                    <q-input v-model="satellite.w" label="Angular Velocity (w)" outlined />
                  </q-form>
                </q-tab-panel>
              </q-tab-panels>
            </q-card-section>

            <q-separator />

            <!-- Actions -->
            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="primary" @click="showAddSatelliteModal = false" />
              <q-btn label="Add Satellite" color="primary" @click="createSat" />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-item clickable tag="a" target="_blank">
          <q-item-section avatar>
            <q-icon name="insights" />
          </q-item-section>
          <div @click="toggleFormationModal">
            <q-item-section>
              <q-item-label>Add Formation</q-item-label>
              <q-item-label caption>
                Configure new satellite formation
              </q-item-label>
            </q-item-section>
          </div>
        </q-item>

        <q-dialog v-model="showAddFormationModal" persistent>
          <q-card style="min-width: 600px; max-width: 900px">
            <q-card-section>
              <div class="text-h5">Add New Satellite</div>
            </q-card-section>

            <q-separator />

            <q-card-section>
              <!-- Tab Navigation -->
              <q-tabs v-model="activeTab" class="text-primary" align="justify">
                <q-tab name="physical" label="Physical Parameters" />
                <q-tab name="orbital" label="Orbital Parameters" />
                <q-tab name="attitude" label="Attitude Parameters" />
              </q-tabs>

              <q-separator />

              <!-- Tab Content -->
              <q-tab-panels v-model="activeTab" animated>
                <!-- Physical Parameters -->
                <q-tab-panel name="physical">
                  <q-form>
                    <q-input v-model="satellite.name" label="Name" outlined required />
                    <q-input v-model.number="satellite.mass" label="Mass (kg)" type="number" outlined required />
                    <q-input v-model="satellite.Cd" label="Drag Coefficient (Cd)" type="number" outlined />
                    <q-input v-model="satellite.Cl" label="Lift Coefficient (Cl)" type="number" outlined />
                    <q-input v-model="satellite.Cr" label="Reflectivity Coefficient (Cr)" type="number" outlined />
                  </q-form>
                </q-tab-panel>

                <!-- Orbital Parameters -->
                <q-tab-panel name="orbital">
                  <q-form>
                    <q-input v-model="satellite.a0" label="Semi-major Axis (km)" type="number" outlined />
                    <q-input v-model="satellite.e0" label="Eccentricity" type="number" outlined />
                    <q-input v-model="satellite.i0" label="Inclination (°)" type="number" outlined />
                    <q-input v-model="satellite.raan0" label="RAAN (°)" type="number" outlined />
                    <q-input v-model="satellite.argp0" label="Argument of Perigee (°)" type="number" outlined />
                    <q-input v-model="satellite.nu0" label="True Anomaly (°)" type="number" outlined />
                  </q-form>
                </q-tab-panel>

                <!-- Attitude Parameters -->
                <q-tab-panel name="attitude">
                  <q-form>
                    <q-input v-model="satellite.q" label="Quaternion (q)" outlined />
                    <q-input v-model="satellite.w" label="Angular Velocity (w)" outlined />
                  </q-form>
                </q-tab-panel>
              </q-tab-panels>
            </q-card-section>

            <q-separator />

            <!-- Actions -->
            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="primary" @click="showAddFormationModal = false" />
              <q-btn label="Add Formation" color="primary" @click="createFormation" />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-item clickable tag="a" target="_blank">
          <q-item-section avatar>
            <q-icon name="public" />
          </q-item-section>
          <div @click="toggleConstellationModal">
            <q-item-section>
              <q-item-label>Add Constellation</q-item-label>
              <q-item-label caption>
                Configure new satellite constellation
              </q-item-label>
            </q-item-section>
          </div>
        </q-item>

        <q-dialog v-model="showAddConstellationModal" persistent>
          <q-card style="min-width: 600px; max-width: 900px">
            <q-card-section>
              <div class="text-h5">Add New Constellation</div>
            </q-card-section>

            <q-separator />

            <q-card-section>
              <!-- Tab Navigation -->
              <q-tabs v-model="activeTab" class="text-primary" align="justify">
                <q-tab name="physical" label="Physical Parameters" />
                <q-tab name="orbital" label="Orbital Parameters" />
                <q-tab name="attitude" label="Attitude Parameters" />
              </q-tabs>

              <q-separator />

              <!-- Tab Content -->
              <q-tab-panels v-model="activeTab" animated>
                <!-- Physical Parameters -->
                <q-tab-panel name="physical">
                  <q-form>
                    <q-input v-model="satellite.name" label="Name" outlined required />
                    <q-input v-model.number="satellite.mass" label="Mass (kg)" type="number" outlined required />
                    <q-input v-model="satellite.Cd" label="Drag Coefficient (Cd)" type="number" outlined />
                    <q-input v-model="satellite.Cl" label="Lift Coefficient (Cl)" type="number" outlined />
                    <q-input v-model="satellite.Cr" label="Reflectivity Coefficient (Cr)" type="number" outlined />
                  </q-form>
                </q-tab-panel>

                <!-- Orbital Parameters -->
                <q-tab-panel name="orbital">
                  <q-form>
                    <q-input v-model="satellite.a0" label="Semi-major Axis (km)" type="number" outlined />
                    <q-input v-model="satellite.e0" label="Eccentricity" type="number" outlined />
                    <q-input v-model="satellite.i0" label="Inclination (°)" type="number" outlined />
                    <q-input v-model="satellite.raan0" label="RAAN (°)" type="number" outlined />
                    <q-input v-model="satellite.argp0" label="Argument of Perigee (°)" type="number" outlined />
                    <q-input v-model="satellite.nu0" label="True Anomaly (°)" type="number" outlined />
                  </q-form>
                </q-tab-panel>

                <!-- Attitude Parameters -->
                <q-tab-panel name="attitude">
                  <q-form>
                    <q-input v-model="satellite.q" label="Quaternion (q)" outlined />
                    <q-input v-model="satellite.w" label="Angular Velocity (w)" outlined />
                  </q-form>
                </q-tab-panel>
              </q-tab-panels>
            </q-card-section>

            <q-separator />

            <!-- Actions -->
            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="primary" @click="showAddConstellationModal = false" />
              <q-btn label="Add constellation" color="primary" @click="createFormation" />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <!-- <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" /> -->
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
/* eslint-disable */
import EssentialLink from 'components/EssentialLink.vue';
import { defineComponent, ref } from 'vue';
import useStore from 'src/pinia';
import AddSatelliteModal from 'components/AddSatelliteModal.vue'; // Import modal component

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Add satellite',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Add satellite formation',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Add satellite constellation',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
  },
  {
    title: 'Add maneuver node',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
  },
  {
    title: 'Load config',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
  },
  {
    title: 'Save config',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
    AddSatelliteModal,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const store = useStore();

    const addSatellite = (newSatellite: { a0: number; e0: number; i0: number; raan0: number; argp0: number; nu0: number; name: string; mass: number; Cd: number; Cl: number; Cr: number; q: number[]; w: number[]; }) => {
      console.log('Adding satellite!', newSatellite);
      let path = `${newSatellite.name}.json`;
      let satObject = {
        path: path,
        properties: newSatellite,
      };
      store.satellites.push(satObject);
    };

    const satellite = ref({
      name: '',
      mass: 100,
      a0: 6978,
      e0: 0.01,
      i0: 45,
      raan0: 0,
      argp0: 0,
      nu0: 0,
      Cd: 2.2,
      Cl: 0.05,
      Cr: 1.2,
      q: [1, 0, 0, 0],
      w: [0, 0, 0],
    });

    const activeTab = ref('physical'); // Default tab

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      addSatellite,
      satellite,
      activeTab,
    };
  },
  data() {
    return {
      showAddSatelliteModal: false,
      showAddFormationModal: false,
      showAddConstellationModal: false
    };
  },
  methods: {
    toggleSatelliteModal() {
      console.log('toggleSatelliteModal');
      this.showAddSatelliteModal = !this.showAddSatelliteModal;
    },
    toggleFormationModal() {
      console.log('toggleSatelliteModal');
      this.showAddFormationModal = !this.showAddFormationModal;
    },
    toggleConstellationModal() {
      console.log('toggleSatelliteModal');
      this.showAddConstellationModal = !this.showAddConstellationModal;
    },
    createSat() {
      console.log('createSat');
      this.addSatellite(this.satellite);
      this.showAddSatelliteModal = false;
    },
    createFormation() {
      console.log('createFormation');
      this.showAddFormationModal = false;
    },
    createConstellation() {
      console.log('createConstellation');
      this.showAddConstellationModal = false;
    },
  },
});
</script>
