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
          
          <IconButton className={classes.profile}>
            <Link to="/AdminProfile"> 
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