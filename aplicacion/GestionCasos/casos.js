const contenedor = document.querySelector('tbody')

const modalCasos = new bootstrap.Modal(document.getElementById('modalCasos'))
const formCasos = document.querySelector('form')

const id = getNewId();
const fecha = document.getElementById('fecha')
const cliente = document.getElementById('cliente')
const tipoCaso = document.getElementById('tipoCaso')
const descripcion = document.getElementById('descripcion')
const abogado = document.getElementById('abogado')
const estado = document.getElementById('estado')


let opcion = ''

btnCrear.addEventListener('click', ()=>{
    fecha.value = ''
    cliente.value = ''
    tipoCaso.value = ''
    descripcion.value = ''
    abogado.value = ''
    estado.value = ''
    modalCasos.show()
    opcion = 'crear'
})

formCasos.addEventListener('submit', (e)=>{
    if(opcion == 'crear'){
        console.log("CREAR")
        crear()
    }
    
})

function getNewId(){
    let lastId = localStorage.getItem("lastId") || "-1";
    let newId = JSON.parse(lastId) + 1;
    localStorage.setItem("lastId", JSON.stringify(newId))
    return newId;
}

function crear(){
    Valorid = id
    Valorfecha = fecha.value
    Valorcliente = cliente.value
    ValortipoCaso = tipoCaso.value
    Valordescripcion = descripcion.value
    Valorabogado = abogado.value
    Valorestado = estado.value

    let caso = {
        Valorid,
        Valorfecha,
        Valorcliente,
        ValortipoCaso,
        Valordescripcion,
        Valorabogado,
        Valorestado
    }

    if(localStorage.getItem("Casos") === null){
        let casos = []
        casos.push(caso)
        localStorage.setItem("Casos",JSON.stringify(casos))

    }else{
        let casos = JSON.parse(localStorage.getItem("Casos"))
        casos.push(caso)
        localStorage.setItem("Casos",JSON.stringify(casos))
    }
    formCasos.reset();
    modalCasos.hide()
    e.preventDefault()
}


function leer(){
    let casos = JSON.parse(localStorage.getItem("Casos"));
    document.getElementById("tbody").innerHTML = ""
    for(let i=0; i < casos.length; i++){
        let id = casos[i].Valorid
        let fecha = casos[i].Valorfecha
        let cliente = casos[i].Valorcliente
        let tipoCaso = casos[i].ValortipoCaso
        let descripcion = casos[i].Valordescripcion
        let abogado = casos[i].Valorabogado
        let estado = casos[i].Valorestado

        document.getElementById("tbody").innerHTML += 
        `<tr>
            <td>${fecha}</td>
            <td>${cliente}</td>
            <td>${tipoCaso}</td>
            <td>${descripcion}</td>
            <td>${abogado}</td>
            <td>${estado}</td>
            <td class= "text-center"><button onclick='eliminar(${id})' class="btn btn-danger">Eliminar</button>
            <button onclick='editar(${id})' class="btnEditar btn btn-success" >Editar</button></td>
        </tr>`
    }
}

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

function editar(Valorid){
    console.log(Valorid)
    on(document, 'click', '.btnEditar', e => {
        const fila = e.target.parentNode.parentNode
        const fechaForm = fila.children[0].innerHTML
        const clienteForm = fila.children[1].innerHTML
        const tipoCasoForm = fila.children[2].innerHTML
        const descripcionForm = fila.children[3].innerHTML
        const abogadoForm = fila.children[4].innerHTML
        const estadoForm = fila.children[5].innerHTML
        fecha.value = fechaForm
        cliente.value = clienteForm
        tipoCaso.value = tipoCasoForm
        descripcion.value = descripcionForm
        abogado.value = abogadoForm
        estado.value = estadoForm
        opcion = 'editar'
        modalCasos.show()

        formCasos.addEventListener('submit', (e)=>{
            if(opcion == 'editar'){
                console.log("EDITAR")
                actualizar(Valorid)
            }
            
        })

    })
}


function actualizar(Valorid){
    let casos = JSON.parse(localStorage.getItem("Casos"));
    let IndexInArray = casos.findIndex(element => element.Valorid === Valorid)
    casos[IndexInArray].Valorfecha = fecha.value;
    casos[IndexInArray].Valorcliente = cliente.value;
    casos[IndexInArray].ValortipoCaso = tipoCaso.value;
    casos[IndexInArray].Valordescripcion = descripcion.value;
    casos[IndexInArray].Valorabogado = abogado.value;
    casos[IndexInArray].Valorestado = estado.value;
  
    localStorage.setItem("Casos", JSON.stringify(casos));
}

function eliminar(Valorid){
    let casos = JSON.parse(localStorage.getItem("Casos"))
    let IndexInArray = casos.findIndex(element => element.Valorid === Valorid)
    console.log(Valorid)
    casos.splice(IndexInArray, 1)
    localStorage.setItem("Casos", JSON.stringify(casos))
    leer();

}

function clientes(){
    let clientes = JSON.parse(localStorage.getItem("Clientes"))
    document.getElementById("cliente").innerHTML = ""
    for(let i=0; i < clientes.length; i++){
        let nombre = clientes[i].Valornombre
        let apellido = clientes[i].Valorapellido
        let nombreCompleto = nombre + " " + apellido
        document.getElementById("cliente").innerHTML +=
        `<option value="${nombreCompleto}">${nombreCompleto}</option>` 
    }
}

function tiposCasos(){
    let Tiposcasos = JSON.parse(localStorage.getItem("TiposCasos"))
    document.getElementById("tipoCaso").innerHTML = ""
    for(let i=0; i < Tiposcasos.length; i++){
        let casos = Tiposcasos[i].Valorcasos

        document.getElementById("tipoCaso").innerHTML +=
        `<option value="${casos}">${casos}</option>` 
    }
}

function estados(){
    let Tiposestados = JSON.parse(localStorage.getItem("TiposEstados"));
    document.getElementById("estado").innerHTML = ""
    for(let i=0; i < Tiposestados.length; i++){
        let estado = Tiposestados[i].Valorestado

        document.getElementById("estado").innerHTML +=
        `<option value="${estado}">${estado}</option>` 
    }
}

function abogados(){
    let usuarios = JSON.parse(localStorage.getItem("Usuarios"));
    document.getElementById("abogado").innerHTML = ""
    for(let i=0; i < usuarios.length; i++){
        let nombre = usuarios[i].Valornombre

        document.getElementById("abogado").innerHTML +=
        `<option value="${nombre}">${nombre}</option>` 
    }
}

abogados();
estados();
tiposCasos();
clientes();

leer();