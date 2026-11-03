<script setup lang="ts">
import { useForm } from 'vee-validate';
import type { TicketForm } from '@/interfaces/ticket-form.interface';
import * as yup from 'yup';

// https://erdemgonul.medium.com/validate-forms-using-vee-validate-with-vue3-composition-api-33d7b49af807
// https://jasonwatmore.com/post/2020/10/01/vue-3-veevalidate-form-validation-example
// https://github.com/jquense/yup

const schema = yup.object({
    subject: yup
        .string()
        .required('El campo asunto es obligatorio')
        .min(5, 'Mínimo de 5 caracteres')
        .max(100, 'Máximo 100 caracteres'),
    email: yup
        .string()
        .required('El campo correo electrónico es obligatorio')
        .email('El formato no es correcto'),
    category: yup.string().required(),
    invoiceID: yup.string().when('category', ([category], schema) => {
        return category === 'Facturación'
            ? schema.required('El número de factura es obligatorio').min(6, 'Mínimo 6 caracteres')
            : schema;
    }),
    ver: yup.number().when('category', ([category], schema) => {
        return category === 'Error Técnico'
            ? schema
                  .typeError('Introduce un número de versión válido')
                  .required('El número de versión es obligatorio')
            : schema;
    }),
    message: yup.string().required().min(20, 'Mínimo 20 caracteres'),
});

const categories = ['Error Técnico', 'Consulta', 'Facturación'];

// Valores iniciales
const initialValues: TicketForm = {
    subject: '',
    email: '',
    category: 'Consulta',
    message: '',
};

const { values, errors, meta, defineField } = useForm({ validationSchema: schema, initialValues });

// Campos
const [subject, subjectAtrrs] = defineField('subject');
const [email, emailAtrrs] = defineField('email');
const [category, categoryAtrrs] = defineField('category');
const [invoiceID, invoiceIDAtrrs] = defineField('invoiceID');
const [ver, verAtrrs] = defineField('ver');
const [message, messageAtrrs] = defineField('message');

// Submit simulado
const onSubmit = () => {
    const payload = { ...values };
    if (payload.category !== 'Facturación') {
        delete payload.invoiceID;
    }

    if (payload.category !== 'Error Técnico') {
        delete payload.ver;
    }
    console.log('REGISTER payload', JSON.stringify(payload));
};
</script>

<template>
    <form class="card px-3 py-4 bg-white form-content" @submit.prevent="onSubmit">
        <div class="mb-2">
            <label for="subject" class="mb-2">Asunto</label>
            <input
                type="text"
                v-model="subject"
                name="subject"
                id="subject"
                v-bind="subjectAtrrs"
                placeholder="Asunto"
                :class="{ invalid: !!errors.subject }"
                :aria-invalid="!!errors.subject"
                aria-describedby="subject-error"
            />
            <p v-if="errors.subject" id="subject-error" class="error">{{ errors.subject }}</p>
        </div>
        <div class="mb-2">
            <label for="email" class="mb-2">Email</label>
            <input
                type="email"
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
            <label for="category" class="mb-2">Categoría de incidencia</label>

            <select
                v-model="category"
                name="category"
                id="category"
                v-bind="categoryAtrrs"
                :class="{ invalid: !!errors.category }"
                :aria-invalid="!!errors.category"
                aria-describedby="category-error"
            >
                <option v-for="categoryEl in categories" :value="categoryEl" :key="categoryEl">
                    {{ categoryEl }}
                </option>
            </select>
            <p v-if="errors.category" id="category-error" class="error">{{ errors.category }}</p>
        </div>
        <div class="mb-2" v-if="values.category === 'Facturación'">
            <label for="invoiceID" class="mb-2">Número de factura</label>
            <input
                type="text"
                v-model="invoiceID"
                name="invoiceID"
                id="invoiceID"
                v-bind="invoiceIDAtrrs"
                placeholder=""
                :class="{ invalid: !!errors.invoiceID }"
                :aria-invalid="!!errors.invoiceID"
                aria-describedby="invoiceID-error"
            />
            <p v-if="errors.invoiceID" id="invoiceID-error" class="error">{{ errors.invoiceID }}</p>
        </div>

        <div class="mb-2 form-field" v-if="values.category === 'Error Técnico'">
            <label for="ver" class="form-label">Versión del programa</label>
            <input
                type="number"
                v-model="ver"
                name="ver"
                id="ver"
                v-bind="verAtrrs"
                autocomplete="off"
                class="form-control w-12"
                :class="{ invalid: !!errors.ver }"
                :aria-invalid="!!errors.ver"
                aria-describedby="ver-error"
            />
            <p v-if="errors.ver" id="ver-error" class="error">{{ errors.ver }}</p>
        </div>
        <div class="mb-2">
            <label for="message" class="mb-2">Descripción detallada</label>
            <textarea
                cols="80"
                rows="5"
                v-model="message"
                name="message"
                id="message"
                v-bind="messageAtrrs"
                placeholder="Describe el problema con detalle..."
                :class="{ invalid: !!errors.message }"
                :aria-invalid="!!errors.message"
                aria-describedby="message-error"
            ></textarea>
            <p v-if="errors.message" id="message-error" class="error">{{ errors.message }}</p>
        </div>
        <input type="submit" value="Enviar" class="mb-4 btn btn-primary" :disabled="!meta.valid" />
    </form>
</template>

<style scoped lang="scss">
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
