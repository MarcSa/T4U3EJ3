## Vue 3: estructura i reactivitat

**Vue 3** permet construir la interfície del formulari i mantenir-la sincronitzada amb les dades.

El component es divideix en tres parts:

- **`<script setup lang="ts">`**: conté la lògica del formulari amb TypeScript. Les variables declarades aquí es poden utilitzar directament al template.
- **`<template>`**: defineix els camps, les etiquetes, els missatges d’error i el botó d’enviament.
- **`<style scoped lang="scss">`**: defineix estils SCSS que s’apliquen només a aquest component.

Al template s’utilitzen diferents directives de Vue:

```html
<input v-model="name" v-bind="nameAtrrs" />
<p v-if="errors.name">{{ errors.name }}</p>
```

- **`v-model`** sincronitza el valor de l’input amb la variable `name`.
- **`v-bind`** aplica els atributs i els gestors d’esdeveniments que proporciona VeeValidate.
- **`v-if`** mostra el missatge només quan existeix un error.
- **`{{ ... }}`** mostra el valor d’una variable a la pantalla.
- **`:class`** afegeix classes dinàmicament, per exemple per ressaltar un camp incorrecte.
- **`@submit.prevent`** captura l’enviament i evita que el navegador recarregui la pàgina.

Gràcies a la reactivitat de Vue, els missatges i els estils s’actualitzen quan canvia l’estat de validació.

## Yup: regles de validació

**Yup** defineix quines condicions han de complir les dades. Les regles s’agrupen en un esquema:

```ts
const schema = yup.object({
  name: yup.string().required().min(2).max(50),
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
});
```

Cada propietat correspon a un camp del formulari. Els mètodes s’encadenen per combinar regles:

- **`string()`**, **`number()`** i **`date()`** defineixen el tipus de dada esperat. Yup també pot intentar convertir el valor rebut a aquest tipus.
- **`required()`** indica que el camp és obligatori.
- **`min()` i `max()`** limiten la longitud d’un text, el valor d’un número o una data.
- **`email()`** comprova el format del correu electrònic.
- **`typeError()`** personalitza el missatge quan el valor no es pot interpretar amb el tipus esperat.

Per comprovar que les contrasenyes coincideixen, es referencia un altre camp:

```ts
confirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required(),
```

**`yup.ref('password')`** obté el valor del camp `password`, i **`oneOf()`** exigeix que la confirmació coincideixi amb aquest valor.

## VeeValidate: connexió entre Vue i Yup

**VeeValidate** connecta els camps de Vue amb l’esquema de Yup i gestiona l’estat del formulari:

```ts
const { values, errors, meta, defineField } = useForm({
  validationSchema: schema,
  initialValues,
});
```

- **`values`** conté els valors actuals dels camps.
- **`errors`** conté els missatges de validació.
- **`meta`** conté informació global, com si el formulari és vàlid o s’ha modificat.
- **`defineField()`** crea el model reactiu i els atributs necessaris per connectar cada input.

```ts
const [name, nameAtrrs] = defineField('name');
```

En aquest exemple, Vue gestiona la interfície, Yup defineix les regles i VeeValidate coordina la validació i els errors.
