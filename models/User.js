var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var UserSchema = mongoose.Schema({username: {type: String, default: 'admin'},
                                  password: {type: String, default: 'admin'},
                                  firstname: String,
                                  lastname: String,
                                  email: String,
                                  attend: Boolean,
                                  transfer: Boolean,
                                  special_food: {laktos: Boolean,
                                                 glukose: Boolean,
                                                 nuts: Boolean,
                                                 vegetarian: Boolean,
                                                 other: String
                                    }
                                     

});


// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', UserSchema);