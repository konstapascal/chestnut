const express = require('express');
const bodyParser = require('body-parser');

const keyRoutes = require('./routes/key-routes');

const app = express();

//extract any json coming, calls next automatically
app.use(bodyParser.json())

app.use('/api/keys',keyRoutes);

//error handling. if any middleware throws error this triggers
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }

    res.status(error.code || 500);

    res.json({message: error.message || 'An unknow error occured'});
})

app.listen(5000);