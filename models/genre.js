
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var genreSchema = new Schema({
    name: {type: String, min: 3, max: 100, enum: ['Fantasy', 'Science Fiction', 'French Poetry'], required: true}
});

// virtual for genre's URL.
genreSchema.virtual('url')
           .get( () => {return '/catalog/genre/' + this._id});

// export module.
module.exports = mongoose.model('Genre', genreSchema);