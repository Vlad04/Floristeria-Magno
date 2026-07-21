const path = require('path');

/*
 * En producción puedes definir UPLOADS_DIR con una ruta
 * persistente de Hostinger.
 *
 * Si no existe la variable, usa la carpeta uploads
 * de la raíz del proyecto.
 */
const uploadsRoot = process.env.UPLOADS_DIR
    ? path.resolve(process.env.UPLOADS_DIR)
    : path.join(process.cwd(), 'uploads');

module.exports = {
    uploadsRoot
};