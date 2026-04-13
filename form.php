
<style>
    fieldset {
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 10px;
        margin: 10px;
    }

    legend {
        font-weight: bold;
        margin-left: 10px;
    }

    div[x-data="textbox"] {
        display: flex;
        flex-direction: column;
    }

    .error {
        color: #ce2525ff;
        font-size: 0.8em;
        display: none;
    }

    .error::before {
        content: "*";
    }

    .error.show {
        display: block;
    }
</style>


<?php

function procesarFormulario($id_formulario, $idMaterial) {
    $q_form = "select Tabla from db_biblioteca.Formulario where IdFormulario = $id_formulario";
    sc_lookup_field($ds_form, $q_form);
    $tabla = $ds_form[0]['Tabla'];
    $q_existe = "select count(*) as total from $tabla where IdMaterial = $idMaterial";
    sc_lookup_field($ds_existe, $q_existe);
    $existe = $ds_existe[0]['total'];
    if ($existe > 0) {
        $q_update = "update $tabla set ";
    } else {
        $q_insert = "insert into $tabla (IdMaterial) values ($idMaterial)";
        sc_exec_sql($q_insert);
    }
    
    $request = ["body" => []];
    $values = [];
    foreach ($request['body'] as $key => $value) {
        if (strpos($key, 'c_') === 0) {
           $values[$key] = $value;
        }
    }
    $q_update .= array_map(function ($key, $value) {
        return "$key = '$value'";
    }, array_keys($values), $values);
    $q_update .= " where IdMaterial = $idMaterial";
    sc_exec_sql($q_update);
    

}
function textbox($campo, $incluirEtiqueta = true)
{
    $etiqueta = $incluirEtiqueta ? "<label for='" . $campo['Nombre'] . "'>" . $campo['Nombre'] . " " . $campo['Etiqueta'] . "</label>" : "";
    return "<div x-data='textbox(" . ($campo['Requerido'] ? 'true' : 'false') . ", " . json_encode(isset($campo['Validaciones']) ? $campo['Validaciones'] : []) . ")' class='form-group'>
    " . $etiqueta . "
    <input type='text' x-model='registro.{$campo['TablaColumna']}' class='form-control' placeholder='" . $campo['Nombre'] . "' x-init='init()'>
    <span class='error'></span>
</div>";
}

function textarea($campo, $incluirEtiqueta = true)
{
    $etiqueta = $incluirEtiqueta ? "<label for='" . $campo['Nombre'] . "'>" . $campo['Nombre'] . " " . $campo['Etiqueta'] . "</label>" : "";
    return "<div x-data='textarea(" . ($campo['Requerido'] ? 'true' : 'false') . "," . json_encode(isset($campo['Validaciones']) ? $campo['Validaciones'] : []) . ")'>
    " . $etiqueta . "
    <textarea class='form-control' x-model='registro.{$campo['TablaColumna']}' placeholder='" . $campo['Nombre'] . "' x-init='init()'></textarea>
    <span class='error'></span>
</div>";
}
// validaciones
$validaciones = [
    [
        "Nombre" => "Año",
        "Descripcion" => "Validacion de año",
        "Metodo" => "regex",
        "Argumentos" => "^[0-9]{4}$",
        "Mensaje" => "El año debe ser un numero de 4 digitos"
    ]
];

// contruir los campos del formulario
$campos = [
    [
        "Etiqueta" => "(020)",
        "Nombre" => "ISBN",
        "Descripcion" => "Identificador único de libro",
        "Requerido" => true,
        "TipoDatos" => "System.Text",
        "Control" => "textbox",
        "Orden" => 10,
        'TablaCampo' => 'c_000000000001'
    ],
    [
        "Etiqueta" => "Topografía (082)",
        "Nombre" => "Número de clasificación",
        "Descripcion" => "",
        "Requerido" => true,
        "TipoDatos" => "System.Text",
        "Control" => "textbox",
        "Orden" => 20,
        'TablaCampo' => 'c_000000000002'
    ],
    [
        "Etiqueta" => "Topografía (082)",
        "Nombre" => "Número de autor (Cutter)",
        "Descripcion" => "",
        "Requerido" => true,
        "TipoDatos" => "System.Text",
        "Control" => "textbox",
        "Orden" => 30,
        'TablaCampo' => 'c_000000000003'
    ],
    [
        "Etiqueta" => "Topografía (082)",
        "Nombre" => "Año",
        "Descripcion" => "",
        "Requerido" => true,
        "TipoDatos" => "System.Text",
        "Control" => "textbox",
        "Orden" => 40,
        "Validaciones" => $validaciones,
        'TablaCampo' => 'c_000000000004'
    ],
    [
        "Etiqueta" => "Topografía (082)",
        "Nombre" => "Número de ejemplares",
        "Descripcion" => "",
        "Requerido" => false,
        "TipoDatos" => "",
        "Control" => "textbox",
        "Orden" => 50,
        'TablaCampo' => 'c_000000000005'
    ],
    [
        "Etiqueta" => "500",
        "Nombre" => "Notas",
        "Descripcion" => "",
        "Requerido" => true,
        "TipoDatos" => "System.TextArea",
        "Control" => "textarea",
        "Orden" => 60,
        'TablaCampo' => 'c_000000000006'
    ]
];

$registro = [];
sc_lookup($registro, "SELECT * FROM db_biblioteca.DatosMaterial_000000000002 WHERE IdDatosMaterial = 1");

// ordenear arreglo por orden
usort($campos, function ($a, $b) {
    return $a['Orden'] <=> $b['Orden'];
});

// agrupar por etiqueta
$grupos = array_reduce($campos, function ($arreglo, $item) {
    $etiqueta = $item['Etiqueta'];
    if (!isset($arreglo[$etiqueta])) {
        $arreglo[$etiqueta] = [];
    }
    $arreglo[$etiqueta][] = $item;
    return $arreglo;
}, []);

// ordenar campos por orden
/*foreach ($grupos as $etiqueta => $campos) {
    usort($campos, function ($a, $b) {
        return $a['Orden'] <=> $b['Orden'];
    });
    $grupos[$etiqueta] = $campos;
}*/



?>
<div class="container">
    <?php /** Al usar alpinejs se debe pasar el registro como parametro al componente para que sea reactivo */ ?>
    <div class="row" x-data="{ registro: <?= json_encode($registro[0]) ?> }">
        <?php foreach ($grupos as $etiqueta => $campos) { ?>
            <?php if (count($campos) == 1) { ?>
                <div class="col-12">
                    <? if (function_exists($campos[0]['Control'])) { ?>
                        <?= call_user_func($campos[0]['Control'], $campos[0], true) ?>
                    <? } else { ?>
                        <div class="col-12">
                            <p>Error: No se encontro el control "<?= $campos[0]['Control'] ?>"</p>
                        </div>
                    <? } ?>
                </div>
            <?php } else { ?>
                <div class="col-12">
                    <fieldset>
                        <legend><?= $etiqueta ?></legend>
                        <?php foreach ($campos as $campo) { ?>
                            <? if (function_exists($campo['Control'])) { ?>
                                <?= call_user_func($campo['Control'], $campo, false) ?>
                            <? } else { ?>
                                <div class="col-12">
                                    <p>Error: No se encontro el control "<?= $campo['Control'] ?>"</p>
                                </div>
                            <? } ?>
                        <?php } ?>
                    </fieldset>
                </div>
            <?php } ?>
        <?php } ?>
    </div>
</div>


<?php /*
<button type="button" onclick="openDialog('https://www.google.com/webhp?igu=1')">Open Dialog</button>
<script>
    function openDialog(url) {
        window.top !== window.self && window.top.postMessage({
            'type': 'dialog',
            'url': url
        }, window.location.origin);
    }*/
?>
</script>

</html>