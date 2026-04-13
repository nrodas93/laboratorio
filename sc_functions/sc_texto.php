<?php

class ScTexto {
    public static function quitarAcentos($texto) {
        if (function_exists('iconv')) {
            return iconv('UTF-8', 'ASCII//TRANSLIT', $texto);
        }
        // si no existe iconv, usar str_replace
        $texto = str_replace(array('á', 'é', 'í', 'ó', 'ú', 'ñ'), array('a', 'e', 'i', 'o', 'u', 'n'), $texto);
        $texto = str_replace(array('Á', 'É', 'Í', 'Ó', 'Ú', 'Ñ'), array('A', 'E', 'I', 'O', 'U', 'N'), $texto);
        return $texto;
    }
}       