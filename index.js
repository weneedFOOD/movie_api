const express = require('express'),
  morgan = require('morgan'),
  fs = require('fs'), // import built in node modules fs and path 
  path = require('path');

  // Top 10 Movies
let topMovies = [
  {
    title: 'The Evil Dead',
    director: 'Sam Raimi'
  },
  {
    title: 'The Thing',
    director: 'John Carpenter'
  },
  {
    title: 'Interveiw with the Vampire',
    director: 'Neil Jordan'
    },
   {
    title: 'Predator',
    director: 'John McTiernan'
    },
    {
    title: 'Evil Dead 2',
    author: 'Sam Raimi'
    },
     {
    title: 'It',
    author: 'Andrés Muschietti'
    },
       {
    title: 'Hereditary',
    author: 'Ari Aster'
    },
    {
    title: 'Childs Play',
    author: 'Tom Holland'
    },
    {
    title: 'Alien',
    author: 'Ridley Scott'
    },
    {
    title: 'Teenage Mutant Ninja Turtles',
    author: 'Steve Barron'
    }    
];

const app = express();
// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));

app.use('/documentation.html', express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to myFlix!');
});

app.get('/secreturl', (req, res) => {
  res.send('This is a secret url with super top-secret content.');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
  