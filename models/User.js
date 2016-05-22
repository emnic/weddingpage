var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({firstname: String,
                                      lastname: String,
                                      attend: Boolean,
                                      transfer: Boolean,
                                      allergies: {laktos: Boolean,
                                                  glukose: Boolean,
                                                  nuts: Boolean,
                                                  vegetarian: Boolean,
                                                  other: String}
                                     

});

mongoose.model('User', UserSchema);