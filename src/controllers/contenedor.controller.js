import {getConnection,sql} from '../database/conexion.js';
import {ruta} from '../app.js';
import {queries} from '../database/query.js';
import path from 'path';
import { Console } from 'console';
export let result = '';
export let agendamiento = '';
export let login = '';
export let pass = '';
export let listado = '';
export let IDEQUIPOANTES = '';
export let paginaWeb = '';
export let documento2 = '';
let prediccion = "";


/*export const getProveedor = async (req,res) => {
    
    
    const {id} = req.params;    
    const pool = await getConnection()
    result = await pool.request().
    input("DOCUMENTO",sql.VarChar,id).
    query(queries.allProveedor);

    console.log("getProveedor"+id);
    res.send(result);
    //res.redirect('/cliente/'+id); 
                
}*/


export const viewClient = async (req,res) => {
    try
    {
        documento2 = req.body.DOCUMENTO;        
        const pool = await getConnection();
        result = await pool.request().
        input("DOCUMENTO",sql.VarChar,documento2).
        query(queries.selectCliente); 
        if (result.rowsAffected > 0)
        { 

            res.redirect(paginaWeb+'/inicio'); 
        }
        else
        {                       
            res.redirect(paginaWeb+'/crearCliente');           
        }
    }
    catch (error)
    {
        res.status(500)
        res.send(error.message)
    }
}

export const listContenedor = async (req,res) => {
    try
    {            

        const pool = await getConnection();
        prediccion = await pool.request().        
        input("IDCLIENTE",sql.Numeric,result.recordset[0].IDCLIENTE).
        query(queries.existePrediccion);
        let fecha = new Date();

        fecha = new Date(fecha - ((5 * 60) * 60000));
        if (prediccion.rowsAffected == 0 )
        {
            const crearPollaMundialista = await pool.request().        
            input("IDCLIENTE",sql.Numeric,result.recordset[0].IDCLIENTE).
            input("MODIFICA",sql.VarChar,'N').
            query(queries.crearPollaMundialista); 

            prediccion = await pool.request().        
            input("IDCLIENTE",sql.Numeric,result.recordset[0].IDCLIENTE).
            query(queries.existePrediccion);
        }

        res.render(path.join(ruta+'/view/prestamos.ejs'),({predi : prediccion.recordset,cliente:result.recordset[0],fecha:fecha}));        
    }
    catch (error)
    {
        res.status(500)
        res.send(error.message)
    }
}

export const actualizarResultados = async (req,res) => {
    try
    {

        prediccion.recordset.forEach(async (user) => {
            const prueba1 = "RESULTADO1"+user.IDPOLLAMUNDIALISTA;
            const prueba2 = "RESULTADO2"+user.IDPOLLAMUNDIALISTA;
            const campo1 = req.body[prueba1];
            const campo2 = req.body[prueba2];
            
            if (campo1 != '' || campo2 != '')
            {
            const pool = await getConnection();        
            await pool.request()
            .input("RESULTADO1",sql.Numeric,campo1)            
            .input("RESULTADO2",sql.Numeric,campo2)            
            .input("IDPOLLAMUNDIALISTA",sql.Numeric,user.IDPOLLAMUNDIALISTA)
            .input("MODIFICA",sql.VarChar,'S')
            .query(queries.actualizarResultados);
            }
        });
        
    
        
        res.redirect(paginaWeb+'/inicio');
              
                         
                 
    }
    catch (error)
    {
        res.status(500)
        res.send(error.message)
    }    
}

export const newAgendamiento = async (req,res) => {
    try
    {        
        const pool = await getConnection();        
        listado = await pool.request().                
        input("STAT",sql.VarChar,"ACTIVO").
        input("PRESTADO",sql.VarChar,"NO").
        query(queries.listadoEquipos);
        const cliente = await pool.request().
        query(queries.cliente);
        const documentosGarantais = await pool.request().
        query(queries.documentosGarantias);
        const asuntoEntrega = await pool.request().
        query(queries.asuntoEntrega);

        if (result.rowsAffected >  0)
        {
            res.render(path.join(ruta+'/view/new.ejs'),({listado : listado.recordset,cliente : cliente.recordset,documentosGarantias : documentosGarantais.recordset,asuntoEntrega:asuntoEntrega.recordset}));
        }
        else
        {              
            res.redirect(paginaWeb+'/inicio');         
        }
    }
    catch (error)
    {
        res.status(500)
        res.send(error.message)
    }
}

export const crearCliente = async (req,res) => {
    try
    {        
        const pool = await getConnection();        
        const tipoDocumento = await pool.request().
        query(queries.tipoDocumento);
        const genero = await pool.request().
        query(queries.genero);
        const ciudad = await pool.request().
        query(queries.ciudad);
        res.render(path.join(ruta+'/view/new.ejs'),({tipoDocumento : tipoDocumento.recordset,genero : genero.recordset,ciudad : ciudad.recordset}));
    }
    catch (error)
    {
        res.status(500)
        res.send(error.message)
    }
}

export const newCliente = async (req,res) => {
    try
    {
        
        const IDTIPODOCUMENTO = req.body.IDTIPODOCUMENTO;
        const DOCUMENTO = req.body.DOCUMENTO;
        const NOMBRE1 = req.body.NOMBRE1;
        const NOMBRE2 = req.body.NOMBRE2;
        const APELLIDO1 = req.body.APELLIDO1;
        const APELLIDO2 = req.body.APELLIDO2;
        let FECHANACIMIENTO = req.body.FECHANACIMIENTO;
        const IDSEXO = req.body.IDSEXO;
        const TELEFONO2 = req.body.TELEFONO2;
        const EMAIL = req.body.EMAIL;
        const IDCIUDADRESIDENCIA = req.body.IDCIUDADRESIDENCIA;
        const DIRECCIONRESIDENCIA = req.body.DIRECCIONRESIDENCIA;    
        let BIKELOVERS = req.body.BIKELOVERS;                             
        let SEPARADOS = req.body.SEPARADOS;
        let FONTANARENTRENA = req.body.FONTANARENTRENA;
        let CARLOVERS = req.body.CARLOVERS;
        let ENTRETENIMIENTONINOS = req.body.ENTRETENIMIENTONINOS;
        let MOMS = req.body.MOMS;
        let HACIENDAFONTANAR = req.body.HACIENDAFONTANAR;
        let MUJEREMPRENDEDORA = req.body.MUJEREMPRENDEDORA;
        const HABEASDATA = 'SI';
        FECHANACIMIENTO = FECHANACIMIENTO + " 01:00.000";        

        console.log(BIKELOVERS);
        if (BIKELOVERS == null)
        {
            BIKELOVERS = 'NO'
        }
        else
        {
            BIKELOVERS = 'SI'
        }
        console.log(BIKELOVERS);
        
        const pool = await getConnection();        
        const nuevo = await pool.request()
        .input("IDTIPODOCUMENTO",sql.Numeric,IDTIPODOCUMENTO)
        .input("DOCUMENTO",sql.VarChar,DOCUMENTO)
        .input("NOMBRE1",sql.VarChar,NOMBRE1)
        .input("NOMBRE2",sql.VarChar,NOMBRE2)
        .input("APELLIDO1",sql.VarChar,APELLIDO1)            
        .input("APELLIDO2",sql.VarChar,APELLIDO2)
        .input("FECHANACIMIENTO",sql.DateTime,FECHANACIMIENTO)
        .input("IDSEXO",sql.Numeric,IDSEXO)
        .input("TELEFONO2",sql.VarChar,TELEFONO2)
        .input("EMAIL",sql.VarChar,EMAIL)
        .input("IDCIUDADRESIDENCIA",sql.Numeric,IDCIUDADRESIDENCIA)              
        .input("DIRECCIONRESIDENCIA",sql.VarChar,DIRECCIONRESIDENCIA)            
        .input("BIKELOVERS",sql.VarChar,BIKELOVERS)            
        .input("SEPARADOS",sql.VarChar,SEPARADOS)        
        .input("FONTANARENTRENA",sql.VarChar,FONTANARENTRENA)
        .input("CARLOVERS",sql.VarChar,CARLOVERS)
        .input("MOMS",sql.VarChar,MOMS)
        .input("ENTRETENIMIENTONINOS",sql.VarChar,ENTRETENIMIENTONINOS)                    
        .input("HACIENDAFONTANAR",sql.VarChar,HACIENDAFONTANAR)                                  
        .input("MUJEREMPRENDEDORA",sql.VarChar,MUJEREMPRENDEDORA)                                  
        .input("HABEASDATA",sql.VarChar,HABEASDATA)                                                                 
        .input("USUARIOCREA",sql.VarChar,'WEB')                                                                 
        .query(queries.crearCliente);   
        
        result = await pool.request().
        input("DOCUMENTO",sql.VarChar,DOCUMENTO).
        query(queries.selectCliente); 
        
        res.redirect(paginaWeb+'/inicio');
              
                         
                 
    }
    catch (error)
    {
        res.status(500)
        res.send(error.message)
    }    
}

export const seleccionEquipo = async (req,res)=> {
    try
    {
        const {id} = req.params;
        

        const pool = await getConnection();
        const equipos = await pool.request()
        .input("ID",sql.Int,id)
        .query(queries.equipoSeleccionado);
        listado = await pool.request().                
        input("STAT",sql.VarChar,"ACTIVO").
        input("PRESTADO",sql.VarChar,"NO").
        query(queries.listadoEquipos);
        const cliente = await pool.request().
        query(queries.cliente);
        const documentosGarantais = await pool.request().
        query(queries.documentosGarantias);
        const asuntoEntrega = await pool.request().
        query(queries.asuntoEntrega);

        IDEQUIPOANTES = equipos.recordset[0].IDEQUIPO;

        res.render(path.join(ruta+'/view/edit.ejs'),{equipos : equipos.recordset[0],listado : listado.recordset,cliente : cliente.recordset,documentosGarantias : documentosGarantais.recordset,asuntoEntrega:asuntoEntrega.recordset});
    }    
    catch (error)
    {
        res.status(500)
        res.send(error.message)
    }
}

export const actualizarPrestamo = async (req,res) => {
    try
    {
        const id = req.body.IDPRESTAMOEQUIPOS;
        const IDCLIENTE = req.body.IDCLIENTE;
        const DOCUMENTO = req.body.DOCUMENTO;
        const NOMBRECOMPLETO = req.body.NOMBRE1;
        const IDEQUIPO = req.body.IDEQUIPO;
        const EQUIPO = req.body.EQUIPO;
        const SERIAL = req.body.SERIAL;
        const IDDOCUMENTOGARANTIA = req.body.IDDOCUMENTOGARANTIA;
        const DOCUMENTOGARANTIA = req.body.DOCUMENTOGARANTIA;
        const IDOBSERVACIONENTREGA = req.body.IDOBSERVACIONENTREGA;
        const OBSERVACIONENTREGA = req.body.OBSERVACIONENTREGA;
        const OBSERVACIONESDEENTREGA = req.body.OBSERVACIONESDEENTREGA;
        const USUARIOMODIFICA = result.recordset[0].NOMBRECOMPLETO;  
        
        console.log(id);
         console.log(IDCLIENTE);
         console.log(DOCUMENTO);
         console.log(NOMBRECOMPLETO);
         console.log(IDEQUIPO);
         console.log(EQUIPO);
         console.log(SERIAL);
         console.log(IDDOCUMENTOGARANTIA);
         console.log(DOCUMENTOGARANTIA);
         console.log(IDOBSERVACIONENTREGA);
         console.log(OBSERVACIONENTREGA);
         console.log(OBSERVACIONESDEENTREGA);
         console.log(USUARIOMODIFICA);
        
        const pool = await getConnection();        
        await pool.request()
        .input("IDCLIENTE",sql.Numeric,IDCLIENTE)
        .input("DOCUMENTO",sql.VarChar,DOCUMENTO)
        .input("NOMBRECOMPLETO",sql.VarChar,NOMBRECOMPLETO)
        .input("IDEQUIPO",sql.Numeric,IDEQUIPO)
        .input("EQUIPO",sql.VarChar,EQUIPO)            
        .input("SERIAL",sql.VarChar,SERIAL)
        .input("IDDOCUMENTOGARANTIA",sql.Numeric,IDDOCUMENTOGARANTIA)
        .input("DOCUMENTOGARANTIA",sql.VarChar,DOCUMENTOGARANTIA)              
        .input("IDOBSERVACIONENTREGA",sql.Numeric,IDOBSERVACIONENTREGA)            
        .input("OBSERVACIONENTREGA",sql.VarChar,OBSERVACIONENTREGA)            
        .input("OBSERVACIONESDENETREGA",sql.VarChar,OBSERVACIONESDEENTREGA)        
        .input("USUARIOMODIFICA",sql.VarChar,USUARIOMODIFICA)                                
        .input("ID",sql.Numeric,id)
        .query(queries.actualizarPrestamo);


             
        

        

        if (IDEQUIPO != IDEQUIPOANTES) 
        {
            await pool.request()
            .input("PRESTADO",sql.VarChar,'SI')
            .input("IDLISTADOEQUIPO",sql.Numeric,IDEQUIPO)
            .query(queries.actualizarEquipo);


            await pool.request()
            .input("PRESTADO",sql.VarChar,'NO')
            .input("IDLISTADOEQUIPO",sql.Numeric,IDEQUIPOANTES)
            .query(queries.actualizarEquipo);
        }        
        
        res.redirect(paginaWeb+'/inicio');
              
                         
                 
    }
    catch (error)
    {
        res.status(500)
        res.send(error.message)
    }    
}

