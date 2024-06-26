require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const noteRoutes = require('./routes/noteRouter');



const app = express();

// Enable CORS
app.use(cors());



//middleware
app.use(express.json())

//routes
app.use('/api/notes',noteRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, './build')));

app.get('/*', function(req, res) { 
    res.sendFile(path.join(__dirname, './build', 'index.html')); 
});



//db connect
mongoose.connect(process.env.MONG_URI).then(()=>{
    //listen on port
    app.listen(process.env.PORT,()=>{
        console.log('connected to db and listening on port',process.env.PORT);
    });
}).catch((error)=>{
    console.log(error)
});
