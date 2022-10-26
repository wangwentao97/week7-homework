let express = require('express');
let app = express();

app.use(express.json());

let Datastore = require('nedb');
let db = new Datastore('userinfo.db');

db.loadDatabase();

let userData = [];

app.post('/addUser', (req, res) => {
    console.log(req.body);

    let obj = {
        username: req.body.user,
        password: req.body.pword
    }

    db.insert(obj, (err, newDocs) => {
        if (err){
            res.json({task: "failed"});
        } else {
            res.json({task: "success"});
        }
        
    })
    //userData.push(obj);
    //console.log(userData);
})

app.use('/', express.static('public'));

app.get('/userInfo', (req, res) => {
    db.find({}, (err, docs) =>{
        if (err){
            res.json({task: "task failed"});
        } else {
            let obj = {data: docs};
            res.json(obj);
        }  
    })

    
}) 

let port = process.env.PORT || 3000;
app.listen(3000, ()=> {
    console.log('listening at localhost:3000');
})
