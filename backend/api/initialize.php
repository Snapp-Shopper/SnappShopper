<?php
ob_start(); // Turn on output buffering
// === 0. Load global headers (CORS & JSON content type)
$headerFile = __DIR__ . '/src/header.php';
if (file_exists($headerFile)) {
    require_once $headerFile;
}
// === 1. Define Constants ===
if (!defined('APP_INITIALIZED')) {
    define('APP_INITIALIZED', true);
}

// === 2. Load Core Dependencies ===
$required_files = [
    __DIR__ . '/src/credentials.php',           // DB credentials
    __DIR__ . '/src/db_functions.php',          // DB connection functions
    __DIR__ . '/src/validation_functions.php',  // Validation helpers
    __DIR__ . '/src/jwt_function.php',          // JWT helpers
    __DIR__ . '/helpers/log_helper.php',        // Logging helpers
    __DIR__ . '/helpers/utils_helper.php',        // Utility functions
    __DIR__ . '/helpers/DHLService.php',        // DHL API integration
    __DIR__ . '/helpers/ShippingEstimator.php', // Shipping estimator
];

foreach ($required_files as $file) {
    if (!file_exists($file)) {
        die("Error: Required file not found: $file");
    }
    require_once $file;
}

// === 3. Load Secure Config ===
// $secrets_file = __DIR__ . '/config/secrets.php';
// if (!file_exists($secrets_file)) {
//     die('Error: secrets.php not found');
// }
// $secrets = require_once $secrets_file;
// if (!is_array($secrets)) {
//     die('Error: secrets.php must return an array');
// }
// foreach ($secrets as $key => $value) {
//     if (!defined($key)) {
//         define($key, $value);
//     }
// }

// === 4. Load PHPMailer ===
$phpmailer_files = [
    __DIR__ . '/libs/phpmailer/src/PHPMailer.php',
    __DIR__ . '/libs/phpmailer/src/SMTP.php',
    __DIR__ . '/libs/phpmailer/src/Exception.php',
];

foreach ($phpmailer_files as $file) {
    if (!file_exists($file)) {
        die("Error: PHPMailer file not found: $file");
    }
    require_once $file;
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// === 5. Autoload Class Definitions ===
function my_autoload($class) {
    // Support namespaces and alphanumeric class names
    if (preg_match('/\A[\w\\\\]+\Z/', $class)) {
        // Try both .class.php and .php extensions
        $base_path = __DIR__ . '/classes/' . str_replace('\\', '/', $class);
        $file_name = $base_path . '.class.php';
        $alt_file_name = $base_path . '.php';

        if (file_exists($file_name)) {
            include $file_name;
            // echo "Loaded class: $class from $file_name\n<br>";
        } elseif (file_exists($alt_file_name)) {
            include $alt_file_name;
            // echo "Loaded class: $class from $alt_file_name\n<br>";
        } else {
            // echo "Class file not found: $file_name or $alt_file_name\n<br>";
        }
    } else {
        // echo "Invalid class name: $class\n<br>";
    }
}
spl_autoload_register('my_autoload');

// === 6. List Available Classes in classes/ Folder ===
// echo "Available class files in classes/ folder:\n<br>";
$class_files = array_merge(
    glob(__DIR__ . '/classes/*.class.php'),
    glob(__DIR__ . '/classes/*.php'),
    glob(__DIR__ . '/classes/**/*.class.php'), // Support subdirectories for namespaced classes
    glob(__DIR__ . '/classes/**/*.php')
);
$class_files = array_unique($class_files); // Remove duplicates
foreach ($class_files as $file) {
    // echo "Found class file: $file\n<br>";
}

// === 7. Database Connection ===
$database = db_connect();
if (!$database) {
    die('Error: Failed to connect to database');
}

// Debug: Explicitly try to load DatabaseObject
my_autoload('DatabaseObject');

// Check if DatabaseObject class exists before calling
if (class_exists('DatabaseObject')) {
    DatabaseObject::setDatabase($database);
    // echo "DatabaseObject class loaded and database set.\n<br>";
} else {
    die("Error: DatabaseObject class not found. Ensure the file exists in classes/DatabaseObject.class.php or classes/DatabaseObject.php");
}

// Optional: Test loading other known classes (replace with actual class names)
$test_classes = ['User', 'Product', 'Order']; // Replace with your actual class names
foreach ($test_classes as $test_class) {
    if (!class_exists($test_class)) {
        my_autoload($test_class);
    }
}

// Optional: Display all included files for debugging
// echo "All included files:\n<br>";
foreach (get_included_files() as $file) {
    // echo "$file\n<br>";
}

// Flush output buffer (for debugging; remove in production)
// ob_end_flush();