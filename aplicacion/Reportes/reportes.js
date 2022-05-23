const contenedor = document.querySelector('tbody')

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
            <td class= "text-center"><button onclick='imprimir()' class="btnImprimir btn btn-primary">Imprimir</button></td>
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

function imprimir(){
    on(document, 'click', '.btnImprimir', e => {
        console.log("funciono")
        const fila = e.target.parentNode.parentNode
        const fechaForm = fila.children[0].innerHTML
        const clienteForm = fila.children[1].innerHTML
        const tipoCasoForm = fila.children[2].innerHTML
        const descripcionForm = fila.children[3].innerHTML
        const abogadoForm = fila.children[4].innerHTML
        const estadoForm = fila.children[5].innerHTML
        var ventana = window.open('', 'PRINT', 'height=400,width=600');
        var almacen = "<html><head><link href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3' crossorigin='anonymous'><title>Casos</title></head><body><div class='container mt-4 shadow-lg p-3 mb-5 bg-body rounded'><table class='table mt-2 table-bordered table-striped'>";
            /*Primero los encabezados con th, en un tr*/
            almacen += "<tr>";
            almacen += "<th scope='col'>Fecha</th>";
            almacen += "<th scope='col'>Cliente</th>";
            almacen += "<th scope='col'>Tipo</th>";
            almacen += "<th scope='col'>Descripcion</th>";
            almacen += "<th scope='col'>Abogado</th>";
            almacen += "<th scope='col'>Estado</th>";
            almacen += "</tr>";
            /*Ahora cada fila con td, dentro de un tr*/
            almacen += "<tr>";
            almacen += `<td>${fechaForm}</td>`;
            almacen += `<td>${clienteForm}</td>`;
            almacen += `<td>${tipoCasoForm}</td>`;
            almacen += `<td>${descripcionForm}</td>`;
            almacen += `<td>${abogadoForm}</td>`;
            almacen += `<td>${estadoForm}</td>`;
            almacen += "</tr>";
            almacen += "</table></div><script src='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js' integrity='sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p' crossorigin='anonymous'></script></body></html>";
            ventana.document.write(almacen);
        ventana.document.close();
        ventana.focus();
        ventana.print();
        ventana.close();
        return true;
    })


}

leer();