<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({
    name: yup.string().required().min(2).max(50),
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
    confirm: yup
        .string()
        .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
        .required(),
    country: yup.string().required('Selecciona un país'),
    birthdate: yup
        .date()
        .typeError('Introduce una fecha válida')
        .required('La fecha de nacimiento es obligatoria')
        .max(new Date(), 'La fecha no puede ser futura'),
    age: yup
        .number()
        .typeError('Introduce un número válido')
        .required('La edad es obligatoria')
        .min(0, 'La edad no puede ser negativa')
        .max(120, 'Introduce una edad realista'),
});

// Valores iniciales
const initialValues = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    country: 'es',
    birthdate: '',
    age: '',
};

const { values, errors, meta, defineField } = useForm({ validationSchema: schema, initialValues });

// Campos
const [name, nameAtrrs] = defineField('name');
const [email, emailAtrrs] = defineField('email');
const [password, passwordAtrrs] = defineField('password');
const [confirm, confirmAtrrs] = defineField('confirm');
const [country, countryAtrrs] = defineField('country');
const [birthdate, birthdateAtrrs] = defineField('birthdate');
const [age, ageAtrrs] = defineField('age');

// Submit simulado
const onSubmit = () => {
    console.log('REGISTER payload', JSON.stringify(values));
};
</script>

<template>
    <form class="card px-3 py-4 bg-white form-content" @submit.prevent="onSubmit">
        <h2 class="mb-2">Primer formulario</h2>
        <div class="mb-2">
            <label for="name" class="mb-2">Nombre:</label>
            <input
                type="text"
                v-model="name"
                name="name"
                id="name"
                v-bind="nameAtrrs"
                placeholder="Nombre"
                :class="{ invalid: !!errors.name }"
                :aria-invalid="!!errors.name"
                aria-describedby="name-error"
            />
            <p v-if="errors.name" id="name-error" class="error">{{ errors.name }}</p>
        </div>
        <div class="mb-2">
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
        </div>
        <div class="mb-2">
            <label for="password" class="mb-2">Contraseña:</label>
            <input
                type="password"
                v-model="password"
                name="password"
                id="password"
                v-bind="passwordAtrrs"
                placeholder=""
                :class="{ invalid: !!errors.password }"
                :aria-invalid="!!errors.password"
                aria-describedby="password-error"
            />
            <p v-if="errors.password" id="password-error" class="error">{{ errors.password }}</p>
        </div>
        <div class="mb-2">
            <label for="confirm" class="mb-2">Repite la contraseña:</label>
            <input
                type="password"
                v-model="confirm"
                name="confirm"
                id="confirm"
                v-bind="confirmAtrrs"
                placeholder=""
                :class="{ invalid: !!errors.confirm }"
                :aria-invalid="!!errors.confirm"
                aria-describedby="confirm-error"
            />
            <p v-if="errors.confirm" id="confirm-error" class="error">{{ errors.confirm }}</p>
        </div>
        <div class="mb-2">
            <label for="country" class="mb-2">País:</label>
            <select
                v-bind="countryAtrrs"
                id="country"
                v-model="country"
                name="country"
                class="form-select"
                aria-label="Default select example"
                :class="{ invalid: !!errors.country }"
                :aria-invalid="!!errors.country"
                aria-describedby="country-error"
            >
                <option value="es">España</option>
            </select>

            <p v-if="errors.country" id="country-error" class="error">{{ errors.country }}</p>
        </div>
        <div class="mb-2 form-field">
            <label for="birthdate" class="form-label">Fecha de nacimiento</label>
            <input
                type="date"
                v-model="birthdate"
                name="birthdate"
                id="birthdate"
                v-bind="birthdateAtrrs"
                autocomplete="off"
                class="form-control w-12"
                data-bs-toggle="datepicker"
                :class="{ invalid: !!errors.birthdate }"
                :aria-invalid="!!errors.birthdate"
                aria-describedby="birthdate-error"
            />
            <p v-if="errors.birthdate" id="birthdate-error" class="error">{{ errors.birthdate }}</p>
        </div>
        <div class="mb-2">
            <label for="age" class="mb-2">Edad:</label>
            <input
                type="number"
                v-model="age"
                name="age"
                id="age"
                v-bind="ageAtrrs"
                placeholder=""
                :class="{ invalid: !!errors.age }"
                :aria-invalid="!!errors.age"
                aria-describedby="age-error"
            />
            <p v-if="errors.age" id="age-error" class="error">{{ errors.age }}</p>
        </div>
        <input type="submit" value="Enviar" class="mb-4 btn btn-primary" :disabled="!meta.valid" />
    </form>
    <pre class="rounded-3 px-3 py-2">{{ values }}</pre>
    <pre class="rounded-3 px-3 py-2">{{ errors }}</pre>
    <pre class="rounded-3 px-3 py-2 mb-0">{{ meta }}</pre>
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
