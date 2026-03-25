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
    ],
    [
        "Etiqueta" => "Topografía (082)",
        "Nombre" => "Número de clasificación",
        "Descripcion" => "",
        "Requerido" => true,
        "TipoDatos" => "System.Text",
        "Control" => "textbox",
        "Orden" => 20,
    ],
    [
        "Etiqueta" => "Topografía (082)",
        "Nombre" => "Número de autor (Cutter)",
        "Descripcion" => "",
        "Requerido" => true,
        "TipoDatos" => "System.Text",
        "Control" => "textbox",
        "Orden" => 30,
    ],
    [
        "Etiqueta" => "Topografía (082)",
        "Nombre" => "Año",
        "Descripcion" => "",
        "Requerido" => true,
        "TipoDatos" => "System.Text",
        "Control" => "textbox",
        "Orden" => 40,
        "Validaciones" => $validaciones
    ],
    [
        "Etiqueta" => "Topografía (082)",
        "Nombre" => "Número de ejemplares",
        "Descripcion" => "",
        "Requerido" => false,
        "TipoDatos" => "",
        "Control" => "textbox",
        "Orden" => 50,
    ],
    [
        "Etiqueta" => "500",
        "Nombre" => "Notas",
        "Descripcion" => "",
        "Requerido" => true,
        "TipoDatos" => "System.TextArea",
        "Control" => "textarea",
        "Orden" => 60,
    ]
];

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
foreach ($grupos as $etiqueta => $campos) {
    usort($campos, function ($a, $b) {
        return $a['Orden'] <=> $b['Orden'];
    });
    $grupos[$etiqueta] = $campos;
}

function textbox($campo, $incluirEtiqueta = true)
{
    $etiqueta = $incluirEtiqueta ? "<label for='" . $campo['Nombre'] . "'>" . $campo['Nombre'] . " " . $campo['Etiqueta'] . "</label>" : "";
    return "<div x-data='textbox(" . ($campo['Requerido'] ? 'true' : 'false') . ", " . json_encode(isset($campo['Validaciones']) ? $campo['Validaciones'] : []) . ")' class='form-group'>
    " . $etiqueta . "
    <input type='text' class='form-control' placeholder='" . $campo['Nombre'] . "' x-model='value' x-init='init()'>
    <span class='error'></span>
</div>";
}

function textarea($campo, $incluirEtiqueta = true)
{
    $etiqueta = $incluirEtiqueta ? "<label for='" . $campo['Nombre'] . "'>" . $campo['Nombre'] . " " . $campo['Etiqueta'] . "</label>" : "";
    return "<div x-data='textarea(" . ($campo['Requerido'] ? 'true' : 'false') . "," . json_encode(isset($campo['Validaciones']) ? $campo['Validaciones'] : []) . ")'>
    " . $etiqueta . "
    <textarea class='form-control' placeholder='" . $campo['Nombre'] . "' x-model='value' x-init='init()'></textarea>
    <span class='error'></span>
</div>";
}

?>
<div class="container">
    <div class="row">
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