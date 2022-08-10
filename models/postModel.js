const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema ({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: false
    },

    category: {
        type: Schema.Types.ObjectId, 
        ref: 'category',
    },

    file: {
        type: String,
        default: '',
        required: false,
    },

    url: {
        type: String,
        default: '',
        required: false
    },

    format: {
        type: String,
        default: '',
        required: false
    },

    filter: [{
        type: String,
        default: '',
        required: false
    }]

})

module.exports = mongoose.model('admin', PostSchema)