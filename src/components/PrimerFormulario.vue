<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({ email: yup.string().required().email() });

const { values, errors, meta, defineField } = useForm({ validationSchema: schema });

const [email, emailAtrrs] = defineField('email');

const onSubmit = () => {
    console.log('Submit', JSON.stringify(values));
};
</script>

<template>
    <form class="card px-3 py-4 bg-white form-content" @submit.prevent="onSubmit">
        <h2 class="mb-2">Primer formulario</h2>
        <label for="email" class="mb-2">Email:</label>
        <input
            type="text"
            v-model="email"
            name="email"
            id="email"
            v-bind="emailAtrrs"
            placeholder="tu@email.com"
            :class="{ invalid: !!errors.email }"
            :aria-invalid="!!errors.email"
            aria-describedby="email-error"
        />
        <p v-if="errors.email" id="email-error" class="error">{{ errors.email }}</p>
        <input type="submit" value="Enviar" class="mb-4 btn btn-primary" :disabled="!meta.valid" />
        <pre class="rounded-3 px-3 py-2">{{ values }}</pre>
        <pre class="rounded-3 px-3 py-2">{{ errors }}</pre>
        <pre class="rounded-3 px-3 py-2 mb-0">{{ meta }}</pre>
    </form>
</template>

<style scoped lang="scss">
pre {
    background-color: #fafafa;
}
.error {
    color: red;
}
#email:not(.invalid) {
    margin-bottom: 12px;
}
.invalid {
    outline: 1px solid red;
    border-radius: 2px;
}
</style>
