// FORMULARIO DE CONTACTO Y REVIEWS

//Clase constuctora 

class Comentarios {
  constructor(id, nombre, mail, mensaje, imagen){    
      this.id = id,
      this.nombre = nombre,
      this.mail = mail,
      this.mensaje = mensaje,
      this.imagen = imagen
  }

  mostrarLosComentarios(){
      console.log(`From: ${this.nombre}. Mail: ${this.mail}. Message: ${this.mensaje}`)
  }    
}

//Instanciación de objetos -- respetamos orden y cantidad de atributos

const review1 = new Comentarios(1, "Lucio", "lucio@gamil.com", "Excelentes vistas y atención")

const review2 = new Comentarios(2, "Clara", "clara@gamil.com", "Las playas más hermosas del mundo junto al mejor Hostel")

const review3 = new Comentarios(3, "Kimchi", "kimchi@gamil.com", "Mi lugar favorito en el mundo!!!")



//////////////////////////////////////////////////////////////////////////////////////////////////////////////


//Creación de clase constructora

class Accomodations {
  constructor(id, hostel, ubicacion, precio){
      this.id = id,
      this.hostel = hostel,
      this.ubicacion = ubicacion,
      this.precio = precio
  }
  
  mostrarDatos(){
      console.log(`El Hostel ${this.hostel}, se encuentra ubicado en ${this.ubicacion} y su precio por noche es de ${this.precio}`)
      // alert(`El Hostel ${this.hostel}, se encuentra ubicado en ${this.ubicacion} y su precio por noche es de ${this.precio}`)
  }
}


//Instanciación de objetos

const hostel1 = new Accomodations(1, "Oryx", "Tulum", 2500)
const hostel2 = new Accomodations(2, "Che Hostel", "Holbox", 3000)
const hostel3 = new Accomodations(3, "Yak Lake", "Bacalar", 2300)
const hostel4 = new Accomodations(4, "Moloch", "Cancun", 4000)
const hostel5 = new Accomodations(5, "Barrio Vivo", "Merida", 3500)