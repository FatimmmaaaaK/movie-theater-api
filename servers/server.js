const express = require('express');
const port= 3000;
const {db} = require("./db");
const app = express ()

const showRoutes = require('./routes/showRoutes')
const userRoutes = require('./routes/userRoutes')

app.use(express.json()) 

app.use('./models/Show.js', showRoutes)
app.use('./models/User.js', userRoutes)


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})
