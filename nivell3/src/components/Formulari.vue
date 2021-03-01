<template>
    <form id="formulari" class="mb-2">
        <legend>Dades personals</legend>
        <FormContent :fields="inputs" @enviament="enviarFormulari"></FormContent>
    </form>
</template>

<script src="./../scripts/Formulari.js"></script>
<style src="./../styles/Formulari.css" scoped></style>