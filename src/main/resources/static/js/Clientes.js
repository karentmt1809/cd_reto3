//////////////////////Clientes//////////////////////////////////

traerInformacionClientes();

traerInformacionComputers();

var idClient=0;

async function traerInformacionClientes(){
    $.ajax({
        url:"http://144.22.58.14:80800/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            psarDatosClientesMen(respuesta);
            psarDatosClientesReser(respuesta);
            pintarRespuestaClientes(respuesta);
        }
    });
}


function pintarRespuestaClientes(respuesta){

    var myTable =`<table border="1" class="table table-dark table-striped">
    <tr>
      <th>Email</th>
      <th>Contraseña</th>
      <th>Nombre</th>
      <th>Edad</th>
      <th colspan="2">Acciones</th>
    </tr>`;
    for(i=0;i<respuesta.length;i++){
        myTable+=`<tr>
        <td>${respuesta[i].email}</td>
        <td>${respuesta[i].password}</td>
        <td>${respuesta[i].name}</td>
        <td>${respuesta[i].age}</td>
        <td><button onclick="editarRegistroClientes(${respuesta[i].idClient})" class="btn btn-outline-success">Editar</td>
        <td><button onclick="borrarClientes(${respuesta[i].idClient})" class="btn btn-outline-danger">Borrar</td> 

    </tr>`;
    }
    myTable+='</table>';
    $("#resultado3").html(myTable);
}

function guardarInformacionClientes(){
    if($("#CLemail").val()== "" || $("#CLpassword").val()=="" 
            || $("#CLname").val()==""|| $("#CLage").val()==""){
        alert("¡¡ ERROR !! Todos los campos son Obligatorios")
    }else{ 
        let var4 = {
            email:$("#CLemail").val(),
            password:$("#CLpassword").val(),
            name:$("#CLname").val(),
            age:$("#CLage").val(),
        };
        
            $.ajax({
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var4),
            
            url:"http://144.22.58.14:8080/api/Client/save",
        
            
            success:function(response) {
                console.log(response);
                console.log("Se guardo correctamente");
                alert("Se guardo correctamente");
                traerInformacionClientes();
        
            },
            
            error: function(jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se guardo correctamente");
        
        
            }
            });

            $("#CLemail").val(""),
            $("#CLpassword").val(""),
            $("#CLname").val(""),
            $("#CLage").val("")
    }
}

function borrarClientes(clienteId) {
    var datos={
        id:clienteId
    }

    let datosPeticion=JSON.stringify(datos);

    $.ajax({
        url:"http://144.22.58.14:8080/api/Client/"+clienteId ,
        type:"DELETE",
        data:datosPeticion,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta) {
            $("#resultado").empty();
            traerInformacionClientes();
            alert("Se ha eliminado.") 
            console.log("Se ha eliminada.")       
        },
        error:function(xhr,status){
            console.log(status);
        }
    });
    
}

$("Retos").ready(function(){
    $("#btnActualizarClientes").hide();

})

async function editarRegistroClientes(clienteId) {
    $("#btnActualizarClientes").show();
    $("#btnConsultarClientes").hide();
    $("#btnGuardarClientes").hide();

    var datos={
        id:clienteId
    }
    idClient= clienteId;
    console.log(idClient); 
    $.ajax({
        url:"http://144.22.58.14:8080/api/Client/" + clienteId,
        type:'GET',
        dataType:'json',

        success:function(respuesta){  
            console.log(respuesta);
            
            $("#CLemail").val(respuesta.email),
            $("#CLpassword").val(respuesta.password),
            $("#CLname").val(respuesta.name),
            $("#CLage").val(respuesta.age) 
          
        },

        error:function(xhr,status){
            console.log(status); 
        }

    });

    

 
}
 
async function actualizarInformacionClientes(){
    if($("#CLemail").val()== "" || $("#CLpassword").val()=="" 
            || $("#CLname").val()==""|| $("#CLage").val()==""){
        alert("¡¡ ERROR !! Todos los campos son Obligatorios")
    }else{ 

        let var4 = {
            "idClient":idClient,  
            "name":$("#CLname").val(),
            "email":$("#CLemail").val(),
            "password":$("#CLpassword").val(),
            "age:":parseInt($("#CLage").val()),
            };
            console.log(var4)
            $.ajax({
            type:'PUT',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var4),
            
            url:"http://144.22.58.14:8080/api/Client/update",
        
            
            success:function(response) {
                console.log(response);
                console.log("Se actualizó correctamente");
                alert("Se actualizó  correctamente");
                traerInformacionClientes();
        
            },
            
            error: function(jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se actualizó correctamente");
        
        
            }
            });

    $("#btnActualizarClientes").hide();
    $("#btnConsultarClientes").show();
    $("#btnGuardarClientes").show(),
    $("#CLname").val(""),
    $("#CLemail").val(""),
    $("#CLpassword").val(""),
    $("#CLage").val("")

        }
    

}
