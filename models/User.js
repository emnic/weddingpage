var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    familyname: String,
    submitted: Boolean,
    num_participants: Number,
    user_role: String,
    applications: [{
        firstname: String,
        lastname: String,
        email: String,
        attend: Boolean,
        transfer: Boolean,
        notes: String,
        special_food: {
            laktos: Boolean,
            glukose: Boolean,
            nuts: Boolean,
            vegetarian: Boolean,
            other: String
        }
    }]
});


// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.updateApplication = function(applications, callback) {
  this.applications = applications;
  this.save(callback);
};

UserSchema.methods.submitApplication = function(submitStatus, callback) {
  this.submitted = submitStatus.submitStatus;
  this.num_participants = submitStatus.numParticipants;
  this.save(callback);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', UserSchema);