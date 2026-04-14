<?php

    class MiniKernel {
            
        private static function Request() {
            return [
                'method' => $_SERVER['REQUEST_METHOD'],
                'url' => $_SERVER['REQUEST_URI'],
                'data' => $_REQUEST,
                'body' => json_decode(file_get_contents('php://input'), true) ?? $_POST,
                'query' => $_GET
            ];
        }   
        public static function routes($routes) {
            $request = self::Request();
            foreach ($routes as $route) {
                if ($route['method'] == $request['method'] && $route['url'] == $request['url']) {
                    $response = $route['callback']($request);
                    self::sendRespone($response);
                }
            }
        }
        public static function process($callback) {
            $request = self::Request();
            try {
                $response = $callback($request);
                self::sendRespone($response);
            } catch (Exception $e) {
                self::sendRespone(['error' => $e->getMessage()], 500);
            }
            exit;
        }

        private static function sendRespone($response, $status = 200) {
            if (is_array($response)) {
                header('Content-Type: application/json');
                http_response_code($status);
                echo json_encode($response);
            } else {
                header('Content-Type: text/html');
                http_response_code($status);
                echo $response;
            }
        }
    }   

?>