const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

//Database connection 
const connection = require("./database/database");
connection
    .authenticate()
    .then(() => {
        console.log("CONEXÃO FEITA COM O BANCO DE DADOS")
    })
    .catch((msgErro) => {
        console.log(msgErro)
    })
//  
// Estou dizendo para o Express usar o EJS como view engine
app.set('view engine', 'ejs')
app.use(express.static('public'))
// 
// Body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// 
// rotas
app.get("/", (req, res) => {
    Pergunta.findAll({
        raw: true, order: [
            ['id', 'DESC'] // ASC = Crescente DESC = DECRESCENTE
        ]
    }).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    });

})
app.get("/perguntar", (req, res) => {
    res.render("perguntar")
})
app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo
    var descricao = req.body.descricao
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/")
    })
})

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id
    var pergunta = req.body.pergunta
    Pergunta.findOne({
        where: { id: id }
    }).then(pergunta => {
        if (pergunta != undefined) { //Pergunta achada

            Resposta.findAll({
                where: { perguntaId: pergunta.id },
                order: [
                    ['id', 'DESC']
                ]
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            })
        } else { //Pergunta não encontrada
            res.redirect("/")
        }
    })
})

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect(`/pergunta/ ${perguntaId}`) //res.redirect("/pergunta/4")
    })
})

app.listen(3030, () => {
    console.log("App Rodando");
})