const bodyParser = require("body-parser") // biblioteca que acabamos de isntalar pelo terminal
const express = require("express") // biblioteca que instalamos 
const app = express() // criar o servidor do app da biblioteca express

app.use(express.static('.')) // criar o servidor
app.use(bodyParser.urlencoded({
    extended: true
})) 
app.use(bodyParser.json()) //  middleware para ler dados do corpo da requisição(formulario)
const multer = require("multer") // middleware para lidar com uploads de arquivos 
 
const storage = multer.dickStorage({
    destination: function(req, file, callback){
        callback(null, './upload')
    },
    filename: function(req, file, callback){
        callback(null, '${Date.now()}_${file.originalname}')
    }
}) // Rotapost que recebe um arquivo

const upload = multer({storage }).single('arquivo')
// para salvar o arquivo no destino correto

app.post('/upload', (req, res) =>{
    upload(req, res, err => {
        if(err){
            return res.end('Ocorreu um erro.')
        }

        res.end('Concluído')
}
)