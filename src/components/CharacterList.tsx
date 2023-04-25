import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Paper, Typography
} from '@material-ui/core';
import { Character } from '../App';

export function CharacterList(classes:any, characters: Character[], handleCharacterClick: (character: Character) => Promise<void>) {
  return <Paper elevation={3} className={classes.characterListContainer}>
    <Typography variant="h5" component="h2" gutterBottom className={classes.sectionTitle}>
      Characters
    </Typography>
    <List>
      {characters.map(character => (
        <ListItem key={character.name} button onClick={() => handleCharacterClick(character)}>
          <ListItemText
            primary={character.name}
            secondary={`${character.homeworld}, population ${character.homeworldPopulation ? character.homeworldPopulation : "neutral"}`} />
        </ListItem>
      ))}
    </List>
  </Paper>;
}
