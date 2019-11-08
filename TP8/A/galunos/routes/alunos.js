var express = require('express');
var router = express.Router();
var axios = require("axios");

/* GET users listing. */
router.get('/', (req, res, next) => {
  axios.get("http://localhost:3005/api/alunos")
    .then(dados => {
      res.render("lista-alunos", { lista : dados.data });
    })
    .catch(erro => {
      res.render("erro", {error : erro});
    })
});

router.get('/:idAluno', (req, res, next) => {
  axios.get("http://localhost:3005/api/alunos/" + req.params.idAluno)
    .then(dados => {
      res.render("pag-aluno", { lista : dados.data });
    })
    .catch(erro => {
      res.render("erro", {error : erro});
    })
});

router.get('/inserir', (req,res) => {
  res.render("form-aluno");
})

router.post('/:idAluno', (req, res, next) => {
  axios.get("http://localhost:3005/api/alunos/" + req.body)
    .then(dados => {
      res.redirect("/")
    })
    .catch(erro => {
      res.render("erro", {error : erro});
    })
});


router.get("editar" , (req,res) => {
  axios.put("http://localhost:3005/api/alunos/" , req.body)
    .then(dados => {
      res.redirect("/")
    })
    .catch(erro => {
      res.render("erro", {error : erro});
    })
})

router.get("editar/:id" , (req,res) => {
  axios.get("http://localhost:3005/api/alunos/" + req.params.id)
    .then(dados => {
      res.render("pag-edita-aluno", {aluno : datdos.data})
    })
    .catch(erro => {
      res.render("erro", {error : erro});
    })
})

module.exports = router;