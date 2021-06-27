const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://khalid:khalid21@cluster0.7ekau.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true});
// mongoose.connect('mongodb://localhost:27017/polio',
// {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log("Database Connected")
});
module.exports = db