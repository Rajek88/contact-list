const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();

// var contactList = [
//     {
//         person : 'Raju',
//         phone : '123456789',
//     },
//     {
//         person : 'Raju1',
//         phone : '123456789',
//     },
//     {
//         person : 'Raju2',
//         phone : '123456789',
//     },
//     {
//         person : 'Raju3',
//         phone : '123456789',
//     },
//     {
//         person : 'Raju4',
//         phone : '123456789',
//     },
//     {
//         person : 'Raju5',
//         phone : '123456789',
//     }
// ]

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views') );
app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/', function(req, res){
    // console.log(__dirname);
    // res.send('<h1>Cool ! It is running</h1>');

    Contact.find({}, function(err, allContacts){
        if(err){
            console.log('Error fetching contacts : ', err);
            return;
        }

        return res.render('home', { 
            title : 'My Contact List',
            contact_list : allContacts,
            // contact_list : Contact,
        });

    });

    
});


app.get('/delete/', function(req, res){

    //get id from the request parameter in url


    console.log(req.query);
    let id = req.query.id;

    //find contact in database using id and delete it
    // let contactIndex = contactList.findIndex( contact => contact._id == id);

    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error deleting the contact, Error : ', err);
            return;
        }
        res.redirect('back');
    });
    // contactList.splice(contactIndex, 1);

    // res.redirect('back');

});

app.get('/about', function(req, res){
    return res.render('about', {
        title : 'About Developer',
        heading : 'About Developer',
        para : 'Hi I am Rajendra The Developer',
    })
});

app.post('/add-contact', function(req, res){
    // console.log(req);
    // contactList.push({
    //     person : req.body.person,
    //     phone : req.body.phone,
    // });
    console.log(req.body);
    // contactList.push(req.body);

    Contact.create({
        person : req.body.person,
        phone : req.body.phone,
    }, function(err, newContact){
        if(err){
            console.log('Error : ', err);
        }
        else{
            console.log('newContact : ',newContact);
        }
        return;
    });
    return res.redirect('back');
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