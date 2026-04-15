require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

app.listen(3000, () => { console.log('Server running on port 3000') });

const onePiece = mongoose.model('onepiece', new mongoose.Schema({

    name: String,
    race: String,
    age: Number,
    weapon: String,
    devilfruit: String,
    faction: String

}));

app.get('/api/pokemon', async (req, res) => {
    const onepiece = await onePiece.find();
    res.send(onepiece);
    console.log("Fetched All Crewmember!");
});

app.post('/api/pokemon', async(req, res) => {
    const onepiece = new onePiece (req.body);
    await onepiece.save();
    res.send(onepiece); console.log('Added new crew member', onepiece);
});

app.delete('/api/pokemon/:id', async(req, res) =>{
    await onePiece.findByIdAndDelete(req.params.id);
    res.status(204).send;
});

app.put('/api/pokemon/:id',async(req,res) => {
    const updateOnePiece = await onePiece.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.send(updateOnePiece);
})