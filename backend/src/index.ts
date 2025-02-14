const express = require('express');
import type { Request as ExpressRequest, Response as ExpressResponse } from 'express';

const cors = require('cors');
const quizRoutes = require('./routes/quizRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api', quizRoutes);


app.get("/", (req: ExpressRequest, res: ExpressResponse) => {
    res.send("hello world");
});

app.get("/:id", (req: ExpressRequest, res: ExpressResponse) => {
    res.send("Hy");
});



app.post('/',(req: ExpressRequest, res: ExpressResponse)=>{
    res.send({
        data:req.body
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});