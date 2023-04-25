import React from 'react';
import { Button, InputBase, Paper } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

export function AppBar(classes:any, query: string, setQuery: React.Dispatch<React.SetStateAction<string>>, handleSearch: () => Promise<void>) {
  return <Paper elevation={2} className={classes.searchContainer}>
    <InputBase
      placeholder="Search for Star Wars characters"
      value={query}
      onChange={e => setQuery(e.target.value)}
      className={classes.searchInput} />
    <Button variant="text" color="inherit" startIcon={<SearchIcon />} onClick={handleSearch}>
      Search
    </Button>
  </Paper>;
}
