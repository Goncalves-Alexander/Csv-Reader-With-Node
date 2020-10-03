const express = require('express');
const server = express();
const multer = require('multer');
const fs = require('fs');

var arquivo = "";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    },
});
const upload = multer({ storage });


server.set('view engine', 'ejs');

server.get('/', (req, res) => res.render('home'));
server.post('/', upload.single('csv'), (req, res) => {
    // console.log(req.body, req.file);
    arquivo = req.file.filename;
    let teste = fs.readFileSync('./uploads/' + arquivo).toString().split('\n').filter(line => line);
    let nomes = [];

    for (let i = 0; i < teste.length; i++) {
        const element = teste[i].split(',');
        nomes.push(element);
    }

    for (let i = 1; i < nomes.length; i++) {
        const element = nomes[i][0];
        console.log(element);
    }
    res.send('ok');
})

server.listen(3000, () => console.log('Servidor rodando'));

