//////////////////////Reservaciones//////////////////////////////////
traerInformacionComputers();
traerInformacionClientes();
var idclientepasar =0;
var reservaciones = [];
async function traerInformacionReservaciones(){
    $.ajax({
        url:"http://localhost:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaReservaciones(respuesta);
        }
    });
}

function pintarRespuestaReservaciones(respuesta){
    var myTable =`<table border="1">
    <tr>
      <th>Fecha Inicio</th>
      <th>Fecha Entrega</th>
      <th>Computador</th>
      <th>Cliente</th>
      <th colspan="2">Acciones</th>
    </tr>`;

 

    for(i=0;i<respuesta.length;i++){
        myTable+=`<tr>
            <td>${respuesta[i].startDate}</td>
            <td>${respuesta[i].devolutionDate}</td> 
            <td>${respuesta[i].computer.name}</td> 
            <td>${respuesta[i].client.name}</td> 
            <td><button onclick="editarRegistroReservaciones(${respuesta[i].idReservation})">Editar</td>
            <td><button onclick="borrarReservaciones(${respuesta[i].idReservation})">Borrar</td>         
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
    
    let var3 = {"startDate":$("#R_Fecha_inicio").val(),
                "devolutionDate":$("#R_Fecha_entrega").val(),
                "client":{"idClient":$("#selectidclientreser").val()}, 
                "computer":{"id":$("#selectidcomputereser").val()} 
            }
        console.log(var3)
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var3),
        
        url:"http://localhost:8080/api/Reservation/save",
       
        
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

function borrarReservaciones(reservationId) {
    var datos={
        id:reservationId
    }

    let datosPeticion=JSON.stringify(datos);

    $.ajax({
        url:"http://localhost:8080/api/Reservation/"+reservationId ,
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


async function editarRegistroReservaciones(reservationId) {
    $("#btnActualizarReservaciones").show();
    $("#btnConsultarReservaciones").hide();
    $("#btnGuardarReservaciones").hide();
    $("#selectidcomputereser").hide(), 
    $("#selectidclientreser").hide()
    // $("#btnConsultarC").hide();
    // $("#numIdC").prop('disabled',true);
    // $("#numIdC").focus(); 
    var datos={
        id:reservationId
    }
    idCate= reservationId;
    console.log(reservationId); 
    $.ajax({
        url:"http://localhost:8080/api/Reservation/" + reservationId,
        type:'GET',
        dataType:'json',

        success:function(respuesta){
            // var items=respuesta.items;
            
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
            reservaciones = respuesta; 

            $("#R_Fecha_inicio").val(respuesta.startDate),
            $("#R_Fecha_entrega").val(respuesta.devolutionDate)

        },

        error:function(xhr,status){
            console.log(status);
        }

    });

    

 
}


function actualizarInformacionReservaciones(){


    let var5 = {

                "idReservation":idCate,
                "startDate":$("#R_Fecha_inicio").val(),
                "devolutionDate":$("#R_Fecha_entrega").val(), 
                "client": reservaciones.client, 
                "computer": reservaciones.computer
            }
            console.log(var5)
        $.ajax({
        type:'PUT',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var5),
        
        url:"http://localhost:8080/api/Reservation/update",
       
        
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






