function cerrar(){
    opcion = alertify.confirm('Está seguro que desea cerrar la página?').setHeader('<em> Salir </em> ');
    opcion.set('onok', function(){

        adios = alertify.alert('Salir', 'Vuelva pronto!! :)', function(){

            let newWindow = open(location, '_self');
        
        newWindow.close();
        });

        return true;
    });
}
