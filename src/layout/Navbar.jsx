import React from 'react';
import { 
  Badge,
  CssBaseline,
  // InputBase,
  Typography,
  IconButton,
  Toolbar,
  AppBar,
  Grid,
} from '@material-ui/core';
import { 
  createStyles, 
  makeStyles 
} from '@material-ui/core/styles';
import {
  // Search as SearchIcon,
  Home as HomeIcon,
  AccountCircleRounded as AccountCircleRoundedIcon,
} from '@material-ui/icons';

import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) =>
  createStyles({
    
    home: {
      flexGrow: 2,
      padding: theme.spacing(1),
    },
    title: {
      textAlign:'center',
      display: 'inline-block',
      position: 'absolute',
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },

    },
    profile: {
      flexGrow: 1,
    },
   /*  search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.secondary,
      width: '70%',
    //   marginRight: theme.spacing(2),
    
      [theme.breakpoints.between('xs', 'sm')]: {
        marginRight: theme.spacing(1),
      },
      [theme.breakpoints.between('sm','lg')]: {
        marginRight: theme.spacing(6),
      },
      [theme.breakpoints.up('lg')]: {
        marginRight: theme.spacing(12),
      },
    },
    searchIcon: {
      padding: theme.spacing(2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1),
      // Separation between search icon and begin of placeholder
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      
    }, */
  }),
);

const NavBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Grid container 
            className={classes.home}
            direction="column"
          >
            <Link to="/"> 
              <IconButton color = "secondary">
                  <HomeIcon />               
              </IconButton>
          
              <Typography 
                className={classes.title} 
                variant="h6" 
                color="secondary"
                noWrap>
                RENTHOUSE PROJECT S.K.
              </Typography>
            </Link>
          </Grid>
          
    {/*  <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Vous recherchez..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div> */}
          <IconButton className={classes.profile}>
            <Link to="/Owner"> 
                  <Badge badgeContent={2} max={5} color="secondary">
                      <AccountCircleRoundedIcon color="secondary" />
                  </Badge>
            </Link>
          </IconButton>

        </Toolbar>
      </AppBar>
      <CssBaseline />
    </div>
  );
}

export default NavBar;