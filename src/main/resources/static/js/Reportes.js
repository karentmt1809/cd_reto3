function traerReporteStatus(){
    console.log("test");
    $.ajax({
        url:"http://144.22.58.14:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta){

    var myTable =`<table border="1" class="table table-dark table-striped">
    <tr>
      <th>Estado</th>
      <th>Completadas</th>
      <th>Canceladas</th>
    </tr>`;
    myTable+="<tr>";
        myTable+="<th>Total:</th>";
        myTable+="<td>"+respuesta.completed+"</td>";
        myTable+="<td>"+respuesta.cancelled+"</td>";
        myTable+="</tr>";
    myTable+="</table>";
    $("#resultadoStatus").html(myTable);
}

function traerReporteDate(){

    if($("#RstarDate").val()== "" || $("#RdevolutionDate").val()=="" ){
        alert("¡¡ ERROR !! Todos los campos son Obligatorios")
    }else{ 
    var fechaInicio = document.getElementById("RstarDate").value;
    var fechaCierre = document.getElementById("RdevolutionDate").value;
    console.log(fechaInicio);
    console.log(fechaCierre);

    $.ajax({
        url:"http://144.22.58.14:8080/api/Reservation/report-dates/"+fechaInicio+"/"+fechaCierre,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaDate(respuesta);
        }
    });
    }
}
function pintarRespuestaDate(respuesta){

    var myTable =`<table border="1" class="table table-dark table-striped">
    <tr>
      <th>Fecha de Inicio</th>
      <th>Fecha de Entrega</th>
      <th>Estado</th>
    </tr>`;
      
    for(i=0;i<respuesta.length;i++){
    
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
      
      
        myTable+="</tr>";
    }
    myTable+="<th>Total</th>";
    myTable+="<td>"+respuesta.length+"</td>";
    myTable+="<td>";
    myTable+="</table>";
    $("#resultadoDate").html(myTable);
}

function traerReporteClientes(){
    $.ajax({
        url:"http://144.22.58.14:8080/api/Reservation/report-clients",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaClientes(respuesta);
        }
    });
}
function pintarRespuestaClientes(respuesta){

    var myTable =`<table border="1" class="table table-dark table-striped">
    <tr>
      <th>Nombre del Cliente</th>
      <th>Correo del Cliente</th>
      <th>Edad del Cliente</th>
      <th>Total de reservas de este cliente</th>
    </tr>`;

    for(i=0;i<respuesta.length;i++){
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].client.email+"</td>";
        myTable+="<td>"+respuesta[i].client.age+"</td>";
        myTable+="<td>"+respuesta[i].total+"</td>";
        myTable+="</tr>";
    }
    myTable+="<th>Total de Clientes registrados en el sistema</th>";
    myTable+="<td>"+respuesta.length+"</td>";
    myTable+="<td>";
    myTable+="<td>";
    myTable+="</table>";
    $("#resultadoClientes").html(myTable);
}

