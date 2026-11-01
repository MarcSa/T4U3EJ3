<script setup lang="ts">
// import PrimerFormulario from './components/PrimerFormulario.vue';
import RegistroFormulario from './components/RegistroFormulario.vue';
</script>

<template>
    <main>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1 class="mb-4">Componente principal de la App</h1>
                    <!-- <PrimerFormulario /> -->
                    <RegistroFormulario />
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
