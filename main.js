const http = require('http');
const fs = require('fs');

const axios = require('axios')

const getProveedores = async () => {
    try {

    return axios.get('https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json');
    
    } 
    catch (error) {
    console.error(error);
    }
    }

const getClientes = async () => {
    try {

    return axios.get('https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json');
    
    } 
    catch (error) {
    console.error(error);
    }
    }

    const principiohtml = '<head> \n\
    <title>Listado de Proveedores</title>\n\
    <meta charset="utf-8">\n\
    <meta name="viewport" content="width=device-width, initial-scale=1">\n\
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">\n\
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>\n\
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>\n\
    </head>\n\
    <br>\n\
    <center><h1>Listado de Proveedores</h1></center> \n\
    <br>\n\
    <table class="table">\n\
    <thead>\n\
      <tr>\n\
        <th scope="col">ID</th>\n\
        <th scope="col">Nombre Compañia</th>\n\
        <th scope="col">Nombre Contacto</th>\n\
      </tr>\n\
    </thead>\n\
    <tbody>\n';

    const principiohtml2 = '<head> \n\
    <title>Listado de Clientes</title>\n\
    <meta charset="utf-8">\n\
    <meta name="viewport" content="width=device-width, initial-scale=1">\n\
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">\n\
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>\n\
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>\n\
    </head>\n\
    <br>\n\
    <center><h1>Listado de Clientes</h1></center> \n\
    <br>\n\
    <table class="table">\n\
    <thead>\n\
      <tr>\n\
        <th scope="col">ID</th>\n\
        <th scope="col">Nombre Compañia</th>\n\
        <th scope="col">Nombre Contacto</th>\n\
      </tr>\n\
    </thead>\n\
    <tbody>\n';
    
    const finalhtml = '</tbody>\n\
    </table>\n';

var stringFProv='';
getProveedores().then( (response)=>
{
    let stringproveedor='';
    const arreglo=response.data;
    arreglo.forEach(element => 
        {
            const infofila = '<tr>\n\
            <th scope="row">'+element.idproveedor+'</th>\n\
            <td>'+element.nombrecompania+'</td>\n\
            <td>'+element.nombrecontacto+'</td>\n\
          </tr>\n'
          stringproveedor += infofila;
        });
    
    stringFProv= principiohtml+stringproveedor+finalhtml;
    // console.log(stringproveedor); 
    fs.writeFile('proveedores1.html', stringFProv, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;
    
        // success case, the file was saved
        console.log('Proveedores Cargados!');
    });
});

var stringFClient='';

getClientes().then( (response)=>
{
    let stringclientes='';    
    const arreglo=response.data;
    arreglo.forEach(element => 
        {
            const infofila = '<tr>\n\
            <th scope="row">'+element.idCliente+'</th>\n\
            <td>'+element.NombreCompania+'</td>\n\
            <td>'+element.NombreContacto+'</td>\n\
          </tr>\n'
          stringclientes += infofila;
        });

        stringFClient= principiohtml2+stringclientes+finalhtml;
    // console.log(stringclientes); 
    // console.log(stringproveedor); 
    fs.writeFile('clientes.html', stringFClient, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;
    
        // success case, the file was saved
        console.log('Clientes Cargados!');
    });
});


// fs.readFile('proveedores.html', 'utf8', function (err,data) {
//     if (err) {
//       return console.log(err);
//     }
//     var result = data.replace('je', '<h1>mamar chimbo</h1>');
  
//     fs.writeFile('proveedores.html', result, 'utf8', function (err) {
//        if (err) return console.log(err);
//     });
//   });




const server = http.createServer((req,res)=> 
{
    if(req.url === '/api/clientes')
    {
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(stringFClient);
        res.end();
    }

    if(req.url === '/api/proveedores')
    {
       res.writeHead(200,{'Content-Type':'text/html'});
       res.write(stringFProv);
       res.end();
    }
});

server.listen(8081);