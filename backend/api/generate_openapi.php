<?php
/**
 * Scans all PHP files under /routes for @openapi YAML blocks and generates openapi.json
 */

require_once '../../vendor/autoload.php';
use Symfony\Component\Yaml\Yaml;

$routesDir = realpath(__DIR__ . '/routes');
$outputFile = realpath(__DIR__ . '/openapi.json');

if (!is_dir($routesDir)) {
    exit("\u274c Routes directory not found at: $routesDir\n");
}

$baseOpenAPI = [
    'openapi' => '3.0.3',
    'info' => [
        'title' => 'SnappShopper API',
        'version' => '1.0.0',
        'description' => 'Auto-generated OpenAPI documentation for SnappShopper endpoints.'
    ],
    'servers' => [
        ['url' => 'http://' . ($_SERVER['HTTP_HOST'] ?? 'localhost') . '/snappshopper/backend/api/routes']
    ],
    'paths' => []
];

echo "\ud83d\udd0d Scanning folder: $routesDir\n";

$iterator = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($routesDir, RecursiveDirectoryIterator::SKIP_DOTS),
    RecursiveIteratorIterator::LEAVES_ONLY
);

foreach ($iterator as $file) {
    if (!$file->isFile() || $file->getExtension() !== 'php') continue;

    $filePath = $file->getPathname();
    $contents = file_get_contents($filePath);

    echo "\ud83d\udcc4 Checking: $filePath\n";

    if (preg_match('/\/\*\*(.*?)\*\//s', $contents, $commentBlock)) {
        $doc = $commentBlock[1];
        echo "\u2705 Found docblock in " . $file->getFilename() . "\n";

       if (preg_match('/@openapi\\s*((?:\\n|.)*?)$/', $doc, $apiBlock))
 {
            echo "\u2705 Found @openapi block in " . $file->getFilename() . "\n";

            $yamlLines = explode("\n", $apiBlock[1]);
            $clean = array_map(function ($line) {
                // Remove just the `*` and the first space after it, if present
                return preg_replace('/^\s*\*\s?/', '', $line);
            }, $yamlLines);

            $yamlString = implode("\n", $clean);
            echo "\ud83d\udcdd YAML block detected:\n$yamlString\n";

            try {
                $parsed = Yaml::parse($yamlString);
                if (is_array($parsed)) {
                    echo "\u2705 YAML parsed successfully\n";
                    $baseOpenAPI['paths'] = array_merge_recursive($baseOpenAPI['paths'], $parsed);
                } else {
                    echo "\u26a0\ufe0f Parsed YAML is not an array\n";
                }
            } catch (Exception $e) {
                echo "\u274c YAML parse error in " . $file->getFilename() . ": " . $e->getMessage() . "\n";
            }
        } else {
            echo "\u26a0\ufe0f No @openapi block found in " . $file->getFilename() . "\n";
        }
    } else {
        echo "\u26a0\ufe0f No docblock found in " . $file->getFilename() . "\n";
    }
}

file_put_contents($outputFile, json_encode($baseOpenAPI, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
echo "\u2705 openapi.json generated successfully at: $outputFile\n";
