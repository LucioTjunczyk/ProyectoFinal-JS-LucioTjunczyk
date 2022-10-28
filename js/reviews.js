

let estanteriaComentarios = []
//Guardar los comentarios en el Storage

if(localStorage.getItem("estanteriaComentarios")){
    estanteriaComentarios = JSON.parse(localStorage.getItem("estanteriaComentarios"))
}
else{
    estanteriaComentarios.push(review1, review2, review3)
localStorage.setItem("estanteriaComentarios", JSON.stringify(estanteriaComentarios) )
}
console.log(estanteriaComentarios)

//Mostrar los comentarios 

let divReviews = document.getElementById("nuestrasReviews")
function mostrarReviews(array){
    divReviews.innerHTML = ""
    array.forEach((Comentarios)=>{
        let nuevoDiv = document.createElement("div")
        nuevoDiv.innerHTML = `<div id="${Comentarios.id}" class="card" style="width: 18rem;">
                                <img class="card-img-top" style="height: 150px;" src="./img/${Comentarios.imagen}" alt="">
                                <div class="card-body">
                                    <h4 class="card-title">${Comentarios.nombre}</h4>
                                    <p>Mail: ${Comentarios.mail}</p>
                                    <p class="">Mensaje: ${Comentarios.mensaje}</p>            
                                </div>
                            </div>`

        divReviews.append(nuevoDiv)                    
    })
}

function ocultarReviews(){
    divReviews.innerHTML = ""
}

// //function agregar nuevo comentario

function nuevoComentario(array){
    let nombreComentario = prompt("Ingrese su nombre")
    let mailComentario = prompt("Ingrese su mail")
    let mensajeComentario = prompt("Ingrese su mensaje")
    let comentarioCreado = new Comentarios (estanteriaComentarios.length+1, nombreComentario, mailComentario, mensajeComentario)
    array.push(comentarioCreado)
}

//function nuevoComentario actualiza a inputs
function guardarComentario(array){
    let fname = document.getElementById("fname")
    let mailCliente = document.getElementById("mailCliente")
    let subjectMessaje = document.getElementById("subjectMessaje")
    let comentarioCreado = new Comentarios (array.length+1, fname.value, mailCliente.value, subjectMessaje.value, "comments.png")
    console.log(comentarioCreado)
    array.push(comentarioCreado)
    //Actualización de Storage
    localStorage.setItem("estanteriaComentarios", JSON.stringify(array))
    //Reseteo de form
    fname.value = ""
    mailCliente.value = ""
    subjectMessaje.value = ""
    mostrarReviews(array)    
}

//Evento para el botón Submit

let btnSubmit = document.getElementById("buttonGuest")
btnSubmit.addEventListener("click", ()=>{
    event.preventDefault()
    guardarComentario(estanteriaComentarios) 
})

//Evento para el botón Mostrar comentarios  

let btnMostrarComentarios = document.getElementById("verReviews")
btnMostrarComentarios.addEventListener("click", ()=>{
    mostrarReviews(estanteriaComentarios)
})

//Evento para el botón Ocultar comentarios  
let btnOcultarComentarios = document.getElementById("ocultarReviews")
btnOcultarComentarios.onclick = ocultarReviews
