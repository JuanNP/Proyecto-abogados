const contenedorCasos = document.getElementById('tbodyCasos')

const modalTiposCasos = new bootstrap.Modal(document.getElementById('modalTiposCasos'))
const formTiposCasos = document.getElementById('formTiposCasos')

const id2 = getNewId2();
const casos = document.getElementById('casos')

let opcion = ''

btnCrearCasos.addEventListener('click', ()=>{
    casos.value = ''
    modalTiposCasos.show()
    opcion = 'crear'
})

formTiposCasos.addEventListener('submit', (e)=>{
    if(opcion == 'crear'){
        console.log("CREAR")
        crear2()
    }
    
})

function getNewId2(){
    let lastId2 = localStorage.getItem("lastId2") || "-1";
    let newId2 = JSON.parse(lastId2) + 1;
    localStorage.setItem("lastId2", JSON.stringify(newId2))
    return newId2;
}

function crear2(){
    Valorid2 = id2
    Valorcasos = casos.value
      
    let Tipocaso = {
        Valorid2,
        Valorcasos
    }

    if(localStorage.getItem("TiposCasos") === null){
        let Tiposcasos = []
        Tiposcasos.push(Tipocaso)
        localStorage.setItem("TiposCasos",JSON.stringify(Tiposcasos))

    }else{
        let Tiposcasos = JSON.parse(localStorage.getItem("TiposCasos"))
        Tiposcasos.push(Tipocaso)
        localStorage.setItem("TiposCasos",JSON.stringify(Tiposcasos))
    }
    formTiposCasos.reset();
    modalTiposCasos.hide()
}

function leer2(){
    let Tiposcasos = JSON.parse(localStorage.getItem("TiposCasos"));
    document.getElementById("tbodyCasos").innerHTML = ""
    for(let i=0; i < Tiposcasos.length; i++){
        let id2 = Tiposcasos[i].Valorid2
        let casos = Tiposcasos[i].Valorcasos

        document.getElementById("tbodyCasos").innerHTML += 
        `<tr>
            <td>${casos}</td>
            <td class= "text-center"><button onclick='eliminar2(${id2})' class="btn btn-danger">Eliminar</button></td>
        </tr>`
    }
}

function eliminar2(Valorid2){
    let Tiposcasos = JSON.parse(localStorage.getItem("TiposCasos"))
    let IndexInArray = Tiposcasos.findIndex(element => element.Valorid2 === Valorid2)
    Tiposcasos.splice(IndexInArray, 1)
    localStorage.setItem("TiposCasos", JSON.stringify(Tiposcasos))
    leer2();

}

leer2();