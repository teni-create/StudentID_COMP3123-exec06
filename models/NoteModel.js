/*Create a Mongo model to interact with
* the data in the database
* */

const mongoose = require("mongoose")

//Schema is a class defined within the mongoose library
//to set uo Collection (Table) of Documents (rows)
const NotesSchema = mongoose.Schema({
    noteTitle: {
        type:String,
        required: true
    },
    noteDescription: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ["HIGH", "MEDIUM", "LOW"],
        required: true
    },
    dateAdded: { //Method POST
        type: String,
        required:true
    },
    dateUpdated:{
        type:String,
        required: true
    }
})

module.exports = mongoose.model("Note", NotesSchema)