require('dotenv').config();

const sequelize = require('./config/database');

const PORT = Number(process.env.PORT || 3000);

async function startServer() {
    try {
        await sequelize.authenticate();

        console.log('Conexión con MySQL establecida correctamente.');
        console.log(`Base configurada: ${process.env.DB_NAME}`);
    } catch (error) {
        console.error('No fue posible conectar con MySQL.');
        console.error(error.message);
        process.exit(1);
    }
}

startServer();