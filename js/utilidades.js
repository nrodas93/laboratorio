var Utilidades = /** @class */ (function () {
    function Utilidades() {
    }
    Utilidades.ajustar_iframe_por_nombre = function (nombre) {
        if (window.parent) {
            var iframe = window.parent.document.querySelector("[id*=\"".concat(nombre, "\"] > iframe"));
            if (iframe) {
                iframe.style.height = document.body.scrollHeight + "px";
            }
        }
    };
    Utilidades.ajustar_iframe_por_url = function () {
        if (window.parent) {
            var pathname = window.location.pathname;
            var url = pathname.split("/").pop();
            var iframe = window.parent.document.querySelector("[src*=\"".concat(url, "\"]"));
            if (iframe) {
                iframe.style.height = document.body.scrollHeight + "px";
            }
        }
    };
    return Utilidades;
}());
