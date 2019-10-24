function remove_item(ident){
    console.log('Vou tentar apagar o ' + ident + ' ...')
    axios.delete("/" + ident)
        .then(response => window.location.assign('/'))
        .catch(error => console.log(error))
}

function get_info(title) {
    axios.get("/" + title)
        .then(response => window.location.assign('/' + title))
        .catch(error => console.log(error))
}

function add() {
    axios.get("/add" )
        .then(response => window.location.assign('/add'))
        .catch(error => console.log(error))
}

function home() {
    axios.get("/" )
        .then(response => window.location.assign('/'))
        .catch(error => console.log(error))
}

function mudar() {
    axios.get("/mudar" )
        .then(response => window.location.assign('/mudar'))
        .catch(error => console.log(error))
}
