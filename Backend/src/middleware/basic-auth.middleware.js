const bcrypt = require('bcryptjs');

function requestCredentials(res, message) {
    res.setHeader(
        'WWW-Authenticate',
        'Basic realm="ListoEnLinea API", charset="UTF-8"'
    );

    return res.status(401).json({
        ok: false,
        message
    });
}

async function basicAuth(req, res, next) {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader?.startsWith('Basic ')) {
        return requestCredentials(
            res,
            'Autenticación requerida'
        );
    }

    try {
        const adminEmail = process.env.ADMIN_EMAIL?.trim();
        const adminPasswordHash =
            process.env.ADMIN_PASSWORD_HASH?.trim();

        if (!adminEmail || !adminPasswordHash) {
            console.error(
                'Basic Auth sin configurar:',
                {
                    hasAdminEmail: Boolean(adminEmail),
                    hasPasswordHash: Boolean(adminPasswordHash)
                }
            );

            return res.status(500).json({
                ok: false,
                message:
                    'La autenticación del servidor no está configurada'
            });
        }

        /*
         * Un hash bcrypt normalmente mide 60 caracteres.
         * No imprimimos el valor completo por seguridad.
         */
        console.log('Configuración Basic Auth:', {
            adminEmail,
            hashLength: adminPasswordHash.length,
            hashPrefix: adminPasswordHash.slice(0, 7)
        });

        const encodedCredentials =
            authorizationHeader.slice(6).trim();

        const decodedCredentials = Buffer
            .from(encodedCredentials, 'base64')
            .toString('utf8');

        const separatorIndex =
            decodedCredentials.indexOf(':');

        if (separatorIndex === -1) {
            return requestCredentials(
                res,
                'Credenciales inválidas'
            );
        }

        const email = decodedCredentials
            .slice(0, separatorIndex)
            .trim();

        /*
         * No aplicamos trim a la contraseña porque los espacios
         * podrían formar parte legítima de ella.
         */
        const password =
            decodedCredentials.slice(separatorIndex + 1);

        const validEmail =
            email.toLowerCase() === adminEmail.toLowerCase();

        const validPassword = await bcrypt.compare(
            password,
            adminPasswordHash
        );

        /*
         * Estos logs no exponen ni la contraseña ni el hash.
         * Elimínalos cuando termines de diagnosticar.
         */
        console.log('Resultado Basic Auth:', {
            receivedEmail: email,
            validEmail,
            validPassword,
            passwordLength: password.length
        });

        if (!validEmail || !validPassword) {
            return requestCredentials(
                res,
                'Credenciales incorrectas'
            );
        }

        req.user = {
            email: adminEmail,
            role: 'admin',
            tenant: 'floristeria-magno'
        };

        return next();
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    basicAuth
};