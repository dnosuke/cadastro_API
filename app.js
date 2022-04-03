const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')


const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');

app.use(cors())
app.use(morgan('dev')); //monitora a execução
app.use(bodyParser.urlencoded({ extended: false })); //apenas dadods simples
app.use(bodyParser.json()); //apenas arquivos json

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header',
     'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');    

        return res.send({
        erro: {
            mensagem: error.message
            }
        })
    }
    next();
})
    



app.use('/produtos', rotaProdutos)
app.use('/pedidos', rotaPedidos)

// EXECUTA QUANDO NÂO ENCONTRA ROTA
app.use((req, res, next) => {
        const erro = new Error('Não encontrado');
        erro.status = 404;
        next(erro);
    });

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        erro: {
            mensagem: error.message
        }
    })
})

module.exports = app;