/* eslint-disable */

import { defineStore } from 'pinia';


// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
const useStore = defineStore('storeId', {
  state: () => {
    return {
      counter: 0,
      lastName: 'Michael',
      firstName: 'Michael',
      satellites: [
        {
          path: 'defaultSat.json',
          properties: {
            a0: 6978,
            e0: 0.01,
            i0: 51,
            raan0: 0,
            argp0: 0,
            nu0: 0,
            name: 'defaultSat',
            mass: 100,
            Cd: 2.2,
            Cl: 0.05,
            Cr: 1.2,
            q: [1, 0, 0, 0],
            w: [0, 0, 0] 
          }
        }
      ], // path to j
      // missionConfig has to be the same as the MissionConfig interface
      missionConfig: {
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
      },
      propagatorConfig: {
        relTol: 1e-13,
        absTol: 1e-13,
      },
    };
  },
  getters: {
    fullName: state => `${state.firstName} ${state.lastName}`,
  },
  actions: {
    increment() {
      this.counter++;
    },
    addSatellite(satellite){
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.satellites.push(satellite); // satellites is a dict with .link and .properties
    },
    removeSatellite(satellite) {
      this.satellites = this.satellites.filter(s => s !== satellite);
    },
    // set mission config allow any for ts
    setMissionConfig(config) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.missionConfig = config;
    },
    setPropagatorConfig(config) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.propagatorConfig = config;
    }
  },
});

export default useStore;
