var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({firstname: String,
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

mongoose.model('User', UserSchema);