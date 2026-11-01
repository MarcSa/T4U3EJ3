import * as yup from 'yup';

yup.setLocale({
    mixed: {
        required: 'El campo es requerido',
    },
    string: {
        email: 'El formato del email no es correcto',
    },
});
