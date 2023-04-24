import React, { useState } from 'react';
import {
  Button,
  Grid,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { useStyles } from './styles';

interface Character {
  name: string;
  homeworld: string;
  homeworldPopulation: string;
  films: string[];
}

interface Movie {
  title: string;
  releaseDate: string;
  openingCrawl: string;
}

const App: React.FC = () => {
  const classes = useStyles();

  const [query, setQuery] = useState('');
  const [characters, setCharacters] = useState<Character[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleSearch = async () => {
    const response = await fetch(`https://swapi.dev/api/people/?search=${query}`);
    const data = await response.json();
    const results = data.results as Character[];
    setCharacters(results);
  };

  const handleCharacterClick = async (character: Character) => {
    const response = await fetch(character.homeworld);
    const data = await response.json();
    const homeworldPopulation = data.population;
    const movieUrls = character.films as string[];
    const movieResponses = await Promise.all(movieUrls.map(url => fetch(url)));
    const movieData = await Promise.all(movieResponses.map(response => response.json()));
    const movies = movieData.map(movie => ({
      title: movie.title,
      releaseDate: movie.release_date,
      openingCrawl: movie.opening_crawl.substring(0, 130),
    }));
    setMovies(movies);
  };

    return (
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={10}>
          <Paper elevation={2} className={classes.searchContainer}>
            <InputBase
              placeholder="Search for Star Wars characters"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className={classes.searchInput}
            />
          <Button variant="text" color="inherit" startIcon={<SearchIcon />} onClick={handleSearch}>
              Search
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className={classes.characterListContainer}>
            <Typography variant="h5" component="h2" gutterBottom className={classes.sectionTitle}>
              Characters
            </Typography>
            <List>
              {characters.map(character => (
                <ListItem key={character.name} button onClick={() => handleCharacterClick(character)}>
                  <ListItemText
                    primary={character.name}
                    secondary={`${character.homeworld}, population ${character.homeworldPopulation ? character.homeworldPopulation : "neutral" }`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className={classes.movieListContainer}>
            <Typography variant="h5" component="h2" gutterBottom className={classes.sectionTitle}>
            Movies
            </Typography>
            <List>
              {movies.map(movie => (
                <ListItem key={movie.title}>
                  <ListItemText
                    primary={`${movie.title} (${movie.releaseDate})`}
                    secondary={movie.openingCrawl}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    );
  }
  
  export default App