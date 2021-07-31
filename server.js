var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(__dirname + '/public'));
app.use("/public/js", express.static(path.join(__dirname, "/public/scripts")));
app.set('view engine', 'ejs');

//Conexão com mongoDB
const {MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)

const dbName = 'importcsv';

async function main() {
    // Use connect method to connect to the server
    await client.connect()
    console.log('Connected successfully to server')
    const db = client.db(dbName)
    const collection = db.collection('data2')

    const findResult = await collection.find({}).toArray();
    // the following code examples can be pasted here...
    return findResult
}


//#####

//#######################




const neatCsv = require('neat-csv');
var file = require('fs');
var varcsv = [];
    file.readFile('./file_hackaton1.csv', async(err, data) => {
        if (err) {
            console.error(err + "Não conseguimos abrir seu arquivo");
        }else{
            varcsv = await neatCsv(data);
            console.log ('foi')
        }
        
    });



//########### Rotas ###############
app.get('/', (req, res) =>{
    res.render('inicial');
});
app.get('/parametro:opcao', (req, res) => {
    async function organizarLista(){
        var listaBanco = [];
        if(req.query.opcao ==="CSV"){
            listaBanco = varcsv;
        }
        else{
            listaBanco = await main().then(console.log('Realizando consulta!')).catch(console.error).finally(() => client.close());
        }
        
        listaBanco.forEach(elemento =>{
            if (!(nomes.includes(elemento['product/ProductName']))){
                nomes.push(elemento['product/ProductName'])
            }
        });
        
        for(var i=0; i<nomes.length; i++){
            var lista = [];
            var totalusage = 0;
            listaBanco.forEach(elemento =>{
                if(elemento['product/ProductName']===nomes[i]){
                    lista.push(elemento);
                    totalusage += parseFloat(elemento['lineItem/UsageAmount']);
                    
                }
            });
            todas.push(lista);
            usos.push(totalusage);
        }
        res.render('index',{'variavel':todas, 'nomes': nomes, 'usage': usos,
                        });
    }
    if(req.query.opcao === 'CSV'){
        
    }
    var todas = [];
    var nomes = [];
    var usos = [];
    organizarLista();

        
});
app.get('/parametro:opcao', (req, res)=>{
    console.log(req.query.opcao)
    res.send("olá");
});

app.get("scripts/site.js", function(req, res){
    res.send("./scripts/chart.js");
});
  
app.listen(3000, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", 3000);
});