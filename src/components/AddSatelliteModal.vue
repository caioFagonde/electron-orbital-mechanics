<template>
    <q-dialog v-model="show">
        <q-card style="min-width: 400px">
            <q-card-section>
                <div class="text-h6">Add New Satellite</div>
            </q-card-section>

            <q-card-section>
                <q-form @submit.prevent="submitForm">
                    <q-input v-model="satellite.name" label="Name" outlined required />
                    <q-input v-model.number="satellite.mass" label="Mass (kg)" type="number" outlined required />
                    <q-input v-model="satellite.a0" label="Semi-major Axis (a0) (km)" type="number" outlined />
                    <q-input v-model="satellite.e0" label="Eccentricity (e0)" type="number" outlined />
                    <q-input v-model="satellite.i0" label="Inclination (i0) (°)" type="number" outlined />
                    <!-- Add more inputs for other satellite properties -->
                    <q-btn label="Add Satellite" type="submit" color="primary" class="q-mt-md" />
                </q-form>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" @click="close" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
/* eslint-disable */
import { ref } from 'vue';

export default {
    name: 'AddSatelliteModal',
    props: {
        modalValue: {
            type: Boolean,
            required: true,
        },
    },
    emits: ['update:modalValue', 'add-satellite'],
    setup(_, { emit }) {
        const satellite = ref({
            name: '',
            mass: null,
            a0: null,
            e0: null,
            i0: null,
            // Default values for other properties can be set here
        });

        const close = () => {
            emit('update:modalValue', false);
        };

        const submitForm = () => {
            emit('add-satellite', {
                path: `${satellite.value.name}.json`,
                properties: { ...satellite.value },
            });
            close();
        };

        return { satellite, close, submitForm, show: ref(false) };
    },
};
</script>

<style scoped>
/* Add any specific styles here */
</style>