const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.post('/api/notes', (req, res) => {
    let noteEl = req.body
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err
        let database = JSON.parse(data)
        database.push(noteEl)
        console.log(database)
        fs.writeFile('./db/db.json', JSON.stringify(database), err => {
            if(err) throw err;
            console.log('database updated')
        })
    }) 
   res.redirect('/notes')
})

app.delete('/api/notes', (req, res) =>{
    req.unlink('./db/db.json', noteEl, err =>{
        if(err)throw err
        console.log('Note deleted!')
    })
})

app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, '/public/index.html'))
}); 

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'))
});


app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT} `)
);