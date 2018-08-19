
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = new Schema({
    title: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'Author', required: true}, // The 'ref' tells the schema which model can be assigned to this field.

    summary: {type: String},
    isbn: {type: String, required: true},
    genre: [{type: Schema.Types.ObjectId, ref: 'Genre'}]
});

// virtual book's URL.
BookSchema.virtual('url')
          .get( () => {return `/catalog/book/${this._id}`});

// export module.
module.exports = mongoose.model('Book', BookSchema);