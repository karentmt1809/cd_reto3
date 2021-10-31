///////////////////COMPUTER//////////////////////////////////////
traerInformacionCategoriasCom();
traerInformacionComputers();
var computadorid = 0; 
var catecompu=[];
async function traerInformacionComputers(){
    $.ajax({
        url:"http://localhost:8080/api/Computer/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            psarDatosComputerMen(respuesta);
            psarDatosComputerReser(respuesta);
            // computadores=respuesta;
            pintarRespuestaComputers(respuesta);
        }
    });
}
function psarDatosCategoriasCom(respuesta){
    $("#selectcategoriacom").empty()
    $("#selectcategoriacom").append('<option value="0" selected>Seleccionar Categoria</option>')
    for (var i = 0;i< respuesta.length; i++) {
        $("#selectcategoriacom").append("<option value="+respuesta[i].id+">"+respuesta[i].name+"</option>")
     }
}
function pintarRespuestaComputers(respuesta){
    var myTable =`<table border="1">
    <tr>
      <th>Nombre</th>
      <th>Marca</th>
      <th>Año</th>
      <th>Descripción</th>
      <th>Categoria</th>
      <th colspan="2">Acciones</th>
    </tr>`;
    console.log(respuesta)
    for(i=0;i<respuesta.length;i++){
        myTable+=`<tr>
        <td>${respuesta[i].name}</td> 
        <td>${respuesta[i].brand}</td> 
        <td>${respuesta[i].year}</td> 
        <td>${respuesta[i].description}</td> 
        <td>${respuesta[i].category.name}</td>
        <td><button onclick="editarRegistroC(${respuesta[i].id})">Editar</td>
        <td><button onclick="borrarC(${respuesta[i].id})">Borrar</td>         
    </tr>
`
    }
    myTable+="</table>";
    $("#resultado2").html(myTable);
}


function guardarInformacionComputers(){

    let var3 = {"brand":$("#Combrand").val(),
                "year":parseInt($("#Comyear").val()),
                "category":{"id":$("#selectcategoriacom").val()},
                "name":$("#Comname").val(),
                "description":$("#Comdescription").val()}
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var3),
        
        url:"http://localhost:8080/api/Computer/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            traerInformacionComputers();
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("No se guardo correctamente");
    
    
        }
        });

        $("#Comname").val(""),
        $("#Combrand").val(""),
        $("#Comyear").val(""),
        $("#Comdescription").val(""),
        $("#selectcategoriacom").val("")

}

function borrarC(numIdC) {
    var datos={
        id:numIdC
    }
    console.log(numIdC);
    let datosPeticion=JSON.stringify(datos);
    
    $.ajax({
        url:"http://localhost:8080/api/Computer/" + computadorid ,
        type:"DELETE",
        data:datosPeticion,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta) {
            //$("#resultado").empty();
            traerInformacionComputers();
            alert("Se ha eliminado.") ;       
        },
        error:function(xhr,status){
            console.log(status);
            
        }
    });
    
}




function editarRegistroC(numIdC) {
    $("#btnActualizarComputadores").show();
    $("#btnGuardarComputadores").hide();
    $("#btnConsultarComputadores").hide();
    $("#selectcategoriacom").hide();

    var datos={
        id:numIdC
    }
    computadorid= numIdC;
    $.ajax({
        url:"http://localhost:8080/api/Computer/" + computadorid,
        type:'GET',
        dataType:'json',

        success:function(respuesta){
            catecompu= respuesta;
            console.log(respuesta);
            $("#Combrand").val( respuesta.brand),
            $("#Commodel").val(respuesta.model),
            $("#Comyear").val(respuesta.year),
            //$("#selectcategoriacom").val(respuesta.category.name),
            $("#Comname").val(respuesta.name) ,
            $("#Comdescription").val(respuesta.description)

        },

        error:function(xhr,status){
            console.log(status);
        }

    });

    

 
}

function actualizarInformacionComputers(){
    //{"id":1, "brand":"IMB", "name":"Core I5", "description":"Core I5", "year":2019}
    let var3 = {
                "id":computadorid,
                "brand":$("#Combrand").val(),
                "year":parseInt($("#Comyear").val()),
                "category":catecompu.category,
                "name":$("#Comname").val(),
                "description":$("#Comdescription").val()}
        $.ajax({
        type:'PUT',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var3),
        
        url:"http://localhost:8080/api/Computer/update",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se actualizo correctamente");
            alert("Se actualizo correctamente");
            traerInformacionComputers();
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("No se actuaizo correctamente");
    
    
        }
        });
    // var datos={
    //     id:computadorid,
    //     brand:$("#Combrand").val(),
    //     name:$("#Comname").val(),
    //     description:$("#Comdescription").val(),
    //     year: parseInt( $("#Comyear").val())

    //     }
    // console.log($("#Comname").val());
    // let datosPeticion=JSON.stringify(datos);

    // $.ajax({
    //     url:"http://localhost:8080/api/Computer/update",
    //     data:datosPeticion,
    //     type:'PUT',
    //     contentType:"application/JSON",

    //     success:function(respuesta){
    //         console.log(respuesta);
    //         console.log("Actualizado");
    //         alert("Registro actualizado con exito")
    //         traerInformacionComputers();
    //     },

    //     error:function(xhr,status){
    //         console.log(status);
    //     }
    // });

    $("#btnActualizarComputadores").hide();
    
    $("#btnConsultarComputadores").show();
    $("#btnGuardarC").show();
    
    $("#Combrand").val(""),
    $("#Comdescription").val(""),
    $("#selectcategoriacom").val(""),
    $("#Comname").val("")
    
    

}