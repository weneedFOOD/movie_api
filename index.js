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
app.use(express.static('public'));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Welcome Page Text
app.get('/', (req, res) => {
  res.send('Welcome to myFlix!');
});

// Get movies
app.get(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    movies
      .find()
      .then((movie) => res.status(200).json(movie))
      .catch((err) => {
        console.err(err);
        res.status(500).send(`Error: ${err}`);
      });
  }
);

// Get director by name
app.get(
  "/movies/director/:name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { name } = req.params;
    movies
      .findOne({ "director.name": name })
      .then((movie) => {
        if (movie) {
          res.status(201).json(movie.director);
        } else {
          res.status(400).send(`Director ${name} not found`);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(`Err: ${err}`);
      });
  }
);

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
  