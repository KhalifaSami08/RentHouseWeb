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
      color:'white',
    },
    profile: {
      flexGrow: 1,
        color:'white',
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
              <IconButton>
                  <HomeIcon />               
              </IconButton>
          
              <Typography 
                className={classes.title} 
                variant="h6" 
                noWrap>
                RENTHOUSE PROJECT S.K.
              </Typography>
            </Link>
          </Grid>
          
          <IconButton className={classes.profile}>
            <Link to="/AdminProfile"> 
                  <Badge badgeContent={0} max={5} >
                      <AccountCircleRoundedIcon className={classes.profile} />
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