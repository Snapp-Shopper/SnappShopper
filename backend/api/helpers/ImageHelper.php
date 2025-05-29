<?php

class ImageHelper
{
    /**
     * Resize and compress image
     *
     * @param string $sourcePath Temp file path
     * @param string $destinationPath Where to save the resized image
     * @param int $maxWidth Max width of resized image
     * @param int $quality JPEG/WEBP quality (0-100)
     * @return bool True on success, false on failure
     */
    public static function resizeAndCompress($sourcePath, $destinationPath, $maxWidth = 1024, $quality = 80)
    {
        if (!file_exists($sourcePath)) return false;

        list($width, $height, $type) = getimagesize($sourcePath);
        $mime = image_type_to_mime_type($type);

        // Load source image
        switch ($mime) {
            case 'image/jpeg':
                $srcImage = imagecreatefromjpeg($sourcePath);
                break;
            case 'image/png':
                $srcImage = imagecreatefrompng($sourcePath);
                break;
            case 'image/webp':
                $srcImage = imagecreatefromwebp($sourcePath);
                break;
            default:
                return false; // Unsupported type
        }

        if ($width > $maxWidth) {
            $ratio = $height / $width;
            $newWidth = $maxWidth;
            $newHeight = $maxWidth * $ratio;
        } else {
            // Just copy original
            return move_uploaded_file($sourcePath, $destinationPath);
        }

        // Resize
        $newImage = imagecreatetruecolor($newWidth, $newHeight);
        imagecopyresampled($newImage, $srcImage, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

        // Save compressed
        $saved = false;
        switch ($mime) {
            case 'image/jpeg':
                $saved = imagejpeg($newImage, $destinationPath, $quality);
                break;
            case 'image/png':
                $saved = imagepng($newImage, $destinationPath, 6); // 0 (no comp) to 9 (max)
                break;
            case 'image/webp':
                $saved = imagewebp($newImage, $destinationPath, $quality);
                break;
        }

        imagedestroy($srcImage);
        imagedestroy($newImage);

        return $saved;
    }

     /**
     * Generate square thumbnail (center crop)
     */
    public static function generateThumbnail($sourcePath, $thumbPath, $thumbSize = 300, $quality = 80)
    {
        if (!file_exists($sourcePath)) return false;

        list($width, $height, $type) = getimagesize($sourcePath);
        $mime = image_type_to_mime_type($type);

        switch ($mime) {
            case 'image/jpeg':
                $srcImage = imagecreatefromjpeg($sourcePath);
                break;
            case 'image/png':
                $srcImage = imagecreatefrompng($sourcePath);
                break;
            case 'image/webp':
                $srcImage = imagecreatefromwebp($sourcePath);
                break;
            default:
                return false;
        }

        // Center crop
        $minDim = min($width, $height);
        $x = ($width - $minDim) / 2;
        $y = ($height - $minDim) / 2;

        $cropped = imagecrop($srcImage, ['x' => $x, 'y' => $y, 'width' => $minDim, 'height' => $minDim]);
        if (!$cropped) return false;

        $thumbImage = imagecreatetruecolor($thumbSize, $thumbSize);
        imagecopyresampled($thumbImage, $cropped, 0, 0, 0, 0, $thumbSize, $thumbSize, $minDim, $minDim);

        switch ($mime) {
            case 'image/jpeg':
                imagejpeg($thumbImage, $thumbPath, $quality);
                break;
            case 'image/png':
                imagepng($thumbImage, $thumbPath, 6);
                break;
            case 'image/webp':
                imagewebp($thumbImage, $thumbPath, $quality);
                break;
        }

        imagedestroy($srcImage);
        imagedestroy($cropped);
        imagedestroy($thumbImage);

        return true;
    }
}
