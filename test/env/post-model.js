const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/simpleId');

const schema = new mongoose.Schema({ name: String });
const Post = mongoose.model('post', schema);

module.exports = Post;
