require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

app.listen(3000, () => { console.log('Server running on port 3000') });

const Onepiece = mongoose.model('onepiece', new mongoose.Schema({

name: String, 
race: String, 
age: Number, 
weapon: String, 
devilfruit: String, 
faction: String

}));

app.get('/api/onepiece', async (req, res) => {
    const onepiece = await Onepiece.find();
    res.send(onepiece);
    console.log("Fetched All crew members!");
});

app.post('/api/onepiece', async(req, res) => {
    const onepiece = new Onepiece (req.body);
    await onepiece.save();
    res.send(onepiece); console.log('Added new member', onepiece); 
});

app.delete('/api/onepiece/:id', async(req, res) =>{
    await Onepiece.findByIdAndDelete(req.params.id);
    res.status(204).send;
})

app.put('/api/onepiece/:id', async (req, res) => {
    const updateOnepiece = await Onepiece.findByIdAndUpdate
    (req.params.id, req.body, {new: true});
    res.send(updateOnepiece); 
})