// variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners() {
//cuando agregas un curso presionando "agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

//elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

//VACIAR EL CARRITO
vaciarCarritoBtn.addEventListener('click', () => {
    articulosCarrito = []; //reseteamos el arreglo

    limpiarHTML(); //eliminamos todo el HTML
})
}

//funciones
function agregarCurso(e) {
    e.preventDefault();//apra qu eno suba a la pagina mas arriba

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatosCurso(cursoSeleccionado);
    }   
}

//elimina un curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')){
         const cursoId = e.target.getAttribute('data-id');

         //elimina del arreglo de articulosCarrito pot rl data-id
         articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

         carritoHTML(); //iterar sobre el carrito y mostrar su HTML
    }
}



//lee el contenido del HTML al qu ele dimos click y extrae la informacion del curso

function leerDatosCurso(curso) {
   // console.log(curso);


    //crear unn obejto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
     if(existe) {
         //actualiza la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;//retorna el objeto actualizado
            } else {
                return curso;//retorna los objetos que no son duplicados
            }
        });
        articulosCarrito = [...cursos];

     } else{
         //agregamos el curso al carrito
          articulosCarrito = [...articulosCarrito, infoCurso]
     }



   //agregar elementos al arreglo de carrito
  
   console.log(articulosCarrito);

   carritoHTML();
}

//muestra el carrito de compras en el HTML
function carritoHTML() {

    //limpiar el HTML, para que no se repita el pedido automaticamente
    limpiarHTML();


    //recorre el carrito y genera el HTML
    articulosCarrito.forEach((curso) => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `

        <td>
            <img src="${imagen}" width="100">
        </td>

        <td>${titulo}</td>

        <td>${precio}</td>

        <td>${cantidad}</td>

        <td> 
            <a href="#" class="borrar-curso" data-id="${id}" > X </a> </td>
        `;

   // agregar el HTML del carrito en el body
    contenedorCarrito.appendChild(row);     
    })
}


//elimina los cursos del tbody
function limpiarHTML() {//FORMA LENTA
    //contenedorCarrito.innerHTML = '';

while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    
}

}