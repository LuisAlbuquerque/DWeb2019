function remove_movie(id){
    console.log('Vou tentar apagar o ' + id + ' ...')
    axios.delete("/filmes/" + id)
        .then(response => window.location.assign('/filmes'))
        .catch(error => console.log(error))
}

function get_by_id(id) {
    axios.get("/filmes/" + id)
        .then(response => window.location.assign('/filmes/' + id))
        .catch(error => console.log(error))
}

function add() {
    axios.get("/add" )
        .then(response => window.location.assign('/add'))
        .catch(error => console.log(error))
}

function home() {
    axios.get("/filmes" )
        .then(response => window.location.assign('/filmes'))
        .catch(error => console.log(error))
}

function update(id) {
    axios.get("/update/" + id)
        .then(response => window.location.assign('/update/' + id))
        .catch(error => console.log(error))
}

function add_ator(){
   document.getElementById('atores').innerHTML += '<input class="w3-input w3-blue-grey w3-xlarge w3-animate-top w3-round-large" type="text" name="cast"></input>';
}

function add_genero(){
   document.getElementById('generos').innerHTML += '<input class="w3-input w3-blue-grey w3-xlarge w3-animate-top w3-round-large" type="text" name="genres"></input>';
}

function filter(){
    axios.get("/filter")
        .then(response => window.location.assign('/filter'))
        .catch(error => console.log(error))
}