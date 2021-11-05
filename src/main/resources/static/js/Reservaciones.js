//////////////////////Reservaciones//////////////////////////////////
traerInformacionComputers();
traerInformacionClientes();
var idclientepasar =0;
var reservaciones = [];
var idCate=0;
async function traerInformacionReservaciones(){
    $.ajax({
        url:"http://144.22.58.14:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaReservaciones(respuesta);
        }
    });
}

function pintarRespuestaReservaciones(respuesta){
    var myTable =`<table border="1" class="table table-dark table-striped">
    <tr>
      <th>Fecha Inicio</th>
      <th>Fecha Entrega</th>
      <th>Computador</th>
      <th>Cliente</th>
      <th>Estado</th>
      <th colspan="2">Acciones</th>
    </tr>`;

 

    for(i=0;i<respuesta.length;i++){
        myTable+=`<tr>
            <td>${respuesta[i].startDate}</td>
            <td>${respuesta[i].devolutionDate}</td> 
            <td>${respuesta[i].computer.name}</td> 
            <td>${respuesta[i].client.name}</td> 
            <td>${respuesta[i].status}</td> 
            <td><button onclick="editarRegistroReservaciones(${respuesta[i].idReservation})"class="btn btn-outline-success">Editar</td>
            <td><button onclick="borrarReservaciones(${respuesta[i].idReservation})"class="btn btn-outline-danger">Borrar</td>         
        </tr>
    `;
    }
    myTable+="</table>";
    $("#resultado5").html(myTable);
}
function psarDatosClientesReser(respuesta){
    $("#selectidclientreser").empty()
    $("#selectidclientreser").append('<option value="0" selected>Seleccionar Cliente</option>')
    for (var i = 0;i< respuesta.length; i++) {
        $("#selectidclientreser").append("<option value="+respuesta[i].idClient+">"+respuesta[i].name+"</option>")
     }
}
function psarDatosComputerReser(respuesta){
    $("#selectidcomputereser").empty()
    $("#selectidcomputereser").append('<option value="0" selected>Seleccionar Computador</option>')
    for (var i = 0;i< respuesta.length; i++) {
        $("#selectidcomputereser").append("<option value="+respuesta[i].id+">"+respuesta[i].name+"</option>")
     }
}


function guardarInformacionReservaciones(){
    if($("#R_Fecha_inicio").val()== "" || $("#R_Fecha_entrega").val()=="" 
            || $("#selectstatus").val()=="" || $("#selectidclientreser").val()==""
            || $("#selectidcomputereser").val()==""){
        alert("¡¡ ERROR !! Todos los campos son Obligatorios")
    }else{ 
        let var3 = {"startDate":$("#R_Fecha_inicio").val(),
                    "devolutionDate":$("#R_Fecha_entrega").val(),
                    "status":$("#selectstatus").val(),
                    "client":{"idClient":$("#selectidclientreser").val()}, 
                    "computer":{"id":$("#selectidcomputereser").val()} 
                }
            console.log(var3)
            $.ajax({
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var3),
            
            url:"http://144.22.58.14:8080/api/Reservation/save",
        
            
            success:function(response) {
                console.log(response);
                console.log("Se guardo correctamente");
                alert("Se guardo correctamente");
                traerInformacionReservaciones();
        
            },
            
            error: function(jqXHR, textStatus, errorThrown) {
                alert("No se guardo correctamente");
        
        
            }
            });

            $("#selectidcomputereser").val(), 
            $("#selectidclientreser").val(""),
            $("#R_Fecha_inicio").val(""),
            $("#R_Fecha_entrega").val("")
    }  

}

function borrarReservaciones(reservationId) {
    var datos={
        id:reservationId
    }

    let datosPeticion=JSON.stringify(datos);

    $.ajax({
        url:"http://144.22.58.14:8080/api/Reservation/"+reservationId ,
        type:"DELETE",
        data:datosPeticion,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta) {
            $("#resultado").empty();
            traerInformacionReservaciones();
            alert("Se ha eliminado.")        
        },
        error:function(xhr,status){
            console.log(status);
        }
    });
    
}

$("Retos").ready(function(){
    $("#btnActualizarReservaciones").hide(); 

})

async function editarRegistroReservaciones(reservationId) {
    $("#btnActualizarReservaciones").show();
    $("#btnConsultarReservaciones").hide();
    $("#btnGuardarReservaciones").hide();
    $("#selectidcomputereser").hide(), 
    $("#selectidclientreser").hide()

    var datos={
        id:reservationId
    }
    idCate= reservationId;
    console.log(reservationId); 
    $.ajax({
        url:"http://144.22.58.14:8080/api/Reservation/" + reservationId,
        type:'GET',
        dataType:'json',

        success:function(respuesta){
            
            console.log(respuesta);
            
            var fechainicio = "";
            var fechafin ="";
            for (var i=0; i< respuesta.startDate.length;i++){
                var datosini= respuesta.startDate.charAt(i)
                var datosfin= respuesta.devolutionDate.charAt(i)
                if(datosini=="T"){
                    break;
                }
                fechainicio+=datosini;
                fechafin+=datosfin;
            }
            
            respuesta.startDate= fechainicio;
            respuesta.devolutionDate=fechafin;
            

            $("#R_Fecha_inicio").val(respuesta.startDate),
            $("#R_Fecha_entrega").val(respuesta.devolutionDate),
            $("#selectstatus").val(respuesta.status)
        
            reservaciones = respuesta; 
            
        },

        error:function(xhr,status){
            console.log(status);
        }

    });

    

 
}


function actualizarInformacionReservaciones(){
    if($("#R_Fecha_inicio").val()== "" || $("#R_Fecha_entrega").val()=="" 
    || $("#selectstatus").val()=="" || $("#selectidclientreser").val()==""
    || $("#selectidcomputereser").val()==""){
        alert("¡¡ ERROR !! Todos los campos son Obligatorios")
    
    }else{

    let var5 = {

                "idReservation":idCate,
                "startDate":$("#R_Fecha_inicio").val(),
                "devolutionDate":$("#R_Fecha_entrega").val(),
                "status":$("#selectstatus").val()
                
            }
            console.log(var5)
        $.ajax({
        type:'PUT',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var5),
        
        url:"http://144.22.58.14:8080/api/Reservation/update",
       
        
        success:function(reservaciones) {
            console.log(reservaciones); 
            console.log("Se actualizó correctamente");
            alert("Se actualizó correctamente");
            traerInformacionReservaciones();
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(reservaciones);
            alert("No se actualizócorrectamente");
    
    
        }
        });

        $("#btnActualizarReservaciones").hide();
        $("#btnConsultarReservaciones").show();
        $("#btnGuardarReservaciones").show(),
        $("#selectidcomputereser").show(), 
        $("#selectidclientreser").show(),
        $("#R_Fecha_inicio").val(""),
        $("#R_Fecha_entrega").val("")
    }

}






