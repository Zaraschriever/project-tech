const express = require('express');
const app = express();
const expbs = require('express-handlebars');
const path = require('path');

// app.engine('handlebars', expbs());
// app.set('view engine', 'handlebars');
// app.set('views', path.join(__dirname,'/views'));

// homepage
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('Server is starting at port', 3000);
});


// app.listen(port, () => {
//     console.log('example app listening at http://localhost:3000')
// })

// profiel pagina


// 404 page
// app.use((req, res) => {
//     res.status(404).send('404 Not Found')
// })

