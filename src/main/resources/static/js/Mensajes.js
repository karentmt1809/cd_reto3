//////////////////////Mensajes//////////////////////////////////
traerInformacionComputers();
traerInformacionClientes();
 var mensajeid =0; 
 var computadores=[];
async function traerInformacionMensajes(){
    $.ajax({
        url:"http://144.22.58.14:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaMensajes(respuesta);
        }
    });
}

function pintarRespuestaMensajes(respuesta){
    var myTable =`<table border="1" class="table table-dark table-striped">
    <tr>
      <th>Mensaje</th>
      <th>Computador</th>
      <th>Cliente</th>
      <th colspan="2">Acciones</th>
    </tr>`;

    
    for(i=0;i<respuesta.length;i++){
        myTable+=`<tr>
        <td>${respuesta[i].messageText}</td>
        <td>${respuesta[i].computer.name}</td> 
        <td>${respuesta[i].client.name}</td> 
        <td><button onclick="editarRegistroMensajes(${respuesta[i].idMessage})" class="btn btn-outline-success">Editar</td>
        <td><button onclick="borrarMensajes(${respuesta[i].idMessage})"class="btn btn-outline-danger">Borrar</td>         
        </tr>
            `;
    }
    myTable+="</table>";
    $("#resultado4").html(myTable);
}
function psarDatosComputerMen(respuesta){
    $("#selectcomputermen").empty()
    $("#selectcomputermen").append('<option value="0" selected>Seleccionar Computador</option>')
    for (var i = 0;i< respuesta.length; i++) {
        $("#selectcomputermen").append("<option value="+respuesta[i].id+">"+respuesta[i].name+"</option>")
     }
}

function psarDatosClientesMen(respuesta){
    $("#selectclientmen").empty()
    $("#selectclientmen").append('<option value="0" selected>Seleccionar Cliente</option>')
    for (var i = 0;i< respuesta.length; i++) {
        $("#selectclientmen").append("<option value="+respuesta[i].idClient+">"+respuesta[i].name+"</option>")
     }
}
function guardarInformacionMensajes(){
    if($("#Mmensaje").val()== "" || $("#selectclientmen").val()=="" 
            || $("#selectcomputermen").val()==""){
        alert("¡¡ ERROR !! Todos los campos son Obligatorios")
    }else{ 
        let var3 = { "messageText":$("#Mmensaje").val(),
                    "client":{"idClient":$("#selectclientmen").val()}, 
                    "computer":{"id":$("#selectcomputermen").val()} 
            }
            $.ajax({
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var3),
            
            url:"http://144.22.58.14:8080/api/Message/save",
        
            
            success:function(response) {
                    console.log(response);
                console.log("Se guardo correctamente");
                alert("Se guardo correctamente");
                traerInformacionMensajes();
        
            },
            
            error: function(jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se guardo correctamente");
        
        
            }
            });

            $("#Mmensaje").val(""),
            $("#selectclientmen").val(""),
            $("#selectcomputermen").val("")
    }
}

function borrarMensajes(idMessage) {
    var datos={
        id:idMessage
    }

    let datosPeticion=JSON.stringify(datos);

    $.ajax({
        url:"http://144.22.58.14:8080/api/Message/"+idMessage ,
        type:"DELETE",
        data:datosPeticion,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta) {
            $("#resultado").empty();
            traerInformacionMensajes();
            alert("Se ha eliminado.")        
        },
        error:function(xhr,status){
            console.log(status);
        }
    });
    
}

$("Retos").ready(function(){
    $("#btnActualizarMensajes").hide();

})
 
async function editarRegistroMensajes(idMessage) {
    $("#btnActualizarMensajes").show();
    $("#btnConsultarMensajes").hide();
    $("#btnGuardarMensajes").hide();
    $("#selectcomputermen").hide();
    $("#selectclientmen").hide();
    var datos={
        id:idMessage
    }
    mensajeid= idMessage;
    console.log(idMessage); 
    $.ajax({
        url:"http://144.22.58.14:8080/api/Message/" + idMessage,
        type:'GET',
        dataType:'json',

        success:function(respuesta){
            
            console.log(respuesta);
            computadores= respuesta;
            $("#Mmensaje").val(respuesta.messageText),
            console.log( respuesta.computer.name);
            console.log(respuesta.client.name);
        },

        error:function(xhr,status){
            console.log(status);
        }

    });

}


function actualizarInformacionMensajes(){
    if($("#Mmensaje").val()== "" || $("#selectclientmen").val()=="" 
            || $("#selectcomputermen").val()==""){
        alert("¡¡ ERROR !! Todos los campos son Obligatorios")
    }else{ 
        let var3 = {
                    "idMessage":mensajeid, 
                    "messageText":$("#Mmensaje").val(),
                    "client":computadores.client, 
                    "computer":computadores.computer 
                }
            $.ajax({
            type:'PUT',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var3),
            
            url:"http://144.22.58.14:8080/api/Message/update",
        
            
            success:function(response) {
                    console.log(response);
                console.log("Se actualizó correctamente");
                alert("Se actualizó correctamente");
                traerInformacionMensajes();
        
            },
            
            error: function(jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se actualizó correctamente");
        
        
            }
            });

        $("#btnActualizarMensajes").hide();
        
        $("#btnConsultarMensajes").show();
        $("#btnGuardarMensajes").show(),
        $("#Mmensaje").val(""),
        $("#selectcomputermen").show(),
        $("#selectclientmen").show()
    }


}
