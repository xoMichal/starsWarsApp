import React, { useState } from 'react';
import {
  Grid,
  ThemeProvider,
} from '@material-ui/core';
import { theme, useStyles } from './styles';
import { MovieList } from './components/MovieList';
import { AppBar } from './components/AppBar';
import { CharacterList } from './components/CharacterList';


export interface Character {
  name: string;
  homeworld: string;
  homeworldPopulation: string;
  films: string[];
}

export interface Movie {
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
    try {
      const response = await fetch(`https://swapi.dev/api/people/?search=${query}`);
      const data = await response.json();
      const results = data.results as Character[];
      setCharacters(results);
      return data; 
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

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
      <ThemeProvider theme={theme}>
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={10}>
          {AppBar(classes, query, setQuery, handleSearch)}
        </Grid>
        <Grid item xs={12} md={6}>
          {CharacterList(classes, characters, handleCharacterClick)}
        </Grid>
        <Grid item xs={12} md={6}>
          {MovieList(classes, movies)}
        </Grid>
      </Grid>
      </ThemeProvider>
    );
  }
  
  export default App


