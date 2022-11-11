import sql from 'mssql'

const dbSettings  = {
    user : 'admin',
    password : 'Gabriela8*',
    server :'18.191.110.67',
    database:'CRMFONTANAR',
    options: {
        encrypt: false,
        trustServerCertificate: true,
        } 
}

export async function  getConnection() {
    try
    {
        const pool = await sql.connect(dbSettings);
        return pool;
    }
    catch(error)
    {
        console.error(error);
    }
}



export { sql };
