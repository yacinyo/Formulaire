function hideOrShow() {
    $("form").toggleClass('hide')
    $("form").data("mode", "add")
        /*or $("form").attr("data-mode", "add")*/
    display()
}




//localStorage.setItem(emplacement, carnet)


function onClickSaveContact(e) {
    e.preventDefault()
    console.log("ok")
    var donnees = {
        civilite: $("#civilite").val(),
        nom: $("#nom").val(),
        prenom: $("#prenom").val(),
        tel: $("#tel").val()
    }



    var tableau = localStorage.getItem("carnet")
    if (tableau == null) { //si le local storage ne renvoie rien car rien d'enregistré
        tableau = [] //liste est un tableau vide
    } else { //sinon
        tableau = JSON.parse(tableau) //converti le JSON en données complexes (ici tableau contenant des objets)
    }


    // console.log(tableauJson)
    var mode = $('form').data("mode")
        //SI on est en mode ajout -> si data-mode est égal à add
    if (mode == "add") {
        //Dans le tableau liste, on vient push (ajouter) l'objet contact à la fin du tableau
        tableau.push(donnees)
    } else {
        //SINON
        var index = $("#contact-details a").data("index")
            //on modifie le contact dans le tableau de contacts
        liste[index] = contact
    }





}

function getLocalStorage() {
    var tableau = localStorage.getItem("carnet") //retourne du JSON
    if (tableau == null) { //si le local storage ne renvoie rien car rien d'enregistré
        tableau = [] //liste est un tableau vide
    } else { //sinon
        tableau = JSON.parse(tableau) //converti le JSON en données complexes (ici tableau contenant des objets)
    }
    return tableau
}



function display() {
    var tableau = getLocalStorage()
    $('#address-book').html('<ul>')
    for (var i = 0; i < tableau.length; i++) {
        $('#address-book ul').append('<li> <a data-index="' + i + '">' + "nom:  " + tableau[i].nom + "   prenom:  " + tableau[i].prenom + '</a></li>') //ajouter des li

    }

    /*console.log(tableau)*/
}


function displayContact() {
    //récupérer le data-index
    var index = $(this).data('index')
        //récupère les infos du contact
    var tableau = getLocalStorage()
    var civilite
    switch (tableau[index].civilite) {
        case "1":
            civilite = "Mme."
            break
        case "2":
            civilite = "Mlle."
            break
        case "3":
            civilite = "M."
            break
    }

    $("#contact-details h3").text(`${civilite} ${tableau[index].nom} ${tableau[index].prenom}`)
    $("#contact-details p").text(tableau[index].tel)
    $("#contact-details a").data('index', index)
    $("#contact-details").fadeIn()



    console.log('Tel: ' + tableau[index].tel + ' civilité: ' + tableau[index].civilite)
        /*console.log(index)*/

}

function remplissage(e) {
    e.preventDefault()
    var recuperation = getLocalStorage()
    console.log(recuperation)

    var i = $(this).data('index')




    var nomRetrieved = recuperation[i].nom
    var prenomRetrieved = recuperation[i].prenom
    var tel = recuperation[i].tel

    console.log(i)

    $("#nom").val(nomRetrieved)
    $("#prenom").val(prenomRetrieved)
    $("#tel").val(tel)
    $("#civilite").val(recuperation[i].civilite)
    $("form").data("mode", "edit").fadeIn
    console.log(nomRetrieved)

}



function setLocalStorage(tableau) {
    var jsonListe = JSON.stringify(tableau)
    localStorage.setItem("carnet", jsonListe)
}


function removeAll() {
    var tab = []
    setLocalStorage(tab)
}












$(document).ready(function() {
    //code qui ne s'éxécute qu'une fois que la page HTML est bien chargée
    $("#plus").on('click', hideOrShow)
    $("#btn").on('click', onClickSaveContact)

    $("#address-book").on('click', 'ul li a', displayContact)

    $("#contact-details a").on('click', remplissage)
        /*$("form").on('click',#contact-details a,remplissage)*/


    $("#effacer").on('click', supprimer)
    $("#effacer").on('click', removeAll)


    display()

})