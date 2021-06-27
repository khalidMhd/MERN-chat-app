const mongoose = require('mongoose');
// mongoose.connect('mongodb://khalid:khalid21@polio-shard-00-00.rfmfy.mongodb.net:27017,polio-shard-00-01.rfmfy.mongodb.net:27017,polio-shard-00-02.rfmfy.mongodb.net:27017/polio?ssl=true&replicaSet=atlas-nzxqqa-shard-0&authSource=admin&retryWrites=true&w=majority',
// {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true});
mongoose.connect('mongodb://localhost:27017/chat',
{useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log("Database Connected!")
});
module.exports = db