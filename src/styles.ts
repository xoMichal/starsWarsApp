import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  searchContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
  },
  searchInput: {
    marginRight: theme.spacing(1),
    width: '80%',
    paddingLeft:'16px'
    
  },
  searchButton: {
    minWidth: 'unset',
  },
  characterListContainer: {
    paddingRight: theme.spacing(2),
     paddingLeft: theme.spacing(2),
    borderRight: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('sm')]: {
      paddingRight: 0,
      borderRight: 'none',
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  },
  movieListContainer: {
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
    },
  },
  sectionTitle: {
    marginBottom: theme.spacing(2),
  },
  container: {
    maxWidth: '1600px',
    margin: '0px',
    padding: '16px',
    justifyContent:'left',
      },
}));




export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#F8BB0C',
    },
    secondary: {
      main: '#FA8231',
    },
    error: {
      main: '#F012BE',
    },
    background: {
      default: grey[800],
      paper: '#333333',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B1B1B1',
    },
  },
  
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    h5: {
      fontWeight: 'bold',
      letterSpacing: '0.03em',
      textTransform: 'uppercase',
    },
  },
});
