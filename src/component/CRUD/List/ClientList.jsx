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
} from '@material-ui/icons';



const ClientList = () => {
    const history = useHistory();

    const redirectCRUD = e => {
        console.log(e.currentTarget.id);
        return history.push(history.location.pathname+'/Client/'+e.currentTarget.id);
    };

  const [listofClient,setListofClient] = React.useState([]); 
  // const [isItemDeleted,setItemDeleted] = React.useState(false);


  const getAllClients = async () => {
    await axios.get("http://localhost:5000/api/client")
    .then(res => setListofClient(res.data))
    .then(console.log("Fetch Client Data Ok ! "))
    .catch(err => console.log(err));
  }

  React.useEffect(() =>{

    getAllClients();
        
  },[/*isItemDeleted*/]);

  const deleteClient = idClient => {
    console.log(idClient);

    window.alert("Un Client ne peux pas être supprimé car il est peut être lié a des contrats ! ")

   /* if (window.confirm("En êtes vous sûrs ? ")) {

      axios.delete("http://localhost:5000/api/client/"+idClient)
      .then(res => {
        console.log(res);
        alert("Client supprimé ! ");
      })
      .catch(err => console.log(err));
      setItemDeleted(!isItemDeleted);
    }*/
  }

    return (
    <Grid container 
      direction="column"
      justify="center"
      alignItems="center"
      spacing={3}
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
                    id={"Update/"+client.idClient}
                    size="small" 
                    color="primary"  
                    startIcon={<EditIcon />}
                    onClick={redirectCRUD}
                  >
                    Modifier
                  </Button>
                  <Button 
                    id="Delete"
                    size="small"
                    color="primary"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteClient(client.idClient)}
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
