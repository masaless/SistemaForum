const Sequilize = require("sequelize")
const { model } = require("./database")
const connection = require("./database")

const Resposta = connection.define("respostas", {
    corpo: {
        type: Sequilize.TEXT,
        allowNull: false
    }, 
    perguntaId: {
        type: Sequilize.INTEGER,
        allowNull: false 
    }
})

Resposta.sync({force: false})

model.exports = Resposta