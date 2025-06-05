<?php

class CacheHelper
{
    public static function get($key, $expirySeconds = 3600)
    {
        $cacheFile = self::getCachePath($key);
        if (!file_exists($cacheFile)) return null;

        $modifiedTime = filemtime($cacheFile);
        if ((time() - $modifiedTime) > $expirySeconds) {
            unlink($cacheFile);
            return null;
        }

        $data = file_get_contents($cacheFile);
        return json_decode($data, true);
    }

    public static function set($key, $value)
    {
        $cacheDir = self::getCacheDir();
        if (!is_dir($cacheDir)) mkdir($cacheDir, 0777, true);

        $cacheFile = self::getCachePath($key);
        file_put_contents($cacheFile, json_encode($value));
    }

    public static function exists($key, $expirySeconds = 3600)
    {
        $cacheFile = self::getCachePath($key);
        return file_exists($cacheFile) && (time() - filemtime($cacheFile)) < $expirySeconds;
    }

    public static function clear($key)
    {
        $cacheFile = self::getCachePath($key);
        if (file_exists($cacheFile)) unlink($cacheFile);
    }

    public static function clearAll()
    {
        $cacheDir = self::getCacheDir();
        foreach (glob($cacheDir . '*.json') as $file) {
            unlink($file);
        }
    }

    public static function listKeys()
    {
        $cacheDir = self::getCacheDir();
        $keys = [];

        foreach (glob($cacheDir . '*.json') as $file) {
            $keys[] = basename($file, '.json');
        }

        return $keys;
    }

    private static function getCacheDir()
    {
        return __DIR__ . '/../cache/';
    }

    private static function getCachePath($key)
    {
        return self::getCacheDir() . "{$key}.json";
    }
}
