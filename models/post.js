const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title:{type: 'string',required: true},
    author: {type: 'string', default:'Roberto'}
});

module.exports = mongoose.model('Post', postSchema);
