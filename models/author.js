
var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
})

// Virtual for author's full name.
AuthorSchema.virtual('name')
            .get(function(){ return this.family_name + ', ' + this.first_name });

// virtual for author's URL.
AuthorSchema.virtual('url')
            .get( () => { return '/catalog/author/' + this._id });

AuthorSchema.virtual('lifeSpan')
            .get( function(){
                var lifeTimeString = '';
                if(this.date_of_birth){
                    lifeTimeString = moment(this.date_of_birth).format('MMMM Do, YYYY');
                }

                lifeTimeString += '-';

                if(this.date_of_death){
                    lifeTimeString += moment(this.date_of_death).format('MMMM Do, YYYY');
                }

                return lifeTimeString;
            });

AuthorSchema.virtual('date_of_birth_formatted')
            .get(function(){
                return moment(this.date_of_birth).format('YYYY-MM-DD');
            });

AuthorSchema.virtual('date_of_death_formatted')
            .get( () => {return moment(this.date_of_death).format('YYYY-MM-DD');});

// export module
module.exports = mongoose.model('Author', AuthorSchema);