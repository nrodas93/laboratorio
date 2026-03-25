<html>

<head>
    <link rel="shortcut icon" href="./assets/images/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />

    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
</head>
<?php

?>

<body>
    <div x-data="dialog" @dialog.window="open($event.detail.url)" id="dialog" x-show="show" style="border: 1px solid #ccc;border-radius: 10px;padding: 10px;position: fixed; top: 10%; left: 10%; width: 75%; height: 75vh; background-color: rgba(255, 255, 255, 1); z-index: 1000;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <h2 style="margin: 0;">Dialog</h2>
            <button @click="close">Close</button>
        </div>
        <div class="loader" x-show="loading">
            <div style="width: 100%; height: 100%; background-color: #ccc; position: absolute; top: 0; left: 0; z-index: 1001;">
                <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Cargando...</span>
                    </div>
                </div>
            </div>
        </div>
        <div x-show="!loading">
            <iframe id="dialog-iframe" @load="loading = false; if (url != '') { show = true;} " style="width: 100%; height: 100%;" x-bind:src="url" frameborder="0"></iframe>
        </div>
    </div>
    <div id="formulario">
        <!--<iframe src="form.php" frameborder="0"></iframe>-->
    </div>


    <script src="js/myalpine.js?<?php echo time(); ?>"></script>
    <script defer>
        loadForm('form.php', 'formulario');
    </script>
</body>

</html>