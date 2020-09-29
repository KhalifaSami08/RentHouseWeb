import React from 'react';
// import axios from 'axios';
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
  Box, 
  Tabs, 
  Tab, 
  AppBar, 
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


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Grid
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Grid>{children}</Grid>
        </Box>
      )}
    </Grid>
  );
}

const Profile = () => {

  const classes = useStyles();
  const history = useHistory();

  const [value, setValue] = React.useState(0);
  const [listofNotices,setListofNotices] = React.useState([]); 


  /* React.useEffect(() =>{

      async function getData(){

        await axios.get("http://localhost:5000/api/property")
        .then(res => {return res.json()})
        .then(data => {
            console.log("API OK : "+data);
            setListofNotices({ data })
          }
        )
        .catch(error => {
          if (!error.response) {
              // network error
              console.log('Error: Network Error');
          } else {
              console.log(error.response.data.message);
          }
        })
      }

      getData();
        
  }); */
  
  const handleChangeTab = (e, newValue) => {
    setValue(newValue);
  };

  const redirectCRUD = e => {
    console.log(e.currentTarget.id);
    return history.push(history.location.pathname+'/'+e.currentTarget.id);
  };

  const propertyCrud = (

    <Grid container 
      direction="column"
      justify="center"
      alignItems="center"
      spacing={3}
      className={classes.rootContainer}
    >
      <Grid item>
        
        <Button
          id='Create'
          size="large"
          color="primary"
          startIcon={<AddCircleIcon />}
          onClick={redirectCRUD}
        >  
          <Typography>
            AJOUTER UN BIEN A LOUER
          </Typography> 
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
              key={notice.idProperty}
              xs={12} sm={6} md={4} lg={3}
            >
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt={notice.adress}
                    height="140"
                    image={notice.imageLink}
                  />
                  <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {notice.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                   {notice.description}
                  </Typography>
                  </CardContent>
                </CardActionArea>

                <CardActions>
                  <Button 
                    id={"Read/"+notice.idProperty}
                    size="small" 
                    color="primary"
                    startIcon={<PageViewIcon />}
                    onClick={redirectCRUD}
                  >
                    Details
                  </Button>
                  <Button 
                    id={"Update/"+notice.idProperty}
                    size="small" 
                    color="primary"  
                    startIcon={<EditIcon />}
                    onClick={redirectCRUD}
                  >
                    Modifier
                  </Button>
                  <Button 
                    id={"Delete/"+notice.idProperty}
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
  

  return (
    <>
      <AppBar position="static">
        <Tabs 
          value={value} 
          onChange={handleChangeTab}
          variant="fullWidth"
        >
            <Tab label="Propriétés"  />
            <Tab label="Clients"  />
            <Tab label="Documents" />
          </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {propertyCrud}
      </TabPanel>
      <TabPanel value={value} index={1}>
        OK
      </TabPanel>
      <TabPanel value={value} index={2}>
        Telechargez votre document ici ! 
      </TabPanel>
    </>
    

    
    
  );
}

export default Profile;
