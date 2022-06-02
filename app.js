const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();


dotenv.config();


const port = process.env.PORT;

// connect to atlas database
// make sure to replace my db string & creds with your own
mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to MongoDB!');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(port, () => {
    console.log(`now listening for requests on port ${port}`);
});