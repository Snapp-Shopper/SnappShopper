<?php
ob_start(); // Turn on output buffering
define('APP_INITIALIZED', true);

// === 1. Load Core Dependencies ===
require_once __DIR__ . '/src/credentials.php';         // DB credentials
require_once __DIR__ . '/src/db_functions.php';        // DB connection functions
require_once __DIR__ . '/src/validation_functions.php';// Validation helpers
require_once __DIR__ . '/src/jwt_function.php';        // JWT helpers
require_once __DIR__ . '/helpers/log_helper.php';       // Logging helpers


// === 2. Load Secure Config ===
$secrets = require_once __DIR__ . '/config/secrets.php';
foreach ($secrets as $key => $value) {
    if (!defined($key)) define($key, $value);
}

// === 3. Load PHPMailer ===
require_once __DIR__ . '/libs/phpmailer/src/PHPMailer.php';
require_once __DIR__ . '/libs/phpmailer/src/SMTP.php';
require_once __DIR__ . '/libs/phpmailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// === 4. Load Class Definitions ===
// Load all classes in the directory
    foreach (glob('classes/*.class.php') as $model) {
        include_once($model);
    }

    //Autoload Class Definitions
    function my_autoload($class)
    {
        if (preg_match('/\A\w+\Z/',$class)) {
            $file_name = __DIR__ . '/';
            $file_name .= 'classes/'.$class.'.class.php';
            if(file_exists($file_name)){
                include($file_name);
            }
        }
    }
    spl_autoload_register('my_autoload');
    $database= db_connect();
    databaseobject::setDatabase($database);