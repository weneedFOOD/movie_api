const express = require('express'),
  morgan = require('morgan'),
  fs = require('fs'), // import built in node modules fs and path 
  path = require('path'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');


let users = [
  {
    id: 1,
    name: "Jon",
    favoriteMovies: ["Teenage Mutant Ninja Turtles"]
  },
  {
    id: 2,
    name: "Anna",
    favoriteMovies: ["It"]
  },
  {
    id: 3,
    name: "Didi",
    favoriteMovies: ["The Evil Dead"]
  }
]

  // Top 10 Movies
let movies = [
  {
    "Title": "The Evil Dead",
    "Description": "The movie revolves around the Necronomicon Ex-Mortis, an ancient Sumerian text that wreaks havoc upon a group of cabin inhabitants in a wooded area in Tennessee.",
    "Genre": {
      "Name": "Horror",
      "Description": "A genre of literature, film, and television that is meant to scare, startle, shock, and even repulse audiances."
    },
    "Director": {
      "Name": "Sam Raimi",
      "Bio": "Raimi became fascinated with making films when his father brought a movie camera home one day. He began to make Super 8 movies with his friend Bruce Campbell, whom he met in 1975. In college, he teamed up with his brother's roommate Robert Tapert and Campbell to shoot Within the Woods (1978), a 32-minute horror film which raised $375,000, as well as his debut feature film It's Murder!. During that time, he also shot the seven-minute short film Clockwork (1978), starring Scott Spiegel (who had appeared in Within the Woods) and Cheryl Guttridge. Through family, friends, and a network of investors, Raimi was able to finance production of the highly successful horror film The Evil Dead (1981) which became a cult hit and effectively launched Raimi's career.",
      "Birth": "October 23, 1959"
    },
    "ImageURL": "https://images.app.goo.gl/vQeYSnoyh11MiC6VA",
    "Featured": false
  },
  {
    "Title": "The Thing",
    "Description": "Based on the 1938 John W. Campbell Jr. novella Who Goes There?, it tells the story of a group of American researchers in Antarctica who encounter the eponymous, a parasitic extraterrestrial life-form that assimilates, then imitates, other organisms.",
    "Genre": {
      "Name": "Horror",
      "Description": "A genre of literature, film, and television that is meant to scare, startle, shock, and even repulse audiances."
    },
    "Director": {
      "Name": "John Carpenter",
      "Bio": "Is an American filmmaker, actor, and composer. Although he has worked in various film genres, he is most commonly associated with horror, action, and science fiction films of the 1970s and 1980s. He is generally recognized as one of the greatest masters of the horror genre.",
      "Birth": "January 16, 1948"
    },
    "ImageURL": "https://images.app.goo.gl/jH5SrAXhmwZb6vj58",
    "Featured": false
  },
  {
    "Title": "Interveiw with the Vampire",
    "Description": "American gothic horror film based on Anne Rice's 1976 novel of the same name, and starring Tom Cruise and Brad Pitt. It focuses on Lestat (Cruise) and Louis (Pitt), beginning with Louis's transformation into a vampire by Lestat in 1791.",
    "Genre": {
      "Name": "Horror",
      "Description": "A genre of literature, film, and television that is meant to scare, startle, shock, and even repulse audiances."
    },
    "Director": {
      "Name": "Neil Jordan",
      "Bio": "Neil Jordan's career began in the late 1970s working for the Irish television channel, RTÉ. Included in his work was writing storylines for the children's fantasy series, Wanderly Wagon.Unconventional sexual relationships are a recurring theme in Jordan's work, and he often finds a sympathetic side to characters that audiences would traditionally consider deviant or downright horrifying. His film The Miracle, for instance, followed two characters who struggled to resist a strong, incestuous attraction. Interview with the Vampire, like the Anne Rice book it was based on, focused on the intense, intimate interpersonal relationship of two undead men who murder humans nightly (although the pair never have sex, they are clearly lovers of a sort), accompanied by an equally complex vampire woman who is eternally trapped in the body of a little girl. While Lestat (Tom Cruise) is depicted in an attractive but villainous manner, his partner Louis (Brad Pitt) and the child vampire Claudia (Kirsten Dunst) are meant to capture the audience's sympathy despite their predatory nature.",
      "Birth": "February 25, 1950"
    },
    "ImageURL": "https://images.app.goo.gl/6nHi9D8FMKYDQzMM9",
    "Featured": false
  },
  {
    "Title": 'Predator',
    "Description": "It stars Arnold Schwarzenegger as the leader of an elite paramilitary rescue team on a mission to save hostages in guerrilla-held territory in a Guatemala Central American rainforest, who encounter the deadly Predator (Kevin Peter Hall), a skilled, technologically advanced alien who stalks and hunts them down.",
    "Genre": {
      "Name": "Horror",
      "Description": "A genre of literature, film, and television that is meant to scare, startle, shock, and even repulse audiances."
    },
    "Director": {
      "Name": "John McTiernan",
      "Bio": "Is an American filmmaker. He is best known for his action films, especially Predator (1987), Die Hard (1988), and The Hunt for Red October (1990). His later well-known films include the action-comedy-fantasy film Last Action Hero (1993), the action film sequel Die Hard with a Vengeance (1995), the heist-film remake The Thomas Crown Affair (1999), and The 13th Warrior (1999). His last completed feature film was the mystery-thriller Basic, released in 2003.",
      "Birth": "January 8, 1951"
    },
    "ImageURL": "https://images.app.goo.gl/w6z2btRvPVH3h4VW8",
    "Featured": false 
  },
  {
    "Title": "Evil Dead 2",
    "Description": "The second of three films in the Evil Dead series is part horror, part comedy, with Ash Williams (Bruce Campbell) once again battling horrifying demons at a secluded cabin in the woods. After discovering an audiotape left by a college professor that contains voices reading from the Book of the Dead, Ash's girlfriend Linda (Denise Bixler) becomes possessed by evil spirits that are awakened by the voices on the tape. Ash soon discovers there is no escaping the woods.",
    "Genre": {
      "Name": "Horror",
      "Description": "A genre of literature, film, and television that is meant to scare, startle, shock, and even repulse audiances."
    },
    "Director": {
      "Name": "Sam Raimi",
      "Bio": "Raimi became fascinated with making films when his father brought a movie camera home one day. He began to make Super 8 movies with his friend Bruce Campbell, whom he met in 1975. In college, he teamed up with his brother's roommate Robert Tapert and Campbell to shoot Within the Woods (1978), a 32-minute horror film which raised $375,000, as well as his debut feature film It's Murder!. During that time, he also shot the seven-minute short film Clockwork (1978), starring Scott Spiegel (who had appeared in Within the Woods) and Cheryl Guttridge. Through family, friends, and a network of investors, Raimi was able to finance production of the highly successful horror film The Evil Dead (1981) which became a cult hit and effectively launched Raimi's career.",
      "Birth": "October 23, 1959"
    },
    "ImageURL": "https://images.app.goo.gl/U3TVyJo1SrTxkeLi9",
    "Featured": false
  },
  {
    "Title": "It",
    "Description": "Set in Derry, Maine, the film tells the story of The Loser's Club, a group of seven outcast children who are terrorized by the eponymous being which emerges from the sewer, only to face their own personal demons in the process.",
    "Genre": {
      "Name": "Horror",
      "Description": "A genre of literature, film, and television that is meant to scare, startle, shock, and even repulse audiances."
    },
    "Director": {
      "Name": "Andrés Muschietti",
      "Bio": "An Argentine filmmaker who achieved wide recognition with the 2013 film Mama which he made with Neil Cross and his sister, producer and screenwriter Barbara Muschietti, based on their three-minute film of the same name. The short, which he made at age 35, had attracted the attention of Guillermo del Toro, who then served as executive producer on the feature adaptation. He gained further recognition for directing both films in the It film series, the first being the 2017 film adaptation of the Stephen King novel It, which became the highest-grossing horror film of all time.",
      "Birth": "August 26, 1973"
    },
    "ImageURL": "https://images.app.goo.gl/cmzF3pxNrY37mUmF6",
    "Featured": false
  },
  {
    "Title": "Hereditary",
    "Description": "A grieving family is haunted by tragic and disturbing occurrences. When her mentally ill mother passes away, Annie (Toni Collette), her husband (Gabriel Byrne), son (Alex Wolff), and daughter (Milly Shapiro) all mourn her loss.",
    "Genre": {
      "Name": "Horror",
      "Description": "A genre of literature, film, and television that is meant to scare, startle, shock, and even repulse audiances."
    },
    "Director": {
      "Name": "Ari Aster",
      "Bio": "An American film director, screenwriter, and producer. He is known for writing and directing the A24 horror films Hereditary (2018) and Midsommar (2019). Aster was born into a Jewish family in New York City, the son of a poet mother and musician father. He has a younger brother.",
      "Birth": "July 15, 1986"
    },
    "ImageURL": "https://images.app.goo.gl/J2MQWgwLYDdv8SUr9",
    "Featured": false
  },
  {
    "Title": 'Childs Play',
    "Description": "A single mother gives her son a much sought-after doll for his birthday, only to discover that it is possessed by the soul of a serial killer.",
    "Genre": {
      "Name": "Horror",
      "Description": "A genre of literature, film, and television that is meant to scare, startle, shock, and even repulse audiances."
    },
    "Director": {
      "Name": "Tom Holland",
      "Bio": "Tom Holland is an American director and screenwriter of horror and thriller films. His early writing projects include Class of 1984 (1982) and the Robert Bloch- inspired Psycho II (1983), the latter starring Anthony Perkins as the menacing psychopath, Norman Bates.",
      "Birth": "July 11, 1943"
    },
    "ImageURL": "https://images.app.goo.gl/2TzNuHmru5RDRKSj8",
    "Featured": false
  },
  {
    "Title": "Alien",
    "Desciption": "Based on a story by O'Bannon and Ronald Shusett, it follows the crew of the commercial space tug Nostromo, who, after coming across a mysterious derelict spaceship on an uncharted planetoid, find themselves up against an aggressive and deadly extraterrestrial set loose on the Nostromo.",
    "Genre": {
      "Name": "Horror",
      "Description": "A genre of literature, film, and television that is meant to scare, startle, shock, and even repulse audiances."
    },
    "Director": {
      "Name": "Ridley Scott",
      "Bio": "an English film director and producer. Best known for directing films in the science fiction and historical drama genres, his work is known for its atmospheric and highly concentrated visual style.",
      "Birth": "November 30, 1937"
    },
    "ImageURL": "https://images.app.goo.gl/bwUdnYZpbJaRTAbZ7",
    "Featured": false
  },
  {
    "Title": "Teenage Mutant Ninja Turtles",
    "Description": "Teenage Mutant Ninja Turtles follows the Turtles on a quest to save their master, Splinter, with their new allies, April O'Neil and Casey Jones, from the Shredder and his Foot Clan. It adapts the early Teenage Mutant Ninja Turtles comics, with several elements taken from the animated series airing at the time.",
    "Genre": {
      "Name": "Action",
      "Description": "a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats."
    },
    "Director": {
      "Name": "Steve Barron",
      "Bio": "A director and producer, best known for directing the films Coneheads (1993), Teenage Mutant Ninja Turtles (1990) and the innovative music videos for a-ha and Michael Jackson's . He was born in Dublin, Ireland, the son of filmmaker Zelda Barron.",
      "Birth": "May 4, 1956"
    },
    "ImageURL": "https://images.app.goo.gl/PwjnDzNAHayhm9q98",
    "Featured": false
  }    
];

const app = express();
// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to myFlix!');
});

app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});

// CREATE
app.post('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser)
  } else {
    res.status(400).send('users need names')
  }
})

// UPDATE
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user= users.find( user => user.id == id );

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send('no such user')
  }
})

// CREATE
app.post('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find( user => user.id == id );

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);;
  } else {
    res.status(400).send('no such user')
  }
})

// DELETE
app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find( user => user.id == id );

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
    res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);;
  } else {
    res.status(400).send('no such user')
  }
})

// DELETE
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  let user = users.find( user => user.id == id );

  if (user) {
    users = users.filter( user => user.id != id);
    res.status(200).send(`user ${id} has been deleted`);
  } else {
    res.status(400).send('no such user')
  }
})

// READ
app.get('/movies',(req, res) => {
    res.status(200).json(movies);
});

// READ
app.get('/movies/:title', (req, res) => {
  const { title } = req.params;
  const movie = movies.find( movie => movie.Title === title );

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('no such movie')
  }
})

// READ
app.get('/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find( movie => movie.Genre.Name === genreName ).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('no such genre')
  }
})

// READ
app.get('/directors/:directorName', (req, res) => {
  const { directorName } = req.params;
  const director = movies.find( movie => movie.Director.Name === directorName ).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send('no such director')
  }
})


//listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});