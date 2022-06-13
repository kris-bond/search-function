import express from "express";
import cors from 'cors';
import Chance from 'chance';

const app = express();
app.use(cors());
app.use(express.json());

const chance = new Chance();

//converts array into array on ints
const animals =  [...Array(250).keys()].map(id => { 
    return {
        id,
        type: chance.animal(),
        age: chance.age(),
        name: chance.name(),
    }
});

//endpoint to search animals
app.get('', (req, res) => {

    //filter query by results
    const q = req.query.q?.toLowerCase() || '';
    const results = animals.filter(animal => animal.type.toLowerCase().includes(q));
    
    //send results back to app
    res.send(results)

});

app.listen(8080, () => console.log('Listening on port http://localhost:8080'));
