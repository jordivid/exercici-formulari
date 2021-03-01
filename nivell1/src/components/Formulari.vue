<template>
    <form id="formulari">
        <legend>Dades personals</legend>
        <FormContent :fields="inputs" @enviament="enviarFormulari"></FormContent>
    </form>
</template>

<script src="./../scripts/Formulari.js"></script>
<style src="./../styles/Formulari.css" scoped></style>