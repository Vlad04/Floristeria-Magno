const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');

const {
    uploadsRoot
} = require('../config/uploads');

const allowedMimeTypes = new Map([
    ['image/jpeg', '.jpg'],
    ['image/png', '.png'],
    ['image/webp', '.webp'],
    ['image/gif', '.gif']
]);

function createUploadMiddleware(folderName) {
    const destinationFolder = path.join(
        uploadsRoot,
        folderName
    );

    fs.mkdirSync(destinationFolder, {
        recursive: true
    });

    const storage = multer.diskStorage({
        destination(req, file, callback) {
            callback(null, destinationFolder);
        },

        filename(req, file, callback) {
            const extension =
                allowedMimeTypes.get(file.mimetype);

            if (!extension) {
                return callback(
                    new Error(
                        'Formato de imagen no permitido'
                    )
                );
            }

            const uniqueName =
                `${Date.now()}-${crypto.randomUUID()}${extension}`;

            callback(null, uniqueName);
        }
    });

    return multer({
        storage,

        limits: {
            fileSize: 8 * 1024 * 1024
        },

        fileFilter(req, file, callback) {
            if (!allowedMimeTypes.has(file.mimetype)) {
                return callback(
                    new Error(
                        'Solo se permiten imágenes JPG, PNG, WEBP o GIF'
                    )
                );
            }

            callback(null, true);
        }
    }).single('imagen');
}

const uploadProductImage =
    createUploadMiddleware('productos');

const uploadGalleryImage =
    createUploadMiddleware('galeria');

module.exports = {
    uploadProductImage,
    uploadGalleryImage
};