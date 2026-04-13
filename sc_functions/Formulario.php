<?php


class Formulario {
    public static function textbox($campo, $incluirEtiqueta = true) {
        /*$etiqueta = $incluirEtiqueta ? "<label for='" . $campo['Nombre'] . "'>" . $campo['Nombre'] . " " . $campo['Etiqueta'] . "</label>" : "";
        return "<div x-data='textbox(" . ($campo['Requerido'] ? 'true' : 'false') . ", " . json_encode(isset($campo['Validaciones']) ? $campo['Validaciones'] : []) . ")' class='form-group'>
        " . $etiqueta . "
        <input type='text' x-model='registro.{$campo['TablaColumna']}' class='form-control' placeholder='" . $campo['Nombre'] . "' x-init='init()'>
        <span class='error'></span>
    </div>";*/

        $html = self::replaceTemplate("<div x-data='textbox({{ requerido }}, {{ validaciones }})' class='form-group'>
            {{ label }}
            <input type='text' x-model='registro.{{ tabla_columna }}' class='form-control' placeholder='{{ nombre }}' x-init='init()'>
            <span class='error'></span>
        </div>", [
            'requerido' => $campo['Requerido'] ? 'true' : 'false',
            'validaciones' => json_encode($campo['Validaciones'] ?? []),
            'tabla_columna' => $campo['TablaColumna'],
            'nombre' => $campo['Nombre'],
            'etiqueta' => $campo['Etiqueta'],
            'label' => self::templateLabel($campo, $incluirEtiqueta)
        ]);

        return $html;
    }

    private static function replaceTemplate($html, $el) {
        foreach ($el as $key => $value) {
            $html = str_replace("{{ $key }}", $value, $html);
        }
        return $html;
    }

    private static function templateLabel($campo, $incluirEtiqueta = true) {
        return $incluirEtiqueta ? self::replaceTemplate("<label for='{{ nombre }}'>{{ nombre }} {{ etiqueta }}</label>", [
            'nombre' => $campo['Nombre'],
            'etiqueta' => $campo['Etiqueta']
        ]) : "";
    }




}