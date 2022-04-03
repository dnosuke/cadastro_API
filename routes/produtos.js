const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM produto;',
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send(resultado)
            }
        )
    })

});


router.post('/', (req, res, next) => {
    const produto = {
        nome: req.body.nome,
        preco: req.body.preco,
        quantidade: req.body.quantidade
       
    };

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO produto (nome, preco, quantidade) VALUES (?,?,?)',
            [req.body.nome, req.body.preco, req.body.quantidade],
            (error, resultado, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }


                res.status(201).send({
                    mensagem: 'produto inserido',
                    id_produto: resultado.insertId
                }

                )
            })

    });
});

//rota que retorna produto por id
router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto

    if (id === 'id') {
        res.status(200).send({
            mensagem: 'retornou o id',
            id: id
        })
    } else {
        res.status(200).send({
            mensagem: 'passou id'
        });
    };

    res.status(200).send({
        mensagem: 'usando o get'
    });
});

router.patch('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'usando o patch'
    });
});

router.delete('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'usando o delete'
    });
});

module.exports = router;