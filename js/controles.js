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
var Control = /** @class */ (function () {
    function Control() {
    }
    Control.prototype.init = function () {
    };
    return Control;
}());
var IconList = /** @class */ (function (_super) {
    __extends(IconList, _super);
    function IconList() {
        var _this = _super.call(this) || this;
        _this.show = false;
        _this.value = '';
        _this.iconos = [
            'fa fa-home',
            'fa fa-user',
            'fa fa-cog',
            'fa fa-star',
            'fa fa-heart',
            'fa fa-camera',
            'fa fa-trash',
            'fa fa-edit',
            'fa fa-save',
            'fa fa-cancel',
        ];
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
        container.setAttribute("x-show", "show");
        this.iconos.forEach(function (icono) {
            var _a;
            var icon = document.createElement('i');
            (_a = icon.classList).add.apply(_a, icono.split(' '));
            icon.setAttribute("x-on:click", "iconClick('".concat(icono, "')"));
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
