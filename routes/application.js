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
                        var mail = createMail(user);
                        for (var i = 0; i < user.applications.length;++i){
                            if (user.applications[i].email != '')
                                sendConfirmMail(user.applications[i], res, mail);   
                        }

                        res.json(user)
                });
            }
        });
    });
    function sendConfirmMail(user, res, mail) {

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
            text: mail //, // plaintext body
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
        var headline = 'Hej!\n\n';
        var ending = '\n Bästa hälsingar\nMatilda och Emil\n\n';
        var ps = "PS\n Kom ihåg att du alltid kan logga in på sidan igen för att ändra din anmälan. Det går bra att ändra/uppdatera din anmälan fram till den 10:e juli."
        if(user.applications[0].attend){
            var duni = user.applications.length > 1? 'ni':'du'
            var row1 = 'Vad roligt att ' + duni + ' ska komma och fira vårt bröllop tillsammans med oss. \n\n';
            var row2 = 'I anmälan angavs följande information:\n\n';
            var attendees = '';
            for (var i=0; i < user.applications.length; ++i){
                var attendee = user.applications[i];
                var row3 = 'Förnamn: ' + attendee.firstname + '\n';
                var row4 = 'Efternamn: ' + attendee.lastname + '\n';
                var row5 = 'Epost: ' + attendee.email + '\n';
                var tmp = attendee.attend? 'Ja\n': 'Nej\n';
                var rowex = 'Kommer: ' + tmp;
                var row6 = attendee.transfer?'Transfer till fest: Ja\n':'';
                var alg1 = attendee.special_food.laktos?'Laktos, ':'';
                var alg2 = attendee.special_food.glukose?'Glukos, ':'';
                var alg3 = attendee.special_food.nuts?'Nötter, ':'';
                var alg4 = attendee.special_food.vegetarian?'Vegetariskt, ':'';
                var alg5 = attendee.special_food.other?attendee.special_food.other:'';

                var alg_complete = alg1 + alg2 + alg3 + alg4 + alg5;

                if (alg_complete){
                    var row7 = 'Specialmat/allergier: ' + alg_complete + '\n\n\n' ;
                }
                else{
                    var row7 = '\n\n\n';
                }

                if (attendee.notes){
                    var head = 'Meddelande:\n'
                    var message = attendee.notes?attendee.notes +'\n\n' :'';
                    var row8 = head + message;
                }
                else
                    var row8 = '';

                attendees += 'Deltagare ' + (i+1) + '\n' + row3+ row4 + row5 + rowex + row6 + row7 + row8 + '\n\n';
            }
            complete = headline + row1 + row2 + attendees + ending + ps;
        }
        else{
            var row1 = 'Vad tråkigt att du inte kan komma på vårt bröllop.  Vi ses en annan gång istället\n\n';
            complete = headline + row1 + ending + ps;
        }
      
        return complete
    }
}