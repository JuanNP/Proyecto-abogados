const contenedorEstados = document.getElementById('tbodyEstados')

const modalEstados = new bootstrap.Modal(document.getElementById('modalEstados'))
const formEstados = document.getElementById('formEstados')

const id1 = getNewId1();
const estado = document.getElementById('estado')



btnCrearEstados.addEventListener('click', ()=>{
    estado.value = ''
    modalEstados.show()
    opcion = 'crear'
})

formEstados.addEventListener('submit', (e)=>{
    if(opcion == 'crear'){
        console.log("CREAR")
        crear1()
    }
    
})

function getNewId1(){
    let lastId1 = localStorage.getItem("lastId1") || "-1";
    let newId1 = JSON.parse(lastId1) + 1;
    localStorage.setItem("lastId1", JSON.stringify(newId1))
    return newId1;
}

function crear1(){
    Valorid1 = id1
    Valorestado = estado.value
      
    let Tipoestado = {
        Valorid1,
        Valorestado
    }

    if(localStorage.getItem("TiposEstados") === null){
        let Tiposestados = []
        Tiposestados.push(Tipoestado)
        localStorage.setItem("TiposEstados",JSON.stringify(Tiposestados))

    }else{
        let Tiposestados = JSON.parse(localStorage.getItem("TiposEstados"))
        Tiposestados.push(Tipoestado)
        localStorage.setItem("TiposEstados",JSON.stringify(Tiposestados))
    }
    formEstados.reset();
    modalEstados.hide()
}

function leer1(){
    let Tiposestados = JSON.parse(localStorage.getItem("TiposEstados"));
    document.getElementById("tbodyEstados").innerHTML = ""
    for(let i=0; i < Tiposestados.length; i++){
        let id1 = Tiposestados[i].Valorid1
        let estado = Tiposestados[i].Valorestado

        document.getElementById("tbodyEstados").innerHTML += 
        `<tr>
            <td>${estado}</td>
            <td class= "text-center"><button onclick='eliminar1(${id1})' class="btn btn-danger">Eliminar</button></td>
        </tr>`
    }
}

function eliminar1(Valorid1){
    let Tiposestados = JSON.parse(localStorage.getItem("TiposEstados"))
    let IndexInArray = Tiposestados.findIndex(element => element.Valorid1 === Valorid1)
    Tiposestados.splice(IndexInArray, 1)
    localStorage.setItem("TiposEstados", JSON.stringify(Tiposestados))
    leer1();

}

leer1();