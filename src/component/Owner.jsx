import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Grid, 
  Typography, 
  Button, 
  CardMedia, 
  CardContent, 
  CardActions, 
  CardActionArea, 
  Card, 
} from '@material-ui/core';

import {
  Delete as DeleteIcon,
  AddCircle as AddCircleIcon,
  Edit as EditIcon,
  Pageview as PageViewIcon,
} from '@material-ui/icons';


const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    rootContainer: {
        margin : '1em', 
    }
});

const listofNotices = [
  {
    id: 0,
    title: "Starry Night",
    picture: 'public/Images/avatar.jpg',
  },
  {
    id: 1,
    title: "Wheat Field",
    picture: 'public/Images/avatar.jpg',
  },
    {
    id: 2,
    title: "Bedroom in Arles",
    picture: 'public//Images//avatar.jpg',
    },
    {
      id: 3,
      title: "Ouloulouu",
      picture: 'public//Images//avatar.jpg',
      }
  ];


const Profile = () => {
  const classes = useStyles();

  const history = useHistory();

  const redirectCRUD = e => {
    console.log(e.currentTarget.id);
    return history.push(history.location.pathname+'/'+e.currentTarget.id);
  };

  return (
    <Grid container 
      direction="column"
      justify="center"
      alignItems="center"
      spacing={3}
      className={classes.rootContainer}
      >
        <Grid item >
          
          <Button
            id='Create'
            size="large"
            color="primary"
            startIcon={<AddCircleIcon />}
            onClick={redirectCRUD}
          >  
            AJOUTER UN BIEN A LOUER
          </Button>
        </Grid>
        <Grid container item 
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
          className={classes.rootContainer}
          >
            {listofNotices.map( ( notice ) => (

              <Grid item
                key={notice.id}
                xs={12} sm={6} md={4} lg={3}
                >
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                    component="img"
                    alt={notice.title}
                    height="140"
                    image={notice.picture}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {notice.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                      across all continents except Antarctica
                    </Typography>
                    </CardContent>
                  </CardActionArea>

                  <CardActions>
                    <Button 
                      id={"Read/"+notice.id}
                      size="small" 
                      color="primary"
                      startIcon={<PageViewIcon />}
                      onClick={redirectCRUD}
                    >
                      Details
                    </Button>
                    <Button 
                      id={"Update/"+notice.id}
                      size="small" 
                      color="primary"  
                      startIcon={<EditIcon />}
                      onClick={redirectCRUD}
                    >
                      Modifier
                    </Button>
                    <Button 
                      id={"Delete/"+notice.id}
                      size="small"
                      color="primary"
                      startIcon={<DeleteIcon />}
                      // onClick={redirectCRUD}
                    >
                      Supprimer
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Grid>
    
  );
}

export default Profile;
