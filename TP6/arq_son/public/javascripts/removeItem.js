function removeItem(ident){
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