

class Utilidades {
    
    static ajustar_iframe_por_nombre(nombre: string) {
        if (window.parent) {
            const iframe = window.parent.document.querySelector(`[id*="${nombre}"] > iframe`) as HTMLIFrameElement;
            if (iframe) {
                iframe.style.height = document.body.scrollHeight + "px";
            }
        }
    }

    static ajustar_iframe_por_url() {
        if (window.parent) {
            const pathname = window.location.pathname;
            const url = pathname.split("/").pop();
            const iframe = window.parent.document.querySelector(`[src*="${url}"]`) as HTMLIFrameElement;
            if (iframe) {
                iframe.style.height = document.body.scrollHeight + "px";
            }
        }
    }
}