$(document).ready(function () {
   

});
var iswitch = 0;
var idFila = 0;
parametros = {};

$(document).on('click', '#btnGuardarCom', function (e) {
    //if ($('#txtClave').val().trim() == "") {
    //    swal("Advertencia", "La Clave no puede estar vacio", "info");
    //    return;
    //}

    //else if ($('#txtDescripcion').val().trim() == "") {
    //    swal("Advertencia", "La Descripcion no puede estar vacio", "info");
    //    return;
    //}

    InsertaProveedorCombustible();
    limpiaControles();


})

//#region Tabla
var dsTablaProveedorCombustible = [];
var ProveedorCombustible;
var ColumnasProveedorCombustible = [

    {
        "data": "",
        "render": function (data, type, row) {
            return '<div class="d-flex justify-content-center"><button  type="button" id="btnEditar" class="BtnEditar BtnEditarDatos" title="Editar" style="border-radius:5px; display: flex; justify-content: center; align-items: center; width: 30px; height: 30px;"> <span style="font-size: 20px;padding-left: 2px; padding-top:3px" class="fa fa-edit"></span></button></div>';
        }
    },
    {
        "data": "Activo",
        "class": "text-center",
        "render": function (data, type, row) {
            return data == 1 ? '<div class="mt-2 mr-2 badge badge-pill badge-success" style="width:70px;">Activo</div >' : '<div class="mt-2 mr-2 badge badge-pill badge-danger" style="width:70px">Inactivo</div >'
        }
    },
    {
        "data": "Identificador",
        "class": "text-center",
        "visible": false,
        "render": function (data) {
            return data;
        }
    },
    {
        "data": "Clave",
        "class": "text-center",
        "visible": true,
        "render": function (data) {
            return data;
        }
    },
    {
        "data": "NombreComercial",
        "class": "text-center",
        "visible": true,
        "render": function (data) {
            return data;
        }
    },
    {
        "data": "NombreFiscal",
        "class": "text-center",
        "visible": true,
        "render": function (data) {
            return data;
        }
    },
    {
        "data": "RFC",
        "class": "text-center",
        "visible": true,
        "render": function (data) {
            return data;
        }
    },
    {
        "data": "Region",
        "class": "text-center",
        "visible": false,
        "render": function (data) {
            return data;
        }
    },
    {
        "data": "Calle",
        "class": "text-center",
        "visible": false,
        "render": function (data) {
            return data;
        }
    },
    {
        "data": "NoExt",
        "class": "text-center",
        "visible": false,
        "render": function (data) {
            return data;
        }
    },
    {
        "data": "NoInt",
        "class": "text-center",
        "visible": false,
        "render": function (data) {
            return data;
        }
    },
    {
        "data": "CodigoPostal",
        "class": "text-center",
        "visible": false,
        "render": function (data) {
            return data;
        }
    },
    {
        "data": "Colonia",
        "class": "text-center",
        "visible": false,
        "render": function (data) {
            return data;
        }
    },
    {
        "data": "IdPais",
        "class": "text-center",
        "visible": false,
        "render": function (data) {
            return data;
        }
    },
    {
        "data": "IdEstado",
        "class": "text-center",
        "visible": false,
        "render": function (data) {
            return data;
        }
    },
    {
        "data": "IdMunicipio",
        "class": "text-center",
        "visible": false,
        "render": function (data) {
            return data;
        }
    },
    {
        "data": "IdColonia",
        "class": "text-center",
        "visible": false,
        "render": function (data) {
            return data;
        }
    },
    {
        "data": "IdLocalidad",
        "class": "text-center",
        "visible": false,
        "render": function (data) {
            return data;
        }
    },
    {
        "data": "Referencia",
        "class": "text-center",
        "visible": false,
        "render": function (data) {
            return data;
        }
    },
    {
        "data": "Contacto",
        "class": "text-center",
        "visible": true,
        "render": function (data) {
            return data;
        }
    },
    {
        "data": "Telefono",
        "class": "text-center",
        "visible": true,
        "render": function (data) {
            return data;
        }
    },
    {
        "data": "Email",
        "class": "text-center",
        "visible": true,
        "render": function (data) {
            return data;
        }
    },
    {
        "data": "DiasCredito",
        "class": "text-center",
        "visible": true,
        "render": function (data) {
            return data;
        }

    },
    {
        "data": "FechaAlta",
        "class": "text-center",
        "visible": true,
        "render": function (data) {
            return data;
        }
    },
    {
        "data": "UsuarioAlta",
        "class": "text-center",
        "visible": true,
        "render": function (data) {
            return data;
        }
    },
    {
        "data": "FechaModifica",
        "class": "text-center",
        "visible": true,
        "render": function (data) {
            return data;
        }
    },
    {
        "data": "UsuarioModifica",
        "class": "text-center",
        "visible": true,
        "render": function (data) {
            return data;
        }
    },
    {
        "data": "FechaBaja",
        "class": "text-center",
        "visible": true,
        "render": function (data) {
            return data;
        }
    },
    {
        "data": "UsuarioBaja",
        "class": "text-center",
        "visible": true,
        "render": function (data) {
            return data;
        }
    },

];
//#endregion

//#region Carga Tabla
function CargarTabla() {
    var url = $('#urlCat_ProveedorCombustible').val();

    var parametros = {};

    parametros["iSwitch"] = 1;



    CargaLoading();

    $.ajax({

        url: url,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ model: parametros }),
        async: true,
        success: successCargaTabla,
        error: function (xmlHttpRequest, textStatus, errorThrown) {

            MensajeError('Ocurrio un error al buscar la información.');

        }
    });
    return false;
}


function successCargaTabla(data) {
    if (data.Exito) {

        dsTablaProveedorCombustible = jQuery.parseJSON(data.Datos);

        ProveedorCombustible = inicializaTabla($('#TablaProveedorCombustible'), dsTablaProveedorCombustible.Table, ColumnasProveedorCombustible, 0, "asc", true, true, true);

    }


    else if (data.Advertencia) {

        MensajeAdvertencia(data.Mensaje);
    }
    else {
        MensajeError(data.Mensaje);
    }
    OcultarLoading();

}

function InsertaProveedorCombustible() {

    var url = $('#urlCat_ProveedorCombustible').val();
    var parametros = {};

    parametros["iSwitch"] = iswitch;

    parametros["iIdentificador"] = idFila;
    parametros["vNombreComercial"] = $("#txtNombreComercial").val();
    parametros["vNombreFiscal"] = $("#txtNombreFiscal").val();
    parametros["vRFC"] = $("#txtRFC").val();
    parametros["vCalle"] = $("#txtDireccion").val();
    parametros["vNoExt"] = $("#txtNoExt").val();
    parametros["vNoInt"] = $("#txtNoInt").val();
    parametros["vColonia"] = $("#ComboColonia").val();
    parametros["vCodigoPostal"] = $("#txtCP").val();
    parametros["iIdPais"] = $("#ComboPais").val();
    parametros["iIdEstado"] = $("#ComboEstado").val();
    parametros["iIdMunicipio"] = $("#ComboMunicipio").val();
    parametros["iIdColonia"] = $("#ComboColonia").val();
    parametros["iIdLocalidad"] = $("#ComboLocalidad").val();
    parametros["vReferencia"] = $("#TxtReferencias").val();
    parametros["vContacto"] = $("#TxtContacto").val();
    parametros["vTelefono"] = $("#TxtTelefono").val();
    parametros["vEmail"] = $("#TxtEmail").val();
    parametros["iDiasCredito"] = $("#TxtDiasCredito").val();
    parametros["iActivo"] = parseInt($('#checkStatus').val());
    parametros["iUsuarioModifica"] = $("#txtIdUsuario").val();
    parametros["iUsuarioAlta"] = $("#txtIdUsuario").val();
    parametros["iUsuarioBaja"] = $("#txtIdUsuario").val();
    if ($('#checkStatus').prop('checked') == true) {
        parametros["vActivo"] = 1;
    } else {


        parametros["vActivo"] = 0;

    }
    if ($('#checkStatus').prop('checked') == false) {
        /validarPermisosDocumentoAduanero(4);/
            if (!permisoValidacion) { return false }; 
    }
    $.ajax({

        url: url,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ model: parametros }),
        async: true,
        success: successInsertaProveedorCombustible,
        error: function (xmlHttpRequest, textStatus, errorThrown) {

            MensajeError('Ocurrio un error al buscar la información.');
        }
    });
    return false;
}

function successInsertaProveedorCombustible(data) {
    if (data.Exito) {
        $("#checkStatus").attr("disabled", true);
        $("#checkStatus").prop("checked", true);

        var resultado = jQuery.parseJSON(data.Datos);
        var ArrayMensaje = resultado.Table[0].mensaje.split('|');
        if (resultado.Table[0].Dato == 1) {

            OcultarLoading();
            $('#myModal').hide();
            CargarTabla();
            swal(ArrayMensaje[0], ArrayMensaje[1], ArrayMensaje[2]);
        }
        else {


            OcultarLoading();
            swal(ArrayMensaje[0], ArrayMensaje[1], ArrayMensaje[2]);
        }
    }
    else if (data.Advertencia) {
        MensajeAdvertencia(data.Mensaje);
    }
    else {
        MensajeError(data.Mensaje);
    }
    OcultarLoading();
    $('#myModal').hide();

}
//#endregion

//#region FUNCIONES  AL CARGAR

//#region MANEJO DE ENTIDAD FEDERATIVA

var IdTxtCP;            // Verifica cual Txt del Código Postal se utiliza
var ArregloEntidad;     // Regresa la información al buscar el código postal contiene IdPais, IdEstado, IdMunicipio, IdLocalidad.   
var stringPais;         // Contiene el resultado de la consulta para el País.
var stringEstado;       // Contiene el resultado de la consulta para el Estado.
var stringMunicipio;    // Contiene el resultado de la consulta para el Municipio.
var stringLocalidad;    // Contiene el resultado de la consulta para las Localidades.
var stringColonia;      // Contiene el resultado de la consulta para las Colonias.
var stringAbrEstado;

$('.LeaveCP').blur(function (e) {

    IdTxtCP = $(this).context.id;

    if ($('#' + IdTxtCP).val() == "") {
        MensajeAdvertencia("El código postal no puede estar vacío.");
        return;
    }
    else {
        //Al modificar el control deja de ser replica porque puede variar el domicilio uno con el otro.
        //Por eso limpiamos el control de replica para evitar cualquier problema    
        $('#ChkReplicaDomicilio').prop('checked', false);
        //if (IdTxtCP == "txtCP2")
        //    $('#ChkReplicaDomicilio').prop('checked', false);

        //valida = 1;
        if (true) {
            if ($('#' + IdTxtCP).val() == "0") {

            }
            else {
                ConsultaCP($('#' + IdTxtCP).val(), IdTxtCP);
            }
        }
        else
            ConsultaCP($('#' + IdTxtCP).val(), IdTxtCP);
    }

});

function ConsultaCP(codigoPostal, IdControl) {

    var url = $('#urlEntidadCP').val();

    var parametros = {};

    //Asignamos el valor del IdControl para el llenado de la información por control
    IdTxtCP = IdControl;


    parametros["Tipo"] = 7;
    parametros["CodigoPostal"] = codigoPostal;


    parametros["Id"] = 0; //Identificador del cliente seleccionado.

    // EL TIPO CLIENTE PERTENECE AL STORE SAT_ENTIDAD_FEDERATIVA


    parametros["TipoCliente"] = '';


    //CargaLoading();

    $.ajax({

        url: url,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(parametros),
        async: true,
        success: successConsultaCP,
        error: function (xmlHttpRequest, textStatus, errorThrown) {

            MensajeError('Ocurrio un error al obtener la lista de combos, intentelo de nuevo.');
            OcultarLoading();
        }
    });
    return false;
}
function successConsultaCP(data) {

    if (data.Exito) {

        ArregloEntidad = jQuery.parseJSON(data.Datos);

        if (ArregloEntidad.Table.length > 0) {

            CargaComboPais();
        }
        else {
            MensajeAdvertencia("El código postal no existe, favor de verificar.");
            OcultarLoading();
        }
    }
    else if (data.Advertencia) {
        MensajeAdvertencia(data.Mensaje);
        OcultarLoading();
    }
    else {
        MensajeError(data.Mensaje);
        OcultarLoading();
    }
}

function CargaComboPais() {

    var url = $('#urlComboEntidad').val();

    var parametros = {};
    parametros["Tipo"] = 1;
    parametros["Id_Pais"] = ArregloEntidad.Table[0].IdPais;

    $.ajax({

        url: url,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(parametros),
        async: true,
        success: successCargaComboPais,
        error: function (xmlHttpRequest, textStatus, errorThrown) {

            MensajeError(data.Mensaje);
        }
    });
    return false;
}
function successCargaComboPais(data) {

    if (data.Exito) {

        stringPais = data.Datos;

        CargaComboEstado();
    }

    else if (data.Advertencia) {
        OcultarLoading();
        MensajeAdvertencia(data.Mensaje);
    }
    else {
        OcultarLoading();
        MensajeError(data.Mensaje);
    }
}

function CargaComboEstado() {

    var url = $('#urlComboEntidad').val();

    var parametros = {};
    parametros["Tipo"] = 2;
    parametros["Id_Estado"] = ArregloEntidad.Table[0].IdEstado;

    $.ajax({

        url: url,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(parametros),
        async: true,
        success: successCargaComboEstado,
        error: function (xmlHttpRequest, textStatus, errorThrown) {

            MensajeError(data.Mensaje);
        }
    });
    return false;
}
function successCargaComboEstado(data) {

    if (data.Exito) {

        stringEstado = data.Datos;

        CargaComboMunicipio();

    }

    else if (data.Advertencia) {
        OcultarLoading();
        MensajeAdvertencia(data.Mensaje);
    }
    else {
        OcultarLoading();
        MensajeError(data.Mensaje);
    }
}

function CargaComboMunicipio() {

    var url = $('#urlComboEntidad').val();

    var parametros = {};
    parametros["Tipo"] = 3;
    parametros["Id_Municipio"] = ArregloEntidad.Table[0].IdMunicipio;

    $.ajax({

        url: url,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(parametros),
        async: true,
        success: successCargaComboMunicipio,
        error: function (xmlHttpRequest, textStatus, errorThrown) {

            MensajeError(data.Mensaje);
        }
    });
    return false;
}
function successCargaComboMunicipio(data) {

    if (data.Exito) {

        stringMunicipio = data.Datos;
        CargaComboColonia();

    }

    else if (data.Advertencia) {
        OcultarLoading();
        MensajeAdvertencia(data.Mensaje);
    }
    else {
        OcultarLoading();
        MensajeError(data.Mensaje);
    }
}

function CargaComboColonia() {

    var url = $('#urlComboEntidad').val();

    var parametros = {};
    parametros["Tipo"] = 7;
    parametros["CodigoPostal"] = $('#' + IdTxtCP).val();

    $.ajax({

        url: url,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(parametros),
        async: true,
        success: successCargaComboColonia,
        error: function (xmlHttpRequest, textStatus, errorThrown) {

            MensajeError(data.Mensaje);
        }
    });
    return false;
}
function successCargaComboColonia(data) {

    if (data.Exito) {

        stringColonia = data.Datos;

        CargaComboLocalidad();

        OcultarLoading();

    }

    else if (data.Advertencia) {
        OcultarLoading();
        MensajeAdvertencia(data.Mensaje);
    }
    else {
        OcultarLoading();
        MensajeError(data.Mensaje);
    }
}

function CargaComboLocalidad() {

    var url = $('#urlComboEntidad').val();

    var parametros = {};
    parametros["Tipo"] = 8;
    parametros["Id_Estado"] = ArregloEntidad.Table[0].IdEstado;

    $.ajax({

        url: url,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(parametros),
        async: true,
        success: successCargaComboLocalidad,
        error: function (xmlHttpRequest, textStatus, errorThrown) {

            MensajeError(data.Mensaje);
        }
    });
    return false;
}
function successCargaComboLocalidad(data) {

    if (data.Exito) {

        stringLocalidad = data.Datos;

        LlenarComboEntidad();

        OcultarLoading();

    }

    else if (data.Advertencia) {
        OcultarLoading();
        MensajeAdvertencia(data.Mensaje);
    }
    else {
        OcultarLoading();
        MensajeError(data.Mensaje);
    }
}

function LlenarComboEntidad() {

    if (IdTxtCP == "txtCP") {

        $('#ComboColonia').empty();
        $('#ComboColonia').append(stringColonia);
        $('#ComboColonia').val(ArregloEntidad.Table[0].Clave);
        $('#ComboColonia').selectpicker('refresh');

        $('#txtIdColonia').val($('#ComboColonia').val());

        $('#ComboPais').empty();
        $('#ComboPais').append(stringPais);
        $('#ComboPais').val(ArregloEntidad.Table[0].IdPais);
        $('#ComboPais').selectpicker('refresh');

        $('#ComboEstado').empty();
        $('#ComboEstado').append(stringEstado);
        $('#ComboEstado').val(ArregloEntidad.Table[0].IdEstado);
        $('#ComboEstado').selectpicker('refresh');

        $('#ComboMunicipio').empty();
        $('#ComboMunicipio').append(stringMunicipio);
        $('#ComboMunicipio').val(ArregloEntidad.Table[0].IdMunicipio);
        $('#ComboMunicipio').selectpicker('refresh');

        $('#ComboLocalidad').empty();
        $('#ComboLocalidad').append(stringMunicipio);
        $('#ComboLocalidad').val(ArregloEntidad.Table[0].IdMunicipio);
        $('#ComboLocalidad').selectpicker('refresh');


        $('#ComboCiudad').empty();
        $('#ComboCiudad').append(stringMunicipio);
        $('#ComboCiudad').val(ArregloEntidad.Table[0].IdMunicipio);
        $('#ComboCiudad').selectpicker('refresh');

        $('#ComboEntidadFedDom').empty();
        $('#ComboEntidadFedDom').append(stringEstado);
        $('#ComboEntidadFedDom').val(ArregloEntidad.Table[0].IdEstado);
        $('#ComboEntidadFedDom').selectpicker('refresh');


        if (iswitch == 3) {

            $('#ComboColonia').val(datosFila.IdColonia);
            $('#ComboColonia').selectpicker('refresh');
            $('#txtIdColonia').val(datosFila.Colonia);
            $('#ComboLocalidad').val(datosFila.IdLocalidad);
            $('#ComboLocalidad').selectpicker('refresh');
            $('#ComboMunicipio').val(datosFila.IdMunicipio);
            $('#ComboMunicipio').selectpicker('refresh');
            $('#ComboEstado').val(datosFila.IdEstado);
            $('#ComboEstado').selectpicker('refresh');
            $('#ComboPais').val(datosFila.IdPais);
            $('#ComboPais').selectpicker('refresh');


        }
    }
    //else if (IdTxtCP == "txtCP2") {

    //    $('#ComboColonia2').empty();
    //    $('#ComboColonia2').append(stringColonia);
    //    if ($('#ChkReplicaDomicilio').prop('checked'))
    //        $('#ComboColonia2').val($('#ComboColonia').val());
    //    $('#ComboColonia2').selectpicker('refresh');

    //    $('#txtIdColonia2').val($('#ComboColonia2').val());

    //    $('#ComboPais2').empty();
    //    $('#ComboPais2').append(stringPais);
    //    $('#ComboPais2').val(ArregloEntidad.Table[0].IdPais);
    //    $('#ComboPais2').selectpicker('refresh');

    //    $('#ComboEstado2').empty();
    //    $('#ComboEstado2').append(stringEstado);
    //    $('#ComboEstado2').val(ArregloEntidad.Table[0].IdEstado);
    //    $('#ComboEstado2').selectpicker('refresh');

    //    $('#ComboMunicipio2').empty();
    //    $('#ComboMunicipio2').append(stringMunicipio);
    //    $('#ComboMunicipio2').val(ArregloEntidad.Table[0].IdMunicipio);
    //    $('#ComboMunicipio2').selectpicker('refresh');

    //    $('#ComboLocalidad2').empty();
    //    $('#ComboLocalidad2').append(stringMunicipio);
    //    $('#ComboLocalidad2').val(ArregloEntidad.Table[0].IdMunicipio);
    //    $('#ComboLocalidad2').selectpicker('refresh');


    //    $('#ComboCiudad2').empty();
    //    $('#ComboCiudad2').append(stringMunicipio);
    //    $('#ComboCiudad2').val(ArregloEntidad.Table[0].IdMunicipio);
    //    $('#ComboCiudad2').selectpicker('refresh');

    //    $('#ComboEntidadFedDom2').empty();
    //    $('#ComboEntidadFedDom2').append(stringEstado);
    //    $('#ComboEntidadFedDom2').val(ArregloEntidad.Table[0].IdEstado);
    //    $('#ComboEntidadFedDom2').selectpicker('refresh');


    //    //////////////

    //    if (valida == 2) {

    //        $('#ComboColonia2').val(dsEmpleado.Table[0].IdColoniaActual);
    //        $('#ComboColonia2').selectpicker('refresh');
    //        $('#txtIdColonia2').val(dsEmpleado.Table[0].IdColoniaActual);
    //        //}

    //        if (dsEmpleado.Table[0].IdLocalidadActual) {
    //            $('#ComboLocalidad2').val(dsEmpleado.Table[0].IdLocalidadActual);
    //            $('#ComboLocalidad2').selectpicker('refresh');
    //        }


    //        if (dsEmpleado.Table[0].IdMunicipioActual) {
    //            $('#ComboMunicipio2').val(dsEmpleado.Table[0].IdMunicipioActual);
    //            $('#ComboMunicipio2').selectpicker('refresh');
    //        }


    //        if (dsEmpleado.Table[0].IdEstadoActual) {
    //            $('#ComboEstado2').val(dsEmpleado.Table[0].IdEstadoActual);
    //            $('#ComboEstado2').selectpicker('refresh');
    //        }

    //        if (dsEmpleado.Table[0].IdPaisActual) {
    //            $('#ComboPais2').val(dsEmpleado.Table[0].IdPaisActual);
    //            $('#ComboPais2').selectpicker('refresh');
    //        }

    //        if (dsEmpleado.Table[0].IdEstadoActual) {
    //            $('#ComboEntidadFedDom2').val(dsEmpleado.Table[0].IdEstadoActual);
    //            $('#ComboEntidadFedDom2').selectpicker('refresh');
    //        }

    //        if (dsEmpleado.Table[0].IdCiudadActual) {
    //            $('#ComboCiudad2').val(dsEmpleado.Table[0].IdCiudadActual);
    //            $('#ComboCiudad2').selectpicker('refresh');
    //        }
    //}
    //}
}


$("#ComboColonia").change(function () {


    $('#txtIdColonia').val($('#ComboColonia').val());
});






//#endregion

//#region MANEJO ENTIDAD FEDERATIVA NO ASINCRONO

function ConsultaCP_(codigoPostal, IdControl) {

    var url = $('#urlEntidadCP').val();

    var parametros = {};

    //Asignamos el valor del IdControl para el llenado de la información por control
    IdTxtCP = IdControl;

    parametros["Tipo"] = 7;
    parametros["CodigoPostal"] = codigoPostal;


    parametros["Id"] = 0; //Identificador del cliente seleccionado.

    // EL TIPO CLIENTE PERTENECE AL STORE SAT_ENTIDAD_FEDERATIVA


    parametros["TipoCliente"] = '';


    //CargaLoading();

    $.ajax({

        url: url,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(parametros),
        async: true,
        success: successConsultaCP_,
        error: function (xmlHttpRequest, textStatus, errorThrown) {

            MensajeError('Ocurrio un error al obtener la lista de combos, intentelo de nuevo.');
            OcultarLoading();
        }
    });
    return false;
}
function successConsultaCP_(data) {

    if (data.Exito) {

        ArregloEntidad = jQuery.parseJSON(data.Datos);

        if (ArregloEntidad.Table.length > 0) {

            CargaComboPais();
        }
        else {
            MensajeAdvertencia("El código postal no existe, favor de verificar.");
            OcultarLoading();
        }
    }
    else if (data.Advertencia) {
        MensajeAdvertencia(data.Mensaje);
        OcultarLoading();
    }
    else {
        MensajeError(data.Mensaje);
        OcultarLoading();
    }
}


//#endregion
//#endregion
$(document).on('click', '#btnInsertar ', function (e) {
    iswitch = 2;
    idFila = 0;
    //validarPermisosNuevoBr(1);
    $('#checkStatus').prop('disabled', true);
    $('#myModal').show();
    limpiaControles();
    $('#checkStatus').prop('checked', true);
    $('#TituloAgregar').text('Agregar Proveedor Combustible');
});

$(document).on('click', '.CerrarModal', function (e) {

    BanderaLimpiar = 1;

    eleccion = 2;
    if (eleccion == 2) {
        swal({
            icon: "warning",
            title: "Advertencia",
            text: "¿Estas seguro que deseas cancelar la operacion?",
            type: "info",
            showCancelButton: true,
            confirmButtonColor: '#00CC66',
            confirmButtonText: 'SI',
            cancelButtonText: "NO"
        }).then(function (isConfirm) {
            if (isConfirm.dismiss == "cancel") {

            }
            else if (isConfirm.dismiss == "esc") {

            }

            else if (isConfirm.dismiss == "overlay") {

            }
            else {

                //const Contenedor = document.getElementById("Contenedor");
                //Contenedor.style.opacity = "1";

                $('#myModal').hide();
                limpiaControles();

            }
        });



    }

});
$(document).on('click', '.BtnEditar ', function (e) {
    iswitch = 3;
    var filaPadre = $(this).closest('tr');
    var row = ProveedorCombustible.api().row(filaPadre);
    datosFila = row.data();
    /validarPermisosEditarBrDocumentoAduanero(2);/
    idFila = datosFila.Identificador;
    $('#txtNombreComercial').val(datosFila.NombreComercial);
    $('#txtNombreFiscal').val(datosFila.NombreFiscal);
    $('#txtRFC').val(datosFila.RFC);
    $('#txtDireccion').val(datosFila.Calle);
    $('#txtNoExt ').val(datosFila.NoExt);
    $('#txtNoInt ').val(datosFila.NoInt);
    $('#txtCP').val(datosFila.CodigoPostal);
    $('#ComboColonia').val(datosFila.IdColonia);
    $('#txtIdColonia').val(datosFila.IdColonia);
    $('#txtIdLocalidad').val(datosFila.IdLocalidad);
    $('#ComboMunicipio ').val(datosFila.IdMunicipio);
    $('#ComboEstado ').val(datosFila.IdEstado);
    $('#ComboPais ').val(datosFila.IdPais);
    $('#TxtReferencias ').val(datosFila.Referencia);
    $('#TxtContacto ').val(datosFila.Contacto);
    $('#TxtTelefono ').val(datosFila.Telefono);
    $('#TxtEmail ').val(datosFila.Email);
    $('#TxtDiasCredito ').val(datosFila.DiasCredito);
    $('#checkStatus').prop('disabled', false);

    if (datosFila.Activo == 1) {
        $('#checkStatus').prop('checked', true);
    }
    else {
        $('#checkStatus').prop('checked', false);
    }

    $('#TituloAgregar').text('Editar Proveedor Combustible');
    $('#myModal').show();
    $(".LeaveCP").trigger("blur");


});
function limpiaControles() {
    $('#txtNombreComercial').val("");
    $('#txtNombreFiscal').val("");
    $("#txtRFC").val("");
    $("#txtDireccion").val("");
    $("#txtNoExt").val("");
    $("#txtNoInt").val("");
    $("#txtCP").val("");
    $("#ComboColonia").empty();
    $("#ComboColonia").selectpicker('refresh');
    $("#txtIdColonia").val("");
    $("#ComboLocalidad").empty();
    $("#ComboLocalidad").selectpicker('refresh');
    $("#ComboMunicipio").empty();
    $("#ComboMunicipio").selectpicker('refresh');
    $("#ComboEstado").empty();
    $("#ComboEstado").selectpicker('refresh');
    $("#ComboPais").empty();
    $("#ComboPais").selectpicker('refresh');
    $("#TxtReferencias").val("");
    $("#TxtContacto").val("");
    $("#TxtTelefono").val("");
    $("#TxtEmail").val("");
    $("#TxtDiasCredito").val("");
    $("#checkStatus").val("");
}
$(document).on('blur', '#TxtEmail', function (e) {
    var correoElectronico = $("#TxtEmail").val();
    var regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;

    if (regex.test(correoElectronico)) {

    } else {
        $("#TxtEmail").val('');
        MensajeAdvertencia("Correo invalido")
    }

});
$(document).on('blur', '#txtRFC', function (e) {

    validarRFC();
});
function validarRFC() {
    var valor = $("#txtRFC").val().trim(); // Obtener el valor y eliminar espacios en blanco
    if (valor.length < 12) {
        $("#txtRFC").val('');
        MensajeAdvertencia("RFC invalido");
        return false;
    }
    // Definir la expresión regular para validar el formato
    var regex = /^[A-Za-z]{4}\d{6}[A-Za-z0-9]*$/;

    // Validar el RFC con la expresión regular
    if (regex.test(valor)) {

        return true
    } else {

        $("#txtRFC").val('');
        MensajeAdvertencia("RFC invalido");
        return false;
    }
}
$(document).on('click', '.btnCerrar', function (e) {
    $('#myModal').hide()
    limpiaControles();
});
$(document).on('click', '#Cancelar', function (e) {



    eleccion = 2;

    if (eleccion == 2) {
        swal({
            icon: "warning",
            title: "Advertencia",
            text: "¿Estas seguro que deseas cancelar la operacion?",
            type: "info",
            showCancelButton: true,
            confirmButtonColor: '#00CC66',
            confirmButtonText: 'SI',
            cancelButtonText: "NO"
        }).then(function (isConfirm) {
            if (isConfirm.dismiss == "cancel") {

            }
            else if (isConfirm.dismiss == "esc") {

            }

            else if (isConfirm.dismiss == "overlay") {

            }
            else {

                //const Contenedor = document.getElementById("Contenedor");
                //Contenedor.style.opacity = "1";
                $('#myModal').hide()
                limpiaControles();

            }
        });


    }



});



$('#txtDireccion,#TxtReferencias,#TxtContacto,#txtNombreComercial,#txtNombreFiscal').keypress(function () {

    this.value = (this.value + '').replace(/[^A-Za-zÁÉÍÓÚáéíóúñ0-9 ]/, '');
    this.value = (this.value + '').replace(/  /, ' ');
});
$('#txtDireccion,#TxtReferencias,#TxtContacto,#txtNombreComercial,#txtNombreFiscal').blur(function () {

    this.value = (this.value + '').replace(/[^A-Za-zÁÉÍÓÚáéíóúñ0-9 ]/, '');
    this.value = (this.value + '').replace(/  /, ' ');
});
$('#txtDireccion,#TxtReferencias,#TxtContacto,#txtNombreComercial,#txtNombreFiscal').keyup(function () {

    this.value = (this.value + '').replace(/[^A-Za-zÁÉÍÓÚáéíóúñ0-9 ]/, '');
    this.value = (this.value + '').replace(/  /, ' ');
});
