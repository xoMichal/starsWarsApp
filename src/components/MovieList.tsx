import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Paper, Typography
} from '@material-ui/core';
import { Movie } from '../App';

export function MovieList(classes:any, movies: Movie[]) {
  return <Paper elevation={3} className={classes.movieListContainer}>
    <Typography variant="h5" component="h2" gutterBottom className={classes.sectionTitle}>
      Movies
    </Typography>
    <List>
      {movies.map(movie => (
        <ListItem key={movie.title}>
          <ListItemText
            primary={`${movie.title} (${movie.releaseDate})`}
            secondary={movie.openingCrawl} />
        </ListItem>
      ))}
    </List>
  </Paper>;
}
