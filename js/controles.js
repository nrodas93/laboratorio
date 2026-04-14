var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
//@ts-ignore
var Control = /** @class */ (function () {
    function Control() {
    }
    Control.prototype.init = function () {
    };
    return Control;
}());
var IconList = /** @class */ (function (_super) {
    __extends(IconList, _super);
    //value: string;
    function IconList() {
        var _this = _super.call(this) || this;
        _this.show = false;
        _this.value = '';
        //@ts-ignore
        _this.iconos = window.iconos;
        return _this;
    }
    IconList.prototype.iconClick = function (icon) {
        this.value = icon;
        this.show = false;
    };
    IconList.prototype.init = function () {
        _super.prototype.init.call(this);
        var el = this.$el;
        // crear un contenedor para los iconos
        var container = document.createElement('div');
        var input = el.querySelector('input');
        container.classList.add('icon-list');
        container.style.display = 'flex';
        container.style.flexWrap = 'wrap';
        container.style.gap = '10px';
        container.style.marginTop = '10px';
        container.style.position = 'absolute';
        container.style.zIndex = '1000';
        container.style.backgroundColor = 'white';
        container.style.border = '1px solid #ccc';
        container.style.borderRadius = '5px';
        container.style.padding = '10px';
        container.style.width = '75vw';
        container.style.height = '75vh';
        container.setAttribute("x-show", "show");
        container.setAttribute("x-transition", "");
        this.iconos.forEach(function (icono) {
            var _a;
            var icon = document.createElement('i');
            (_a = icon.classList).add.apply(_a, __spreadArray(['fa', 'fas', 'fa-2x', 'fab'], icono.icon.split(' '), false));
            icon.setAttribute("x-on:click", "iconClick('".concat(icono.icon, "')"));
            icon.setAttribute("title", icono.name);
            container.appendChild(icon);
        });
        if (el) {
            el.appendChild(container);
            var btn = document.createElement('button');
            btn.innerHTML = "<i class=\"fa fa-search\"></i>";
            btn.setAttribute("x-on:click", "show = !show");
            el.appendChild(btn);
        }
        if (input) {
            input.setAttribute("x-model", "value");
        }
    };
    return IconList;
}(Control));
document.addEventListener('DOMContentLoaded', function () {
    // @ts-ignore
    Alpine.data('IconList', function () { return new IconList(); });
});
function inicializarControl(control, contenedor) {
    var el;
    if (typeof contenedor === 'string') {
        el = document.querySelector(contenedor);
    }
    else {
        el = contenedor;
    }
    if (el) {
        el.setAttribute("x-data", control);
    }
}
