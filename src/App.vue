<script setup lang="ts">
import TicketForm from '@/components/TicketForm.vue';
</script>

<template>
    <main>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1 class="mb-4">Formulario de incidencias</h1>
                    <TicketForm />
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped lang="scss">
main {
    background-color: #fafafa;
}
</style>
