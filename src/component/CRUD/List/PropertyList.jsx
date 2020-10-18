import React from 'react'
import axios from 'axios';

import { useHistory } from 'react-router-dom';
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
    // Pageview as PageViewIcon,
} from '@material-ui/icons';



const PropertyList = () => {
    
  const history = useHistory();
  const redirectCRUD = e => {
      
      return history.push(history.location.pathname+'/Property/'+e.currentTarget.id);
  };

  const [listofProperty,setListofProperty] = React.useState([]);
  
  //Va servir afin de raffraichir le useEffect donc la liste des propriétes
  // const [isItemDeleted,setItemDeleted] = React.useState(false);

  const getAllProperties = async () => {
    await axios.get("http://localhost:5000/api/property")
    .then(res => setListofProperty(res.data))
    .then(console.log("Fetch Data Property Ok ! "))
    .catch(err => console.log(err));
  }

  const deleteProperty = idProperty => {
    console.log(idProperty);
    window.alert("Un Client ne peux pas être supprimé car il est peut être lié a des contrats ! ");

    /*if (window.confirm(
        "ATTENTION ! SUPPRIMER UNE PROPRIETE SUPPRIMERA EGALEMENT LE CONTRAT EN COURS, CONFIRMEZ :"
    )) {

      axios.delete("http://localhost:5000/api/property/"+idProperty)
      .then(res => {
        console.log(res)
        alert("Propriété supprimée ! ");
      })
      .catch(err => console.log(err));
      setItemDeleted(!isItemDeleted);
    }*/
  }

  React.useEffect(() =>{ 

    getAllProperties();
    
  },[/*isItemDeleted*/]);

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
            AJOUTER UN BIEN A LOUER
          </Typography> 
        </Button>
      </Grid>
      <Grid container item 
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        {listofProperty.map( prop => {
          const id = prop.idProperty;
          return(
            <Grid item
              key={id}
              xs={12} sm={6} md={4} lg={3}
            >

              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt={prop.adress}
                    height="140"
                    image={prop.imageLink}
                  />
                  <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {prop.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {prop.description}
                  </Typography>
                  </CardContent>
                </CardActionArea>

                <CardActions>
                    
                  <Button 
                    id={"Update/"+id}
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
                    onClick={() => deleteProperty(id)}
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

export default PropertyList;
