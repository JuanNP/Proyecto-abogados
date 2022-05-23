const url = 'http://localhost:3000/api/clientes/'
const contenedor = document.querySelector('tbody')
let resultados = ''

const modalCliente = new bootstrap.Modal(document.getElementById('modalCliente'))
const formCliente = document.querySelector('form')
const cedula = document.getElementById('cedula')
const nombre = document.getElementById('nombre')
const apellido = document.getElementById('apellido')
const correo = document.getElementById('correo')
const tel = document.getElementById('tel')
const cel = document.getElementById('cel')
const dir = document.getElementById('dir')
const estado = document.getElementById('estado')

let opcion = ''

btnCrear.addEventListener('click', ()=>{
    cedula.value = ''
    nombre.value = ''
    apellido.value = ''
    correo.value = ''
    tel.value = ''
    cel.value = ''
    dir.value = ''
    estado.value = ''
    modalCliente.show()
    opcion = 'crear'
})

//Funcion para mostrar resultados
const mostrar = (clientes) => {
    clientes.forEach(cliente => {
        resultados += `<tr> 
                            <td>${cliente.id}</td>
                            <td>${cliente.cedula}</td>
                            <td>${cliente.nombre}</td>
                            <td>${cliente.apellido}</td>
                            <td>${cliente.correo}</td>
                            <td>${cliente.telefono}</td>
                            <td>${cliente.celular}</td>
                            <td>${cliente.direccion}</td>
                            <td>${cliente.estadocivil}</td>
                            <td class= "text-center"><button class="btnEliminar btn btn-danger">Eliminar</button>
                            <button class="btnEditar btn btn-success" >Editar</button></td>
                        </tr>
                    `
    });
    contenedor.innerHTML = resultados
}

//Pocedimiento mostrar 
fetch(url)
    .then( response => response.json() )
    .then( data => mostrar(data) )
    .catch( error => console.log(error) )



const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

//Eliminar
on(document, 'click', '.btnEliminar', e =>{
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    
    alertify.confirm("Estás seguro que desea eliminar esta fila??",
    function(){
        fetch(url+id, {
            method: 'DELETE'
        })
        .then( res => res.json() )
        .then( ()=> location.reload() )
    },
    function(){
        alertify.error('Cancelado');
    });
})

let idForm = 0
//Procedimiento editar
on(document, 'click', '.btnEditar', e => {
    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML
    const cedulaForm = fila.children[1].innerHTML
    const nombreForm = fila.children[2].innerHTML
    const apellidoForm = fila.children[3].innerHTML
    const correoForm = fila.children[4].innerHTML
    const telForm = fila.children[5].innerHTML
    const celForm = fila.children[6].innerHTML
    const dirForm = fila.children[7].innerHTML
    const estadoForm = fila.children[8].innerHTML
    cedula.value = cedulaForm
    nombre.value = nombreForm
    apellido.value = apellidoForm
    correo.value = correoForm
    tel.value = telForm
    cel.value = celForm
    dir.value = dirForm
    estado.value = estadoForm
    opcion = 'editar'
    modalCliente.show()
    
});

formCliente.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(opcion == 'crear'){
        //console.log("CREAR")
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                cedula:cedula.value,
                nombre:nombre.value,
                apellido:apellido.value,
                correo:correo.value,
                telefono:tel.value,
                celular:cel.value,
                direccion:dir.value,
                estadocivil:estado.value
            })
        })
        .then( response => response.json() )
        .then( data => {
            const nuevoCliente = []
            nuevoCliente.push(data)
            mostrar(nuevoCliente)
        })

    }
    if(opcion == 'editar'){
        fetch(url+idForm, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                cedula:cedula.value,
                nombre:nombre.value,
                apellido:apellido.value,
                correo:correo.value,
                telefono:tel.value,
                celular:cel.value,
                direccion:dir.value,
                estadocivil:estado.value
            })
        })
        .then( response => response.json() )
        .then( response => location.reload() )
    }
    modalCliente.hide()
})
