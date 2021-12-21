const express = require('express');
const app = express()
const port = process.env.PORT || 35200
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello');
});

app.listen(port, () => {
    console.log(`App listen on port ${port}`);
});