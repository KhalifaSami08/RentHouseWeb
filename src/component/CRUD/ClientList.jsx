import React from 'react';
import axios from 'axios';

import { useHistory } from 'react-router-dom';
import {
    Grid, 
    Typography, 
    Button, 
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



const ClientList = () => {
    const history = useHistory();

    const redirectCRUD = e => {
        console.log(e.currentTarget.id);
        return history.push(history.location.pathname+'/'+e.currentTarget.id);
    };

  const [listofClient,setListofClient] = React.useState([]); 

  React.useEffect(() =>{
    
    axios.get("http://localhost:5000/api/client")
    .then(res => {
        setListofClient(res.data);

    })
    .catch(error => {
        if (!error.response) {
            // network error
            console.log('Error: Network Error');
        } else {
            console.log(error.response.data.message);
        }
    })
        
  },[]);

    return (
    <Grid container 
      direction="column"
      justify="center"
      alignItems="center"
      spacing={3}
    >
      <Grid item>
        
        <Button
          id='CreateClient'
          size="large"
          color="primary"
          startIcon={<AddCircleIcon />}
          onClick={redirectCRUD}
        >  
          <Typography>
            AJOUTER UN NOUVEAU CLIENT
          </Typography> 
        </Button>
      </Grid>
      <Grid container item 
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >

        {listofClient.map( client => {
          return(

            <Grid item
              key={client.idClient}
              xs={12} sm={6} md={4} lg={3}
            >
              <Card>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {client.name +' '+client.surname}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {client.adress}
                    </Typography>
                  </CardContent>
                </CardActionArea>

                <CardActions>
                  <Button 
                    id={"Read/"+client.idClient}
                    size="small" 
                    color="primary"
                    startIcon={<PageViewIcon />}
                    // onClick={}
                  >
                    Details
                  </Button>
                  <Button 
                    id={"Update/"+client.idClient}
                    size="small" 
                    color="primary"  
                    startIcon={<EditIcon />}
                    // onClick={}
                  >
                    Modifier
                  </Button>
                  <Button 
                    id={"Delete/"+client.idClient}
                    size="small"
                    color="primary"
                    startIcon={<DeleteIcon />}
                    // onClick={}
                  >
                    Supprimer
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            
          )})}
      </Grid>
    </Grid>
    )
}

export default ClientList
