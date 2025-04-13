<template>
  <q-page padding>
    <q-card class="q-ma-md">
      <q-card-section>
        <div class="text-h6">{{ title }}</div>
      </q-card-section>

      <q-separator />

      <!-- Add 3D Visualization Section -->
      <q-card-section>
        <div class="text-h6 q-mb-md">Orbit Preview</div>
        <div ref="vtkContainer"
          style="position:absolute;width: 40vw; height: 40vh; z-index: 3; background-color: grey;"></div>
      </q-card-section>

      <!-- Satellite List -->
      <q-card-section>
        <div class="text-h6 q-mb-md">Satellites</div>
        <q-list bordered separator>
          <q-expansion-item v-for="satellite in store.satellites" :key="satellite.path"
            :label="satellite.properties.name" expand-separator>
            <!-- Add Tabs -->
            <q-tabs v-model="activeTab" class="text-primary">
              <q-tab name="physical" label="Physical Parameters" />
              <q-tab name="orbital" label="Orbital Parameters" />
              <q-tab name="attitude" label="Attitude Parameters" />
            </q-tabs>

            <!-- Add Tab Panels -->
            <q-tab-panels v-model="activeTab" animated>
              <!-- Physical Parameters -->
              <q-tab-panel name="physical">
                <q-item>
                  <q-item-section>
                    <q-card class="shadow-8 q-pa-sm"><b>Name:</b> {{ satellite.properties.name }}</q-card>
                    <q-card class="shadow-8 q-pa-sm"><b>Mass:</b> {{ satellite.properties.mass }} kg</q-card>
                    <q-card class="shadow-8 q-pa-sm"><b>Drag Coefficient (C<sub>D</sub>):</b> {{ satellite.properties.Cd
                      }}</q-card>
                    <q-card class="shadow-8 q-pa-sm"><b>Lift Coefficient (C<sub>L</sub>):</b> {{ satellite.properties.Cl
                      }}</q-card>
                    <q-card class="shadow-8 q-pa-sm"><b>Reflectivity Coefficient (C<sub>R</sub>):</b> {{
                      satellite.properties.Cr }}</q-card>
                    <!-- <div><b>Path:</b> {{ satellite.path }}</div> -- unnecessary to display the path to the json file -->
                  </q-item-section>
                </q-item>
              </q-tab-panel>

              <!-- Orbital Parameters -->
              <q-tab-panel name="orbital">

                <q-item>
                  <q-item-section>
                    <q-card class="shadow-8 q-pa-sm"><b>Initial Semi-major Axis:</b> {{ satellite.properties.a0 }}
                      km</q-card>
                    <q-card class="shadow-8 q-pa-sm"><b>Initial Eccentricity:</b> {{ satellite.properties.e0 }}</q-card>
                    <q-card class="shadow-8 q-pa-sm"><b>Inclination:</b> {{ satellite.properties.i0 }}°</q-card>
                    <q-card class="shadow-8 q-pa-sm"><b>RAAN:</b> {{ satellite.properties.raan0 }}°</q-card>
                    <q-card class="shadow-8 q-pa-sm"><b>Argument of Perigee:</b> {{ satellite.properties.argp0
                      }}°</q-card>
                    <q-card class="shadow-8 q-pa-sm"><b>True Anomaly:</b> {{ satellite.properties.nu0 }}°</q-card>
                  </q-item-section>
                </q-item>
              </q-tab-panel>

              <!-- Attitude Parameters -->
              <q-tab-panel name="attitude">
                <q-item>
                  <q-item-section>
                    <q-card class="shadow-8 q-pa-sm"><b>Quaternion (q):</b> [{{ satellite.properties.q.join(', ')
                      }}]</q-card>
                    <q-card class="shadow-8 q-pa-sm"><b>Angular Velocity (ω):</b> [{{ satellite.properties.w.join(', ')
                      }}]</q-card>
                  </q-item-section>
                </q-item>
              </q-tab-panel>
            </q-tab-panels>
          </q-expansion-item>
        </q-list>
      </q-card-section>


      <q-separator />

      <!-- Mission Config -->
      <q-card-section>

        <div class="text-h6 q-mb-md">Mission Configuration</div>
        <q-list bordered separator>
          <q-expansion-item label="Mission Details" expand-separator>
            <!-- Add Tabs -->
            <q-tabs v-model="missionActiveTab" class="text-primary">
              <q-tab name="simul" label="Simulation Parameters" />
              <q-tab name="primary" label="Primary Configuration" />
              <q-tab name="perturbs" label="Orbital Perturbations" />
            </q-tabs>

            <!-- Add Tab Panels -->
            <q-tab-panels v-model="missionActiveTab" animated>
              <!-- Physical Parameters -->
              <q-tab-panel name="simul">
                <q-item>
                  <q-item-section>
                    <q-card class="shadow-8 q-pa-sm">
                      <b>
                        Initial Epoch:
                      </b>
                      <q-input :dense="true" v-model="store.missionConfig.initialDate" />
                    </q-card>
                    <q-card class="shadow-8 q-pa-sm">
                      <b>
                        Duration:
                      </b>
                      <q-input :dense="true" v-model="store.missionConfig.totalTime" />
                    </q-card>
                    <q-separator />
                    <q-card class="shadow-8 q-pa-sm">
                      <b>
                        Output resolution:
                      </b>
                      <q-input :dense="true" v-model="store.missionConfig.dt" />
                    </q-card>
                  </q-item-section>
                </q-item>
              </q-tab-panel>

              <!-- Orbital Parameters -->
              <q-tab-panel name="primary">
                <q-item>
                  <q-item-section>
                    <q-card class="shadow-8 q-pa-sm"><b>Primary:</b> <q-select v-model="store.missionConfig.primary"
                        :options="primaryOptions" label="Central Body" /></q-card>
                    <br>
                    <!--  add divider -->
                    <q-separator />
                    <br>

                    <q-card class="shadow-8 q-pa-sm">
                      <b>
                        Spherical Harmonics
                      </b>
                      <br>
                      <q-separator style="margin-top:15px" />
                      <br>
                      <b>
                        Max
                        degree:
                      </b>
                      <q-input v-model="store.missionConfig.nMax" label="" type="number" outlined /></q-card>
                    <q-card class="shadow-8 q-pa-sm">
                      <b>
                        Max order:
                      </b> <q-input v-model="store.missionConfig.mMax" label="" type="number" outlined /></q-card>
                  </q-item-section>
                </q-item>
              </q-tab-panel>

              <!-- Attitude Parameters -->
              <q-tab-panel name="perturbs">
                <q-item>
                  <q-item-section>
                    <div><b>Third-body perturbations</b> <q-checkbox v-model="store.missionConfig.tbp" /></div>
                    <div><b>Solar Radiation Pressure</b> <q-checkbox v-model="store.missionConfig.srp" /></div>
                    <div><b>Atmospheric drag</b> <q-checkbox v-model="store.missionConfig.drag" /> </div>
                    <div><b>Atmospheric lift</b> <q-checkbox v-model="store.missionConfig.lift" /> </div>
                    <div><b>Relativistic corrections</b> <q-checkbox v-model="store.missionConfig.rel" /> </div>
                  </q-item-section>
                </q-item>
              </q-tab-panel>
            </q-tab-panels>
          </q-expansion-item>
        </q-list>
      </q-card-section>

      <q-separator />

      <!-- Propagator Config -->
      <q-card-section>
        <div class="text-h6 q-mb-md">Propagator Configuration</div>
        <q-expansion-item label="Propagator Details" expand-separator>
          <q-item>
            <q-item-section>
              <q-card class="shadow-8 q-pa-sm"><b>Relative Tolerance:</b> <q-input
                  v-model="store.propagatorConfig.relTol" label="" type="number" outlined /></q-card>
              <q-card class="shadow-8 q-pa-sm"><b>Absolute Tolerance:</b> <q-input
                  v-model="store.propagatorConfig.absTol" label="" type="number" outlined /></q-card>
            </q-item-section>
          </q-item>
        </q-expansion-item>
      </q-card-section>
    </q-card>
    <q-btn label="Run simulation" color="primary" class="q-mt-md" style="margin-left:18px" @click="runSimulation" />

  </q-page>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent, PropType, computed, ref, toRef, Ref } from 'vue';
import { Todo, Meta, Satellite } from './models';
import useStore from 'src/pinia/index.js';
import { useQuasar } from 'quasar'
import fs from 'fs';
import { spawn } from 'child_process';
import path from 'path';

import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';
import vtkSphereSource from '@kitware/vtk.js/Filters/Sources/SphereSource';
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';
import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';

export default defineComponent({
  name: 'CompositionComponent',
  props: {
    title: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
    },
  },
  setup(props) {
    // setup store and tabs for tab panels
    const store = useStore();
    let activeTab = ref('physical');
    let missionActiveTab = ref('simul');
    const qu = useQuasar()
    const primaryOptions = [
      'Sun', 'Mercury', 'Venus', 'Earth', 'Moon', 'Mars', 'Jupiter', 'Saturn', 'Titan', 'Uranus', 'Neptune', 'Pluto'
    ]

    return { store, activeTab, missionActiveTab, qu, primaryOptions };
  },
  methods: {
    async runSimulation() {

      const delay = (delayInms: number) => {
        return new Promise(resolve => setTimeout(resolve, delayInms));
      }

      this.qu.notify({
        color: 'secondary',
        position: 'bottom',
        message: 'Saving files for simulation'
      });

      // Paths for the executable and configuration folders
      const exePath = "C:/Users/caion/Documents/Estudos/coding/Cpp/build/debug/kepler_integrator.exe";
      const configFolder = "configFiles";
      const satConfigFolder = path.join(configFolder, "satellites");
      const missionConfigFolder = path.join(configFolder, "mission");
      const propagatorConfigFolder = path.join(configFolder, "propagator");

      // Ensure the folders exist
      [configFolder, satConfigFolder, missionConfigFolder, propagatorConfigFolder].forEach(folder => {
        if (!fs.existsSync(folder)) {
          fs.mkdirSync(folder, { recursive: true });
        }
      });

      // Save satellite configs
      const satPaths: string[] = [];
      this.store.satellites.forEach((sat: { path: string, properties: any }) => {
        const satConfig = JSON.stringify(sat.properties, null, 2);
        const satPath = path.join(satConfigFolder, `${sat.properties.name}.json`);
        fs.writeFileSync(satPath, satConfig);
        satPaths.push(satPath);
      });

      // Save satelliteConfigPath
      const satelliteConfigPath = path.join(satConfigFolder, "satellitesConfig.json");
      const satelliteConfig = JSON.stringify({
        link: satPaths,
        output_json: "satellite_output.json",
      }, null, 2);
      fs.writeFileSync(satelliteConfigPath, satelliteConfig);

      // Save missionConfig
      const missionPath = path.join(missionConfigFolder, "missionConfig.json");
      const missionConfig = JSON.stringify(this.store.missionConfig, null, 2);
      fs.writeFileSync(missionPath, missionConfig);

      // Save propagatorConfig
      this.qu.notify({
        color: 'secondary',
        position: 'bottom',
        message: 'Running simulation',
        caption: "An output window will open once it's ready"
      });
      const propagatorPath = path.join(propagatorConfigFolder, "propagatorConfig.json");
      const propagatorConfig = JSON.stringify(this.store.propagatorConfig, null, 2);
      fs.writeFileSync(propagatorPath, propagatorConfig);

      // Execute the C++ program
      this.qu.notify({
        color: 'secondary',
        position: 'bottom',
        message: 'Running simulation',
        caption: "An output window will open once it's ready"
      });
      const child = spawn(exePath, [satelliteConfigPath, missionPath, propagatorPath]);

      child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });

      child.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      child.on('close', (code) => {
        if (code === 0) {
          this.qu.notify({
            color: 'positive',
            position: 'top',
            message: 'Simulation completed successfully!',
          });
        } else {
          console.error(`Process exited with code ${code}`);
          this.qu.notify({
            color: 'negative',
            position: 'top',
            message: `Simulation failed with code ${code}. Check logs for details.`,
          });
        }
      });
    }
  },
  watch: {
    'store.missionConfig.mMax': {
      immediate: true,
      handler(val) {
        // mMax cannot be greater than nMax

        if (val > this.store.missionConfig.nMax) {
          // use 
          this.qu.notify({
            color: 'negative',
            position: 'top',
            message: 'Gravitational harmonics order cannot be greater than degree',
          });
          this.store.setMissionConfig({
            ...this.store.missionConfig,
            mMax: this.store.missionConfig.nMax
          });
        }
      },
    },
  },
  mounted() {
    // Explicitly cast the ref to an HTMLDivElement
    const vtkContainer = this.$refs.vtkContainer as HTMLDivElement;

    // Check to ensure the container exists
    if (!vtkContainer) {
      console.error("vtkContainer is not found!");
      return;
    }
    // Set up the renderer and attach it to the div
    const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
      container: vtkContainer, // Use the ref
    });

    const renderer = fullScreenRenderer.getRenderer();
    const renderWindow = fullScreenRenderer.getRenderWindow();

    // Create a sphere
    const sphereSource = vtkSphereSource.newInstance({
      radius: 1.0,
      thetaResolution: 32,
      phiResolution: 32,
    });

    console.log(fullScreenRenderer)
    console.log(renderer)
    console.log(renderWindow)

    renderWindow.render();

    // Map the sphere geometry
    const mapper = vtkMapper.newInstance();
    mapper.setInputConnection(sphereSource.getOutputPort());

    // Create an actor
    const actor = vtkActor.newInstance();
    actor.setMapper(mapper);

    // Add the actor to the renderer
    renderer.addActor(actor);

    // Reset camera and render
    renderer.resetCamera();

    console.log(fullScreenRenderer)
    console.log(renderer)
    console.log(renderWindow)
  },
});
</script>

<style scoped>
/* Ensure the VTK container has dimensions */


.hover-highlight:hover {
  background-color: var(--q-color-grey-3);
}
</style>