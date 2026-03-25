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
function loadForm(url, idcontainer) {
    var container = document.getElementById(idcontainer);
    if (container) {
        $.ajax({
            url: url,
            type: 'GET',
            success: function (response) {
                container.innerHTML = response;
            }
        });
    }
}
document.addEventListener("alpine:init", function () {
    window.addEventListener('message', function (evt) {
        if (evt.origin !== window.location.origin)
            return;
        var data = evt.data;
        if (data.type === 'dialog') {
            console.log(data);
            window.dispatchEvent(new CustomEvent('dialog', {
                detail: __assign({}, data)
            }));
        }
    });
    var listaValidaciones = {
        regex: function (value, message, regex) {
            if (message === void 0) { message = 'Valor invalido'; }
            var testRegex = new RegExp(regex);
            if (value !== '' && !(testRegex.test(value))) {
                return message;
            }
            return true;
        },
        required: function (value, message) {
            if (message === void 0) { message = 'Valor requerido'; }
            if (value === '' || value === null || value === undefined) {
                return message;
            }
            return true;
        }
    };
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
                        Metodo: 'required',
                        Mensaje: 'Valor requerido'
                    });
                }
                this.initControl();
                this.$nextTick(function () {
                    _this.$watch('value', function () {
                        console.log('watch triggered:', _this.value);
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
                    console.log("resultado: ", resultado);
                    if (resultado !== true) {
                        error.textContent = resultado;
                        error.classList.add('show');
                        break;
                    }
                }
            }
        });
    };
    Alpine.data("textbox", function (required, validaciones) {
        if (required === void 0) { required = false; }
        if (validaciones === void 0) { validaciones = []; }
        return __assign({}, baseControl("input", required, validaciones));
    });
    Alpine.data("textarea", function (required, validaciones) {
        if (required === void 0) { required = false; }
        if (validaciones === void 0) { validaciones = []; }
        return __assign({}, baseControl("textarea", required, validaciones));
    });
    Alpine.data("select2", function () { return (__assign(__assign({}, baseControl), { initControl: function () {
            $(_this.$el.querySelector('select')).select2({
                placeholder: 'Seleccione una opción',
                allowClear: true
            });
        } })); });
});
