<template>
<div>
    <div class="form-group" v-for="valor of camps" :key="valor.id">
        <label class="font-weight-bold float-left" :for="valor.id">{{valor.lbl}}</label>
        <input :class="{'form-control': true, 'is-invalid': valor.error}"  :type="valor.tipus" :id="valor.id" v-model.trim="valor.valor">
        <div :id="valor.iderr" class="invalid-feedback text-left" v-show="valor.error == true">{{valor.error}}</div>
    </div>
    <div>
        <button id="btEnviar" type="button" class="btn btn-primary" @click="enviar">Acceptar</button>
    </div>
</div>
</template>

<script src="./../scripts/FormContent.js"></script>