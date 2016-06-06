'use strict';
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');
var nodemailer = require('nodemailer');

module.exports = function(app, auth){

    /* GET users listing. */
    app.get('/', function(req, res, next) {
      User.find(function(err, application){
        if(err){ return next(err); }
        res.json(application);
      });
    });

    app.put('/:user/application', function(req, res, next) {
         
        User.findById(req.params.user, function(err, user) {
            if (!user)
                return next(new Error('Could not find user'));
            else {
                user.updateApplication(req.body, function (err, user) {
                    if (err) return next(err);

                    res.json(user)
                });
            }
        });
    });
    app.put('/:user/application/submit', function(req, res, next) {
         
        User.findById(req.params.user, function(err, user) {
            if (!user)
                return next(new Error('Could not find user'));
            else {
                user.submitApplication(req.body, function (err, user) {
                    if (err) return next(err);
                        for (var i = 0; i < user.applications.length;++i){
                            if (user.applications[i].email != '')
                                sendConfirmMail(user.applications[i],res);   
                        }

                        res.json(user)
                });
            }
        });
    });
    function sendConfirmMail(user, res) {

        // Not the movie transporter!
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'noreply.angelholmsbrollop@gmail.com',
                pass: 'AnmalaSkaManGora11235'
            }
        });
        
        console.log(user.email)
        
        var mailOptions = {
            from: 'noreply.angelholmsbrollop@gmail.com', // sender address
            to: user.email, // list of receivers
            bcc: 'info.angelholmsbrollop@gmail.com',
            subject: 'Tack för ditt svar', // Subject line
            text: createMail(user) //, // plaintext body
            // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
                console.log('ErrorError')
                //res.json({yo: 'error'});
            }else{
                console.log('Message sent: ' + info.response);
            };
        });
    };

    function createMail(user){
        var complete = '';
        var headline = 'Hej ' + user.firstname + ',\n\n';
        var ending = '\n Bästa hälsingar\nMatilda och Emil';
        if(user.attend){
            var row1 = 'Vad roligt att du ska komma och fira vårt bröllop tillsammans med oss \n\n';
            var row2 = 'I din anmälan angav du följande information:\n\n';
            var row3 = 'Förnamn: ' + user.firstname + '\n';
            var row4 = 'Efternamn: ' + user.lastname + '\n';
            var row5 = 'Epost: ' + user.email + '\n';     
            var row6 = user.transfer?'Transfer till fest: Ja\n':'';
            var alg1 = user.special_food.laktos?'Laktos, ':'';
            var alg2 = user.special_food.glukose?'Glukos, ':'';
            var alg3 = user.special_food.nuts?'Nötter, ':'';
            var alg4 = user.special_food.vegetarian?'Vegetariskt, ':'';
            var alg5 = user.special_food.other;
            var alg_complete = alg1 + alg2 + alg3 + alg4 + alg5;
            
            if (alg_complete){
                var row7 = 'Specialmat/allergier: ' + alg_complete + '\n\n\n' ;
            }
            else{
                var row7 = '';
            }
            
            complete = headline + row1 + row2 + row3+ row4 + row5 + row6 + row7 + ending;
        }
        else{
            var row1 = 'Vad tråkigt att du inte kan komma på vårt bröllop.  Vi ses en annan gång istället\n\n';
            complete = headline + row1 + ending;
        }
      
        return complete
    }
}