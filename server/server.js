const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/test', (req, res) => {
    res.send({message: 'hello from backend'}).status(200)
})


app.listen(3001, () => console.log('listening on port 3001'));