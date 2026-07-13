const path = require('path');

require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
});

const app = require('./app');
const sequelize = require('./config/database');

const PORT = Number(process.env.PORT || 3000);

async function startServer() {
    try {
        await sequelize.authenticate();

        console.log('✅ Conexión con MySQL establecida correctamente.');
        console.log(`✅ Base configurada: ${process.env.DB_NAME}`);

        app.listen(PORT, () => {
            console.log(`✅ API ejecutándose en el puerto ${PORT}`);
            console.log(
                `✅ Health check: http://localhost:${PORT}/api/health`
            );
            console.log(
                `✅ Database check: http://localhost:${PORT}/api/health/database`
            );
        });
    } catch (error) {
        console.error('❌ No fue posible iniciar la API.');
        console.error('Tipo:', error.name);
        console.error('Mensaje:', error.message);

        if (error.original?.code) {
            console.error(
                'Código MySQL:',
                error.original.code
            );
        }

        process.exit(1);
    }
}

async function shutdown(signal) {
    console.log(`\n${signal} recibido. Cerrando servidor...`);

    try {
        await sequelize.close();
        console.log('✅ Pool de MySQL cerrado correctamente.');
        process.exit(0);
    } catch (error) {
        console.error('Error cerrando MySQL:', error.message);
        process.exit(1);
    }
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

startServer();