<?php
$routesDir = realpath(__DIR__ . '/routes'); // go up one level to access routes
if (!is_dir($routesDir)) {
    die('Routes directory not found.');
}
$baseUrl = (isset($_SERVER['HTTPS']) ? 'https://' : 'http://') .
    $_SERVER['HTTP_HOST'] . dirname($_SERVER['SCRIPT_NAME']) . '/routes';

function getFileDescription($filePath) {
    $lines = file($filePath);
    foreach ($lines as $line) {
        if (preg_match('/\/\/\s*Description\s*:\s*(.+)/i', $line, $matches)) {
            return trim($matches[1]);
        }
        // Stop only after finding actual executable code (not `<?php` or whitespace)
        if (preg_match('/^\s*[^<\s\/]/', $line)) break;
    }
    return null;
}


function listEndpoints($dir, $baseUrl) {
    $output = [];

    $iterator = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($dir),
        RecursiveIteratorIterator::LEAVES_ONLY
    );

    foreach ($iterator as $file) {
        if ($file->isFile() && $file->getExtension() === 'php') {
            $absolutePath = $file->getPathname();
            $relativePath = str_replace('\\', '/', str_replace($dir . '/', '', $absolutePath));
            $folder = dirname($relativePath); // just the subfolder like "users", "products"
            $link = $baseUrl . '/' . $folder;

            $description = getFileDescription($absolutePath);

            if (!isset($output[$folder])) {
                $output[$folder] = [];
            }

            $output[$folder][] = [
                'name' => basename($relativePath),
                'path' => $link,
                'description' => $description
            ];
        }
    }

    return $output;
}


$endpoints = listEndpoints($routesDir, $baseUrl);
?>

<!DOCTYPE html>
<html>
<head>
    <title>📡 API Endpoint Directory</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 2rem; background: #f9f9f9; }
        h1, h2 { color: #333; }
        .search-box { margin-bottom: 2rem; }
        .search-box input {
            padding: 0.5rem;
            width: 300px;
            font-size: 1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        ul { list-style-type: none; padding-left: 1rem; }
        li { margin-bottom: 0.5rem; }
        a { text-decoration: none; color: #0066cc; font-weight: bold; }
        a:hover { text-decoration: underline; }
        .desc { color: #666; font-size: 0.95em; margin-left: 10px; }
        .folder { margin-top: 2rem; }
    </style>
</head>
<body>

    <h1>📡 Available API Endpoints</h1>
    <p>Search and browse all registered PHP endpoints categorized by folder.</p>

    <div class="search-box">
        <input type="text" id="searchInput" placeholder="Search endpoints...">
    </div>

    <div id="endpointsList">
        <?php foreach ($endpoints as $folder => $files): ?>
            <div class="folder" data-folder="<?= htmlspecialchars($folder) ?>">
                <h2><?= htmlspecialchars($folder === '.' ? 'Root' : $folder) ?></h2>
                <ul>
                    <?php foreach ($files as $file): ?>
                        <li class="endpoint-item" data-name="<?= strtolower($file['name']) ?>" data-desc="<?= strtolower($file['description']) ?>">
                            <a href="<?= htmlspecialchars($file['path']) ?>" target="_blank">
                                <?= htmlspecialchars($file['name']) ?>
                            </a>
                            <?php if ($file['description']): ?>
                                <span class="desc">– <?= htmlspecialchars($file['description']) ?></span>
                            <?php endif; ?>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </div>
        <?php endforeach; ?>
    </div>

    <script>
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', function () {
            const search = this.value.toLowerCase();
            const items = document.querySelectorAll('.endpoint-item');

            items.forEach(item => {
                const name = item.dataset.name;
                const desc = item.dataset.desc;
                const visible = name.includes(search) || desc.includes(search);
                item.style.display = visible ? '' : 'none';
            });

            // Hide folder headings if all items are hidden
            const folders = document.querySelectorAll('.folder');
            folders.forEach(folder => {
                const visibleItems = folder.querySelectorAll('.endpoint-item:not([style*="display: none"])');
                folder.style.display = visibleItems.length > 0 ? '' : 'none';
            });
        });
    </script>

</body>
</html>
