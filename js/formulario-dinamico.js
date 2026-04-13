/**
 * inicio
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _this = this;
var formulario_init = /** @class */ (function () {
    function formulario_init(id_frame, container, acciones) {
        var _this = this;
        this.el_frame = null;
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        container.innerHTML = '';
        this.el_frame = document.createElement('iframe');
        //this.el_frame.src;
        this.el_frame.id = id_frame;
        this.el_frame.style.width = '100%';
        this.el_frame.style.border = 'none !important';
        this.el_frame.style.overflow = 'hidden';
        this.el_frame.scrolling = 'no';
        this.el_frame.setAttribute('seamless', 'seamless');
        container.appendChild(this.el_frame);
        this.el_frame.onload = function () {
            if (_this.el_frame.contentWindow) {
                var doc = _this.el_frame.contentWindow.document;
                var body = doc.body;
                var html = doc.documentElement;
                var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
                _this.el_frame.style.height = (height + 20) + 'px';
            }
        };
        window.addEventListener('message', function (evt) {
            if (evt.origin !== window.location.origin)
                return;
            var data = evt.data;
            for (var key in acciones) {
                if (data.type === 'formulario' && data.accion === key) {
                    acciones[key].call(_this, data);
                }
            }
        });
    }
    formulario_init.prototype.cambiarUrl = function (url) {
        this.el_frame.src = url;
    };
    formulario_init.prototype.ejecutarAccion = function (accion) {
        if (this.el_frame) {
            this.el_frame.contentWindow.postMessage({ type: 'formulario', accion: accion, id_frame: this.el_frame.id }, window.location.origin);
        }
    };
    return formulario_init;
}());
function loadForm(url, query, id_frame, accionGuardar) {
    if (accionGuardar === void 0) { accionGuardar = function () { }; }
    var container = document.querySelector(query);
    if (container) {
        container.innerHTML = '';
        var iframe_1 = document.createElement('iframe');
        iframe_1.src = url;
        iframe_1.id = id_frame;
        iframe_1.style.width = '100%';
        iframe_1.style.border = 'none !important';
        iframe_1.style.overflow = 'hidden';
        iframe_1.scrolling = 'no';
        iframe_1.setAttribute('seamless', 'seamless');
        container.appendChild(iframe_1);
        iframe_1.onload = function () {
            if (iframe_1.contentWindow) {
                var doc = iframe_1.contentWindow.document;
                var body = doc.body;
                var html = doc.documentElement;
                var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
                iframe_1.style.height = (height + 20) + 'px';
            }
        };
        window.addEventListener('message', function (evt) {
            if (evt.origin !== window.location.origin)
                return;
            var data = evt.data;
            if (data.type === 'formulario' && data.accion === 'guardar') {
                accionGuardar();
            }
        });
        // objeto a nivel de windows del formulario del iframe para que pueda ser llamado desde el formulario
        window[id_frame] = {
            guardar: function () {
                iframe_1.contentWindow.postMessage({ type: 'formulario', accion: 'guardar', id_frame: id_frame }, window.location.origin);
            }
        };
    }
}
function ejecutarApi(data, url, metodo, evento) {
    if (metodo === void 0) { metodo = 'POST'; }
    if (evento === void 0) { evento = 'formulario'; }
    $.ajax({
        type: metodo,
        url: url,
        data: data,
        success: function (response) {
            console.log("Respuesta del servidor: ", response);
            window.top.postMessage({ type: 'formulario', accion: evento, response: response }, window.location.origin);
        },
        error: function (error) {
            console.error("Error: ", error);
        }
    });
}
document.addEventListener("alpine:init", function () {
    window.addEventListener('message', function (evt) {
        if (evt.origin !== window.location.origin)
            return;
        var data = evt.data;
        if (data.type === 'dialog') {
            window.dispatchEvent(new CustomEvent('dialog', {
                detail: __assign({}, data)
            }));
        }
        /*if (data.type === 'formulario' && data.accion === 'guardar') {
            alert(data.id_frame);
        }*/
    });
    // combinar validaciones con validaciones que vienen de la base de datos
    var listaValidaciones = __assign(__assign({}, window.validaciones), { regex: function (value, message, regex) {
            if (message === void 0) { message = 'Valor invalido'; }
            var testRegex = new RegExp(regex);
            if (value !== '' && !(testRegex.test(value))) {
                return message;
            }
            return true;
        }, requerido: function (value, message) {
            if (message === void 0) { message = 'Valor requerido'; }
            if (value === '' || value === null || value === undefined) {
                return message;
            }
            return true;
        }, longitudMaxima: function (value, message, maxLength) {
            if (message === void 0) { message = 'Valor excede la longitud maxima'; }
            if (value !== '' && value.length > maxLength) {
                return message;
            }
            return true;
        }, longitudMinima: function (value, message, minLength) {
            if (message === void 0) { message = 'Valor no cumple con la longitud minima'; }
            if (value !== '' && value.length < minLength) {
                return message;
            }
            return true;
        } });
    // @ts-ignore
    Alpine.data("dialog", function () { return ({
        show: false,
        loading: false,
        url: '',
        open: function (url) {
            this.url = url;
            this.show = true;
            this.loading = true;
        },
        close: function () {
            this.show = false;
            this.url = '';
            this.loading = false;
        }
    }); });
    var baseControl = function (selector, required, validaciones) {
        if (required === void 0) { required = false; }
        if (validaciones === void 0) { validaciones = []; }
        return ({
            init: function () {
                var _this = this;
                if (this.required) {
                    this.validaciones.push({
                        Metodo: 'requerido',
                        Mensaje: 'Campo requerido'
                    });
                }
                this.initControl();
                this.$nextTick(function () {
                    _this.$watch('value', function () {
                        _this.validate();
                    });
                });
            },
            initControl: function () { },
            element: function () {
                return this.$el.querySelector(selector);
            },
            value: '',
            required: required,
            validaciones: validaciones,
            validate: function () {
                var _a, _b;
                var el = this.element();
                if (!el)
                    return;
                var error = (_a = el.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('.error');
                error.textContent = '';
                error.classList.remove('show');
                for (var _i = 0, _c = this.validaciones; _i < _c.length; _i++) {
                    var validacion = _c[_i];
                    var argumentos = ((_b = validacion.Argumentos) !== null && _b !== void 0 ? _b : "").split(",");
                    var resultado = listaValidaciones[validacion.Metodo].apply(listaValidaciones, __spreadArray([this.value, validacion.Mensaje], argumentos, false));
                    if (resultado !== true) {
                        error.textContent = resultado;
                        error.classList.add('show');
                        break;
                    }
                }
            }
        });
    };
    // @ts-ignore
    Alpine.data("textbox", function (required, validaciones) {
        if (required === void 0) { required = false; }
        if (validaciones === void 0) { validaciones = []; }
        return __assign({}, baseControl("input", required, validaciones));
    });
    // @ts-ignore
    Alpine.data("textarea", function (required, validaciones) {
        if (required === void 0) { required = false; }
        if (validaciones === void 0) { validaciones = []; }
        return __assign({}, baseControl("textarea", required, validaciones));
    });
    // @ts-ignore
    Alpine.data("select2", function () { return (__assign(__assign({}, baseControl), { initControl: function () {
            var _a;
            var $this = _this;
            $this && $((_a = $this.$el) === null || _a === void 0 ? void 0 : _a.querySelector('select')).select2({
                placeholder: 'Seleccione una opción',
                allowClear: true
            });
        } })); });
});
