<template>
<div>
    <div v-for="valor of camps" :key="valor.id">
        <label :for="valor.id">{{valor.lbl}}</label>
        <input :type="valor.tipus" :id="valor.id" v-model.trim="valor.valor">
        <div :id="valor.iderr" class="error" v-show="valor.error == true">{{valor.error}}</div>
    </div>
    <div>
        <button id="btEnviar" type="button" @click="enviar">Acceptar</button>
    </div>
</div>
</template>

<script src="./../scripts/FormContent.js"></script>
<style src="./../styles/FormContent.css" scoped></style>