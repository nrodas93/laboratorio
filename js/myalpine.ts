/**
 * inicio
 */

function loadForm(url: string, idcontainer: string) {
    const container = document.getElementById(idcontainer);
    if (container) {
        $.ajax({
            url: url,
            type: 'GET',
            success: function(response) {
                container.innerHTML = response;
            }
        });
    }
}

document.addEventListener("alpine:init", () => {

    window.addEventListener('message', (evt: any) => {
        if (evt.origin !== window.location.origin) return;
        const data = evt.data;
        if (data.type === 'dialog') {
            console.log(data);
            window.dispatchEvent(new CustomEvent('dialog', {
                    detail: { ...data }
            }));
        }
    })

    const listaValidaciones = {
        regex: (value: string, message: string = 'Valor invalido', regex: string) => {
            const testRegex = new RegExp(regex);
            if (value !== '' && !(testRegex.test(value))) {
                return message;
            }
            return true;
        },
        required: (value: string, message: string = 'Valor requerido') => {
            if (value === '' || value === null || value === undefined) {
                return message;
            }
            return true;
        }

    }

    Alpine.data("dialog", () => ({
        show: false,
        loading: false,
        url: '',
        open(url: string) {
            this.url = url;
            this.show = true;
            this.loading = true;
        },
        close() {
            this.show = false;
            this.url = '';
            this.loading = false;
        }
    }))

    const baseControl = (selector, required: boolean = false, validaciones: Array<Object> = []) => ({
        init() {
            if (this.required) {
                this.validaciones.push({
                    Metodo: 'required',
                    Mensaje: 'Valor requerido',
                })
            }
            this.initControl();
            this.$nextTick(() => {
                
                this.$watch('value', () => {
                    console.log('watch triggered:', this.value)
                    this.validate()
                });
            });

        },
        initControl() {},
        element() {
            return this.$el.querySelector(selector);
        },
        value: '',
        required: required,
        validaciones: validaciones,
        validate() {
            const el: HTMLElement = this.element();
            if (!el) return; 
            const error = el.parentElement?.querySelector('.error');
                error.textContent = '';
                error.classList.remove('show');
                for (const validacion of this.validaciones) {
                    const argumentos = (validacion.Argumentos ?? "").split(",");
                    const resultado = listaValidaciones[validacion.Metodo](this.value, validacion.Mensaje, ...argumentos);
                    console.log("resultado: ", resultado);
                    if (resultado !== true) {
                        error.textContent = resultado;
                        error.classList.add('show');
                        break;
                    }
                }
            
        }
    })


    Alpine.data("textbox", (required: boolean = false, validaciones: Array<Object> = []) => {
        return {...baseControl("input",required, validaciones) };
    })

    Alpine.data("textarea", (required: boolean = false, validaciones: Array<Object> = []) => {
        return {...baseControl("textarea",required, validaciones) };
    })

    Alpine.data("select2", () => ({
        ...baseControl,
        initControl: () => {
            $(this.$el.querySelector('select')).select2({
                placeholder: 'Seleccione una opción',
                allowClear: true
            });
        }
    }

    ))
})