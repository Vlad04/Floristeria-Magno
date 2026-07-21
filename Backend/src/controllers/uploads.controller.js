function buildPublicImageUrl(
    req,
    folderName,
    filename
) {
    return (
        `${req.protocol}://${req.get('host')}` +
        `/uploads/${folderName}/` +
        encodeURIComponent(filename)
    );
}

async function subirImagenProducto(req, res, next) {
    try {
        if (!req.file) {
            return res.status(400).json({
                ok: false,
                message: 'Debes seleccionar una imagen'
            });
        }

        res.status(201).json({
            ok: true,
            message: 'Imagen subida correctamente',
            data: {
                imagenUrl: buildPublicImageUrl(
                    req,
                    'productos',
                    req.file.filename
                ),
                nombreArchivo: req.file.filename,
                tamaño: req.file.size,
                tipo: req.file.mimetype
            }
        });
    } catch (error) {
        next(error);
    }
}

async function subirImagenGaleria(req, res, next) {
    try {
        if (!req.file) {
            return res.status(400).json({
                ok: false,
                message: 'Debes seleccionar una imagen'
            });
        }

        res.status(201).json({
            ok: true,
            message: 'Imagen subida correctamente',
            data: {
                imagenUrl: buildPublicImageUrl(
                    req,
                    'galeria',
                    req.file.filename
                ),
                nombreArchivo: req.file.filename,
                tamaño: req.file.size,
                tipo: req.file.mimetype
            }
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    subirImagenProducto,
    subirImagenGaleria
};