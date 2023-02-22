const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://sanjuth:sanjuth2003@users.7zmjbe1.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

function connection(){
    mongoose.connection
      .once('open', () => console.log('Connected to the database!'))
      .on('error', err => console.log('Error with the database!', err));
}

module.exports=connection;