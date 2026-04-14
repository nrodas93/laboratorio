<?php



function sc_obtener_correlativo($sc_corre_clave, $sc_corre_aumentar = true, $sc_corre_crear_si_no_existe = false) {
    $sc_corre_clave = sc_sql_injection($sc_corre_clave);
	$q = "SELECT Valor FROM db_sistema.Parametro  WHERE Clave = " . $sc_corre_clave;
    sc_lookup_field(ds, $q);
    if (!empty({ds})) {
        $valor = {ds[0]["Valor"]};
		$valor = (int)$valor;
        if ($sc_corre_aumentar) {
            sc_sql_update("db_sistema.Parametro", ["Valor" => $valor + 1], "Clave = " . $sc_corre_clave);
        }
        return $valor;
    }
    if ($sc_corre_crear_si_no_existe) {
        sc_sql_insert("db_sistema.Parametro", ["Clave" => $sc_corre_clave, "Valor" => "1"]);
        return 1;
    }
    sc_error_message("El correlativo $sc_corre_clave no existe");
    sc_error_exit();
}




