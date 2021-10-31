traerInformacionCategoriasCom();
var idCate = 0;
async function traerInformacionCategoriasCom(){

    $.ajax({
        url:"http://localhost:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            var respuesta;
            console.log(respuesta);
            psarDatosCategoriasCom(respuesta);
            categorias = respuesta;
            pintarRespuesta(respuesta);
           
        } 
        
    });
}

function pintarRespuesta(respuesta){

    var myTable =`<table border="1">
    <tr>
      <th>Nombre</th>
      <th>Descrpción</th>
      <th colspan="2">Acciones</th>
    </tr>`;
    for(i=0;i<respuesta.length;i++){
        myTable+=`<tr>
                <td>${respuesta[i].name}</td>
                <td>${respuesta[i].description}</td>
                <td><button onclick="editarRegistroCategorias(${respuesta[i].id})">Editar</td>
                <td><button onclick="borrarCategorias(${respuesta[i].id})">Borrar</td> 
       
            </tr>`;
    }
    myTable+='</table>';
    $("#resultado1").html(myTable);
}

function guardarInformacionCategorias(){
    let var2 = {
        name:$("#Cname").val(),
        description:$("#Cdescription").val()
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://localhost:8080/api/Category/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            traerInformacionCategoriasCom();
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });

        $("#Cname").val(""),
        $("#Cdescription").val("")    

}

function borrarCategorias(categoriaId) {
    var datos={
        id:categoriaId
    }

    let datosPeticion=JSON.stringify(datos);

    $.ajax({
        url:"http://localhost:8080/api/Category/"+categoriaId ,
        type:"DELETE",
        data:datosPeticion,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta) {
            $("#resultado").empty();
            traerInformacionCategoriasCom();
            alert("Se ha eliminado.")        
        },
        error:function(xhr,status){
            console.log(status);
        }
    });
    
}


async function editarRegistroCategorias(categoriaId) {
    $("#btnActualizarCategorias").show();
    $("#btnConsultarCategorias").hide();
    $("#btnGuardarCategorias").hide();
    // $("#btnConsultarC").hide();
    // $("#numIdC").prop('disabled',true);
    // $("#numIdC").focus(); 
    var datos={
        id:categoriaId
    }
    idCate= categoriaId;
    console.log(idCate); 
    $.ajax({
        url:"http://localhost:8080/api/Category/" + categoriaId,
        type:'GET',
        dataType:'json',

        success:function(respuesta){
            // var items=respuesta.items;
            
            console.log(respuesta);
            $("#Cname").val(respuesta.name),
            $("#Cdescription").val(respuesta.description)           
        },

        error:function(xhr,status){
            console.log(status);
        }

    });

    

 
}
 function idActualizarCategorias(categoriaId){
     var idC = categoriaId;
     return idC;
 }
function actualizarInformacionCategorias(){
    console.log(idCate)
    var datos={
        id:idCate,
        name:$("#Cname").val(),
        description:$("#Cdescription").val()
        }

    let datosPeticion=JSON.stringify(datos);

    $.ajax({
        url:"http://localhost:8080/api/Category/update",
        data:datosPeticion,
        type:'PUT',
        contentType:"application/JSON",

        success:function(respuesta){
            console.log("Actualizado");
            alert("Registro actualizado con exito")
            traerInformacionCategoriasCom();
        },

        error:function(xhr,status){
            console.log(status);
        }
    });

    $("#btnActualizarCategorias").hide();
    
    $("#btnConsultarCategorias").show();
    $("#btnGuardarCategorias").show(),
    
    $("#Cname").val(""),
    $("#Cdescription").val("")
    

}




