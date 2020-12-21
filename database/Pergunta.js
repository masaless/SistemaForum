const { Sequelize } = require('sequelize')
const connection = require('./database')

const Pergunta = connection.define('pergunta', {
    titulo:{
        type: Sequelize.STRING,
        allowNull: true
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false}).then(() => {});

module.exports = Pergunta;