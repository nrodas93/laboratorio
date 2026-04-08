class Control implements AlpineComponent<Control> {
    $el: HTMLInputElement;
    $data: Control;
    $dispatch: (event: string, detail?: any) => void;
    $id: (name: string) => string;
    $nextTick: (callback: () => void) => Promise<void>;
    $watch: (property: string, callback: (value: any, oldValue: any) => void) => void;
    $store: (name: string) => any;
    $root: (name: string) => any;
    value: string;
    $refs: Record<string, HTMLElement>;

    init() {
    }
}


class IconList extends Control {
    iconos: Array<string>;
    show: boolean;
    //value: string;
    constructor() {
        super();
        this.show = false;
        this.value = '';
        this.iconos = [
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
    }
    iconClick(icon: string) {
        this.value = icon;
        this.show = false;
    }
    init() {
        super.init();
        const el = this.$el;
        // crear un contenedor para los iconos
        const container = document.createElement('div');
        const input = el.querySelector('input');
        container.classList.add('icon-list');
        container.style.display = 'flex';
        container.style.flexWrap = 'wrap';
        container.style.gap = '10px';
        container.style.marginTop = '10px';
        container.setAttribute("x-show", "show");
        this.iconos.forEach((icono: string) => {
            const icon = document.createElement('i');
            icon.classList.add(...icono.split(' '));
            icon.setAttribute("x-on:click", `iconClick('${icono}')`);

            container.appendChild(icon);
        });


        if (el) {
            el.appendChild(container);
            const btn = document.createElement('button');
            btn.innerHTML = `<i class="fa fa-search"></i>`
            btn.setAttribute("x-on:click", "show = !show");
            el.appendChild(btn);
        }

        if (input) {
            input.setAttribute("x-model", "value");
        }

    }
}

document.addEventListener('DOMContentLoaded', function () {
    // @ts-ignore
    Alpine.data('IconList', () => new IconList())
})


function inicializarControl(control: string, contenedor: string | HTMLElement) {
    let el: HTMLElement;
    if (typeof contenedor === 'string') {
        el = document.querySelector(contenedor);
    } else {
        el = contenedor;
    }
    if (el) {
        el.setAttribute("x-data", control);
    }
}