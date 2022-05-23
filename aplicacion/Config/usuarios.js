const contenedorUsuarios = document.getElementById('tbodyUsuarios')

const modalUsuarios = new bootstrap.Modal(document.getElementById('modalUsuarios'))
const formUsuarios = document.getElementById('formUsuarios')

const id3 = getNewId3();
const nombre = document.getElementById('nombre')
const usuario = document.getElementById('usuario')
const contraseña = document.getElementById('contraseña')
 


btnCrearUsuario.addEventListener('click', ()=>{
    nombre.value = ''
    usuario.value = ''
    contraseña.value = ''
    modalUsuarios.show()
    opcion = 'crear'
})

formUsuarios.addEventListener('submit', (e)=>{
    if(opcion == 'crear'){
        console.log("CREAR")
        crear3()
    }
    
})

function getNewId3(){
    let lastId3 = localStorage.getItem("lastId3") || "-1";
    let newId3 = JSON.parse(lastId3) + 1;
    localStorage.setItem("lastId3", JSON.stringify(newId3))
    return newId3;
}

function crear3(){
    Valorid3 = id3
    Valornombre = nombre.value
    Valorusuario = usuario.value
    Valorcontraseña = contraseña.value

    let Usuario = {
        Valorid3,
        Valornombre,
        Valorusuario,
        Valorcontraseña
    }

    if(localStorage.getItem("Usuarios") === null){
        let usuarios = []
        usuarios.push(Usuario)
        localStorage.setItem("Usuarios",JSON.stringify(usuarios))

    }else{
        let usuarios = JSON.parse(localStorage.getItem("Usuarios"))
        usuarios.push(Usuario)
        localStorage.setItem("Usuarios",JSON.stringify(usuarios))
    }
    formUsuarios.reset();
    modalUsuarios.hide()
}

function leer3(){
    let usuarios = JSON.parse(localStorage.getItem("Usuarios"));
    document.getElementById("tbodyUsuarios").innerHTML = ""
    for(let i=0; i < usuarios.length; i++){
        let id3 = usuarios[i].Valorid3
        let nombre = usuarios[i].Valornombre
        let usuario = usuarios[i].Valorusuario
        let contraseña = usuarios[i].Valorcontraseña

        document.getElementById("tbodyUsuarios").innerHTML += 
        `<tr>
            <td>${nombre}</td>
            <td>${usuario}</td>
            <td>${contraseña}</td>
            <td class= "text-center"><button onclick='eliminar3(${id3})' class="btn btn-danger">Eliminar</button>
            <button onclick='editar3(${id3})' class="btnEditar btn btn-success" >Editar</button></td>
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

function editar3(Valorid3){
    console.log(Valorid3)
    on(document, 'click', '.btnEditar', e => {
        const fila = e.target.parentNode.parentNode
        const nombreForm = fila.children[0].innerHTML
        const usuarioForm = fila.children[1].innerHTML
        const contraseñaForm = fila.children[2].innerHTML

        nombre.value = nombreForm
        usuario.value = usuarioForm
        contraseña.value = contraseñaForm

        opcion = 'editar'
        modalUsuarios.show()

        formUsuarios.addEventListener('submit', (e)=>{
            if(opcion == 'editar'){
                console.log("EDITAR")
                actualizar3(Valorid3)
            }
            
        })

    })
}


function actualizar3(Valorid3){
    let usuarios = JSON.parse(localStorage.getItem("Usuarios"));
    let IndexInArray = usuarios.findIndex(element => element.Valorid3 === Valorid3)
    usuarios[IndexInArray].Valornombre = nombre.value;
    usuarios[IndexInArray].Valorusuario = usuario.value;
    usuarios[IndexInArray].Valorcontraseña = contraseña.value;
  
    localStorage.setItem("Usuarios", JSON.stringify(usuarios));
}

function eliminar3(Valorid3){
    let usuarios = JSON.parse(localStorage.getItem("Usuarios"))
    let IndexInArray = usuarios.findIndex(element => element.Valorid3 === Valorid3)
    usuarios.splice(IndexInArray, 1)
    localStorage.setItem("Usuarios", JSON.stringify(usuarios))
    leer3();

}

leer3();