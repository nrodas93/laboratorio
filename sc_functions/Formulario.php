<?php


class Formulario {
    public static function textbox($campo, $incluirEtiqueta = true) {
        $html = self::replaceTemplate("<div x-data='textbox(\"{{ tabla_columna }}\", {{ requerido }}, {{ validaciones }})' class='form-group'>
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

    public static function textarea($campo, $incluirEtiqueta = true) {
        $html = self::replaceTemplate("<div x-data='textarea(\"{{ tabla_columna }}\",{{ requerido }}, {{ validaciones }})' class='form-group'>
            {{ label }}
            <textarea class='form-control' x-model='registro.{{ tabla_columna }}' placeholder='{{ nombre }}' x-init='init()'></textarea>
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

    public static function select2($campo, $incluirEtiqueta = true) {
        $html = self::replaceTemplate("<div {{ multiple }} x-data='select2(\"{{ tabla_columna }}\", {{ ismulti }}, {{ requerido }}, {{ validaciones }})' class='form-group'>
            {{ label }}
            <select class='form-control' placeholder='{{ nombre }}' x-init='init()'>
                {{ primerOpcion }}
                {{ valores }}
            </select>
            <span class='error'></span>
        </div>", [
            'multiple' =>  $campo["Multiple"] ? 'multiple=""' : '',
            'ismulti' => $campo["Multiple"] ? 'true' : 'false',
            'requerido' => $campo['Requerido'] ? 'true' : 'false',
            'validaciones' => json_encode($campo['Validaciones'] ?? []),
            'tabla_columna' => $campo['TablaColumna'],
            'nombre' => $campo['Nombre'],
            'etiqueta' => $campo['Etiqueta'],
            'label' => self::templateLabel($campo, $incluirEtiqueta),
            'valores' => self::templateValores($campo['Valores']),
            'primerOpcion' => $campo["Multiple"] ? "" : "<option value=''>Seleccione una opción</option>"
        ]); 

        return $html;
    }

    public static function date($campo, $incluirEtiqueta = true) {
        $html = self::replaceTemplate("<div x-data='date(\"{{ tabla_columna }}\", {{ requerido }}, {{ validaciones }})' class='form-group'>
            {{ label }}
            <input type='date' x-model='registro.{{ tabla_columna }}' class='form-control' placeholder='{{ nombre }}' x-init='init()'>
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

    private static function templateValores($valores) {
        $html = "";
        if  (!empty($valores)) {
            $valores = explode(";", $valores);
            foreach ($valores as $valor) {
                $html .= "<option value='" . $valor . "'>" . $valor . "</option>";
            }
        }
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