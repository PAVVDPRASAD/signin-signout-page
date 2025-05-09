const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);

mongoose.connect("mongodb+srv://arunpechetti:B67bbL6VFoL3EqTS@cluster0.tcmi2lx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" , {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.log(err);
});

app.get('/', (req,res)=> {
    res.send("Hello, This is the server side of the application.");
});

app.listen(5000, ()=> console.log('Server is running on port 5000'));