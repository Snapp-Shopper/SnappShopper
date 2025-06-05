<?php

class Logger
{
    public static function debug($message, $context = [])
    {
        self::writeLog('DEBUG', $message, $context);
    }

    public static function error($message, $context = [])
    {
        self::writeLog('ERROR', $message, $context);
    }

    private static function writeLog($level, $message, $context = [])
    {
        $logDir = __DIR__ . '/../logs/';
        if (!is_dir($logDir)) mkdir($logDir, 0777, true);

        $file = $logDir . 'dev.log';
        $timestamp = date('Y-m-d H:i:s');
        $contextStr = !empty($context) ? json_encode($context, JSON_UNESCAPED_SLASHES) : '';
        $entry = "[$timestamp] [$level] $message $contextStr" . PHP_EOL;

        file_put_contents($file, $entry, FILE_APPEND);
    }
}
