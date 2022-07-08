var express = require('express');
var mysql = require('mysql');
var cors = require('cors');

var app = express();
app.use(express.json());
app.use(cors());

//Parámetros de conexión
var conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'finalwebdb'
});

conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log("Conexion exitosa a la base de datos!!");
    }
});

app.get('/', function(req, res){
    res.send('Ruta INICIO');
})

//mostrar los clientes
app.get('/api/clientes', (req,res)=>{
    conexion.query('SELECT * FROM clientes', (error,filas)=>{
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    })
});

//mostrar un SOLO cliente
app.get('/api/clientes/:id', (req,res)=>{
    conexion.query('SELECT * FROM clientes WHERE id = ?', [req.params.id], (error,fila)=>{
        if(error){
            throw error;
        }else{
            res.send(fila);
            //res.send(fila[0].nombre)
        }
    })
});
//Crear un cliente
app.post('/api/clientes', (req,res)=>{
    let data = {cedula:req.body.cedula, nombre:req.body.nombre, apellido:req.body.apellido, correo:req.body.correo, telefono:req.body.telefono, celular:req.body.celular, direccion:req.body.direccion, estadocivil:req.body.estadocivil};
    let sql = "INSERT INTO clientes SET ?";
    conexion.query(sql, data, function(error,result){
        if(error){
            throw error;
        }else{
            Object.assign(data, {id: result.insertId })
            res.send(data);
        }
    })
});

//Editar cliente
app.put('/api/clientes/:id', (req,res)=>{
    let id = req.params.id;
    let cedula = req.body.cedula;
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let correo = req.body.correo;
    let telefono = req.body.telefono;
    let celular = req.body.celular;
    let direccion = req.body.direccion;
    let estadocivil = req.body.estadocivil;
    let sql = "UPDATE clientes SET cedula = ? ,nombre = ? ,apellido = ? ,correo = ? ,telefono = ? ,celular = ? ,direccion = ? ,estadocivil = ? WHERE id = ?";
    conexion.query(sql, [cedula, nombre, apellido, correo, telefono, celular, direccion, estadocivil, id], function(error,results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    });

});

//Eliminar cliente
app.delete('/api/clientes/:id', (req,res)=>{
    conexion.query('DELETE FROM clientes WHERE id = ?', [req.params.id], function(error,filas){
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    });
});

const puerto = process.env.PUERTO || 3000;

app.listen(puerto,function(){
    console.log("Servidor OK en puerto:"+puerto);
});