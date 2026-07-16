const bcrypt = require('bcryptjs');

async function basicAuth(req, res, next) {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader?.startsWith('Basic ')) {
        res.setHeader(
            'WWW-Authenticate',
            'Basic realm="ListoEnLinea API", charset="UTF-8"'
        );

        return res.status(401).json({
            ok: false,
            message: 'Autenticación requerida'
        });
    }

    try {
        const encodedCredentials = authorizationHeader.slice(6);

        const decodedCredentials = Buffer
            .from(encodedCredentials, 'base64')
            .toString('utf8');

        const separatorIndex = decodedCredentials.indexOf(':');

        if (separatorIndex === -1) {
            throw new Error('Credenciales inválidas');
        }

        const email = decodedCredentials.slice(0, separatorIndex);
        const password = decodedCredentials.slice(separatorIndex + 1);

        const validEmail =
            email.trim().toLowerCase() ===
            process.env.ADMIN_EMAIL.trim().toLowerCase();

        const validPassword = await bcrypt.compare(
            password,
            process.env.ADMIN_PASSWORD_HASH
        );

        if (!validEmail || !validPassword) {
            res.setHeader(
                'WWW-Authenticate',
                'Basic realm="ListoEnLinea API", charset="UTF-8"'
            );

            return res.status(401).json({
                ok: false,
                message: 'Credenciales incorrectas'
            });
        }

        req.user = {
            email: process.env.ADMIN_EMAIL,
            role: 'admin',
            tenant: 'floristeria-magno'
        };

        next();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    basicAuth
};