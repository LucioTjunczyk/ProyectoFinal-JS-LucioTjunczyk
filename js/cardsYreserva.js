const items = document.getElementById('items')
const verReservas = document.getElementById('verReservas')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carritoReserva = {}


// Eventos

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
    //Guardar productos del carrito en el local storage
    if(localStorage.getItem('carritoReserva')){
        carritoReserva = JSON.parse(localStorage.getItem('carritoReserva'))
        pintarCarrito()
    }
})

document.addEventListener('click', e =>{
    addReserva(e)
})

document.addEventListener('click', e =>{
    btnAccion(e)
})

//Toma la info de la API

const fetchData = async () =>{
    try{
        const res = await fetch('api.json')
        const data = await res.json()
        pintarCards(data)
    } catch (error){
        console.log(error)
    }
}


//Crea las cards en el HTML

const pintarCards = data =>{
    data.forEach(producto =>{
        templateCard.querySelector('h5').textContent = producto.title
        templateCard.querySelector('p').textContent = producto.precio
        templateCard.querySelector('img').setAttribute("src", producto.thumbnailUrl)
        templateCard.getElementById('reserBtn').dataset.id = producto.id
        // templateCard.querySelector('.btn-dark').dataset.id = producto.id

        const clone=  templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })

    items.appendChild(fragment)
}

//Btn para agregar al carrito/boton de reserva

const addReserva = e =>{
    // console.log(e.target)
    // console.log(e.target.classList.contains('#reserBtn'))
    if(e.target.classList.contains('#reserBtn') === false) {        
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = objeto =>{    
    const producto ={        
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        diasReserva: 1        
    }

    if(carritoReserva.hasOwnProperty(producto.id)){
        producto.diasReserva = carritoReserva[producto.id].diasReserva + 1
    }   

    carritoReserva[producto.id] = {...producto}
    pintarCarrito()
    // console.log(carritoReserva)
}


//Crea el carrito en el HTML

const pintarCarrito = () =>{
    // console.log(carritoReserva)
    verReservas.innerHTML = ''
    Object.values(carritoReserva).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.diasReserva
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.diasReserva * producto.precio

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })

    verReservas.appendChild(fragment)

    pintarFooter()

    localStorage.setItem('carritoReserva', JSON.stringify(carritoReserva))
}

//Crea el footer del carrito en el HTML, pregunta si el carrito esta vacio y crea un condicional para mostrar un mensaje

const pintarFooter = () =>{
    footer.innerHTML = ''
    if(Object.keys(carritoReserva).length === 0){
        footer.innerHTML = `
        <th scope="row" colspan="5">No ha realizado ninguna reserva</th>
        `
        return
    }

    const cantDias = Object.values(carritoReserva).reduce((acumulador, {diasReserva})=> acumulador + diasReserva , 0)
    const precioTotal = Object.values(carritoReserva).reduce((acumulador, {diasReserva, precio})=> acumulador + diasReserva * precio, 0)
    //  console.log(precioTotal)

    templateFooter.querySelectorAll('td')[0].textContent = cantDias
    templateFooter.querySelector('span').textContent = precioTotal

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciarCarrito = document.getElementById('vaciar-carrito')
    btnVaciarCarrito.addEventListener("click", ()=>{
        carritoReserva = {}
        pintarCarrito()
    })
}



// Función para aumentar y disminuir la cantidad de días/botoón

const btnAccion = e => {
    // console.log(e.target)
    if(e.target.classList.contains('btn-info')){
        // console.log(carritoReserva[e.target.dataset.id])
        const producto = carritoReserva[e.target.dataset.id]
        producto.diasReserva++
        carritoReserva[e.target.dataset.id] = {...producto}


        pintarCarrito()
    }

    if(e.target.classList.contains('btn-danger')){
        const producto = carritoReserva[e.target.dataset.id]
        producto.diasReserva--
        if(producto.diasReserva === 0){
            delete carritoReserva[e.target.dataset.id]
        }
        pintarCarrito()
    }

    e.stopPropagation()
}



//Sweet alert para EL BOTON DE finalizar la reserva
//No pude implementar bien el if para el array de carritoReserva. La idea era que cuando el carrito este vacio al clickear el boton "Finalizar reserva" aparezca un swal que diga que no hay nada en el carrito


let btnReservar = document.getElementById("btnFinalReserva")

btnReservar.addEventListener("click", ()=>{
  if(carritoReserva.length === 0){
    Swal.fire({
                title: 'No selecciono ningun Hostel para reservar',
                text: "",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Confirmar'
              })
  } else {
    Swal.fire({
            title: 'Desea reservar el/los siguiente/s hostels en México?',
            text: "Usted esta por finalizar su reserva",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'La reserva se ha realizado con exito!',
                '',
                'success'
              )
            }
          })
  }
})