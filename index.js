const express = require('express');
const path = require('path');
const port = 8000;

const app = express();

var contactList = [
    {
        person : 'Raju',
        phone : '123456789',
    },
    {
        person : 'Raju1',
        phone : '123456789',
    },
    {
        person : 'Raju2',
        phone : '123456789',
    },
    {
        person : 'Raju3',
        phone : '123456789',
    },
    {
        person : 'Raju4',
        phone : '123456789',
    },
    {
        person : 'Raju5',
        phone : '123456789',
    }
]

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views') );
app.use(express.urlencoded());

app.get('/', function(req, res){
    // console.log(__dirname);
    // res.send('<h1>Cool ! It is running</h1>');

    return res.render('home', { 
        title : 'My Contact List',
        contact_list : contactList,
    });
});

app.get('/about', function(req, res){
    return res.render('about', {
        title : 'About Developer',
        heading : 'About Developer',
        para : 'Hi I am Rajendra The Developer',
    })
});

app.post('/add-contact', function(req, res){
    contactList.push({
        person : req.body.person,
        phone : req.body.phone,
    });
    res.redirect('/');
    // console.log(req.body);
    // return;
    // return res.send(.toString());
})







app.listen(port, function(err){
    if(err){
        console.log('Error : ', err);
    }
    console.log('Express server running on port : ', port);
});