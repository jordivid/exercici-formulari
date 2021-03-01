export default {
    name: 'FormContent',
    props: {
        fields: Array
    },
    data() {
        return {
            camps: null,
            dadesFormulari: null
        }
    },
    created() {
        this.camps = new Array();
        for(let i = 0; i < this.fields.length; i++) {
           this.camps.push(this.fields[i]);
        }
    }, 
    methods: {
        enviar() {
            /*
                Un cop premut el botó d'enviar formulari es validen les dades.
                Si son correctes el component emet un event i envia al pare
                un array d'objectes amb parelles nom/valor de cada input.
            */
            let ok = true;
            for(let valor of this.camps) {
                let result = this.validar(valor);
                if(!result) {
                    ok = false;
                }
            }
            if(ok) {
                this.dadesFormulari = new Array();
                for(let i = 0; i < this.camps.length; i++) {
                    let objecte = {};
                    objecte.field = this.camps[i].id;
                    objecte.value = this.camps[i].valor;
                    this.dadesFormulari.push(objecte);
                }
                this.$emit('enviament', this.dadesFormulari);
            }
        },
        validar(object) {
            /*
                Mètode de validació. Rep un objecte que conté el valor de l'input
                i un array amb les validacions a realitzar.
            */
            let ok = true;
            let texterr = "";
            let tipVal = null;
            let patroEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            let patroPassword = /((?=.*)(?=.*[a-z])(?=.*[A-Z]).{6,13})/;
            let minChars = 6;
            let maxChars = 13;

            object.error = false;
            document.getElementById(object.iderr).innerHTML = "";

            for(let i = 0; i < object.validacions.length; i++) {
                let texte = "";
                let minLeng = null;
                let maxLeng = null;
                let tip;

                tipVal = object.validacions[i];
                tip = tipVal.substr(0,5);
                if(tip == "range" || tip == "cpass" || tip == "patro") {
                    tipVal = tip;
                }

                switch(tipVal) {
                    // Camp obligatori
                    case "requerit":
                        if(object.valor == "" || object.valor == null) {
                            texte = `El camp '${object.id}' és obligatori`;
                            ok = false;
                        }
                        break;
                    // Camp d'e-mail
                    case "email":
                        if(object.valor != null) {
                            if(object.valor.match(patroEmail) == null) {
                                texte = `El camp '${object.id}' no és un camp e-mail vàlid`;
                                ok = false;
                            }
                        } else {
                            texte = `El camp '${object.id}' no és un camp e-mail vàlid`;
                            ok = false;
                        }
                        break;
                    // Longitud de camp dins d'uns límits
                    case "range":
                        minLeng = Number(((object.validacions[i].split(":"))[1].split("|"))[0]);
                        maxLeng = Number(((object.validacions[i].split(":"))[1].split("|"))[1]);
                        if(object.valor != null) {
                            if(object.valor.length < minLeng || object.valor.length > maxLeng) {
                                texte = `El camp '${object.id}' ha de tenir entre ${minLeng} i ${maxLeng} caràcters`;
                                ok = false;
                            }
                        } else {
                            texte = `El camp '${object.id}' ha de tenir entre ${minLeng} i ${maxLeng} caràcters`;
                            ok = false;
                        }
                        break;
                    // Longitud mínima d'un camp
                    case "min":
                        minLeng = Number(object.validacions[i].substr(4));
                        if(object.valor < minLeng) {
                            texte = `El camp '${object.id}' ha de tenir al menys ${minLeng} caràcters`;
                            ok = false;
                        }
                        break;
                    // Longitud màxima d'un camp
                    case "max":
                        maxLeng = Number(object.validacions[i].substr(4));
                        if(object.valor > maxLeng) {
                            texte = `El camp '${object.id}' ha de tenir com a màxim ${maxLeng} caràcters`;
                            ok = false;
                        }
                        break;
                    // Camp de contrasenya
                    case "pass":
                        if(object.valor != null) {
                            if(object.valor.match(patroPassword) == null) {
                                texte = `Introduir de ${minChars} a ${maxChars} caràcters, mínim una minúscula i una majúscula`;
                                ok = false;
                            } else {
                                // Per increible que sembli el regex {6,13} no controla el màxim de caràcters
                                if(object.valor.length > maxChars) {
                                    texte = `Introduir de ${minChars} a ${maxChars} caràcters, mínim una minúscula i una majúscula`;
                                    ok = false;
                                }
                            }
                        }
                        break;
                    // Camp de confirmació de contrasenya, dins el ítem de validació ve el id del camp amb què s'ha de comparar
                    case "cpass":
                        if(object.valor != null) {
                            if(object.valor != document.getElementById(object.validacions[i].substr(6,4)).value) {
                                texte = "Les contrasenyes no coincideixen";
                                ok = false;
                            }
                        }
                        break;
                    // Patró de caràcters
                    case "patro":
                        if(object.valor != null) {
                            let patro = object.validacions[i].substr(6);
                            if(object.valor.match(patro) == null) {
                                texte = `El camp '${object.id}' té caràcters invàlids`;
                                ok = false;
                            }
                        }
                        break;
                }

                if (texte != "") {
                    if (texterr == "") {
                        texterr = texte;
                    }
                }
            }

            // En cas d'error s'inserta el corresponent missatge al formulari.
            if(!ok) {
                document.getElementById(object.iderr).innerHTML = texterr;
                object.error = true;
            }

            return ok;
        }

    }
    
}