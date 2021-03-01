import FormContent from './../components/FormContent.vue';

export default {
    name: 'Formulari',
    methods: {
        // El component fill confirma que es pot sotmetre el formulari
        enviarFormulari(dades) {
            console.log(dades);
            // document.getElementById("formulari").submit();
        }
    },
    components: {
        FormContent
    },
    data() {
        return {
            // Array d'inputs que el component fill haurà de renderitzar
            inputs: [
                {
                    id: 'nom',
                    lbl: 'Nom',
                    tipus: 'text',
                    validacions: ['requerit', 'range:6|13', 'patro:^[a-zçñA-ZÇÑ áéíóúàèìòù]+$'],
                    valor: null,
                    iderr: 'err1',
                    error: false
                },
                {
                    id: 'mobil',
                    lbl: 'Mòbil',
                    tipus: 'number',
                    validacions: ['requerit'],
                    valor: null,
                    iderr: 'err2',
                    error: false
                },
                {
                    id: 'codi',
                    lbl: 'Codi Postal',
                    tipus: 'number',
                    validacions: ['requerit'],
                    valor: null,
                    iderr: 'err3',
                    error: false
                },
                {
                    id: 'email',
                    lbl: 'E-mail',
                    tipus: 'text',
                    validacions: ['requerit', 'email'],
                    valor: null,
                    iderr: 'err4',
                    error: false
                }
            ]
        }
    }
}