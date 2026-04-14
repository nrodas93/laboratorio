<?php

/***
 * Funciones para replicar funcionalidad de scriptcase
 */


function sc_lookup(&$dataset, $query) {
    $r = db_query($query);
    $dataset = $r->fetchAll();
}

function sc_lookup_field(&$dataset, $query) {
    $r = db_query($query);
    $dataset = $r->fetch();
}

function sc_exec_sql($query) {
    $r = db_query($query);
    return $r->rowCount();
}
function sc_sql_injection($query) {
    return addslashes($query);
}
function db_query($query) {
    try {
        $pdo = new PDO("pgsql:host=localhost;dbname=test", "root", "", [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    } catch (PDOException $e) {
        die("Connection failed: " . $e->getMessage());
    }
    $result = $pdo->query($query);
    $pdo = null;
    return $result;
}