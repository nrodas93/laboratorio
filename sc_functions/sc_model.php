<?php

function cargarModelo($table, $columns, $id, $campo_id = "id") {
    sc_lookup($ds, "SELECT " . implode(", ", $columns) . " FROM " . $table . " WHERE $campo_id = " . $id . "");
    if (!empty($ds)) {
       return new class($ds[0]) {
          public function __construct($data) {
             foreach ($data as $key => $value) {
                $this->$key = $value;
             }
          }
       };
    }
    return null;
}

class ScModel {
    private $query;
    private $table;
    private $columns;
    private $id;
    private $campo_id;

    public function __construct($table, $columns, $id, $campo_id = "id") {
        $this->table = $table;
        $this->columns = $columns;
        $this->id = $id;
        $this->campo_id = $campo_id;
        $this->query = "SELECT " . implode(", ", $columns) . " FROM " . $table;


        if($id != null) {
            sc_lookup_field($ds, $this->query . " WHERE $campo_id = " . $id . "");
            if (!empty($ds)) {
                foreach ($ds as $key => $value) {
                    $this->$key = $value;
                }
            }
        }
    }

    public function update($values) {
        $this->query = "UPDATE " . $this->table . " SET ";
        $this->query .= implode(", ", array_map(function($key, $value) {
            return $key . " = '" . $value . "'";
        }, array_keys($values), array_values($values)));
        $this->query .= " WHERE " . $this->campo_id . " = " . $this->id;
        sc_exec_sql($this->query);
    }

    public function insert($values) {
        $this->query = "INSERT INTO " . $this->table . " (" . implode(", ", $this->columns) . ") VALUES (";
        $this->query .= implode(", ", array_map(function($value) {
            return "'" . $value . "'";
        }, $values));
        $this->query .= ")";
        sc_exec_sql($this->query);
    }

    public function delete() {
        $this->query = "UPDATE " . $this->table . " SET audRegistroEliminado = 1 WHERE " . $this->campo_id . " = " . $this->id;
        sc_exec_sql($this->query);
    }



}