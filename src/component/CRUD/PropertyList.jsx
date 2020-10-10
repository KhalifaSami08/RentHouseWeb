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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
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
        
        return history.push(history.location.pathname+'/'+e.currentTarget.id);
    };

  const [listofProperty,setListofProperty] = React.useState([]); 
  const [openDialog,setOpenDialog] = React.useState({
    Read:false,
    Update:false,
    Delete:false
  });

  const handleClickOpen = e => {
    let eID = e.currentTarget.id;
    console.log(eID);
    setOpenDialog({...openDialog, [eID]:true });
    console.log('open : ');
    console.log(openDialog);
  }

  const handleClose = e => {
    let eID = e.currentTarget.id;
    setOpenDialog({...openDialog, [eID]:false });
    console.log('close : ');
    console.log(openDialog);
  }

  const deleteProperty = idProperty => {
    console.log(idProperty);
    setOpenDialog({ Delete:false});
    /* axios.delete("http://localhost:5000/api/property/"+idProperty)
      .then(res => {
        console.log(res)
        alert("Propriété supprimée ! ");
      })
      .catch(err => console.log(err)); */
    getAllProperties();
    // setListofProperty(listofProperty);
  }

  const getAllProperties = async () => {
     await axios.get("http://localhost:5000/api/property")
     .then(res => setListofProperty(res.data))
     .catch(err => console.log(err));
     console.log("Fetch Data Ok ! ");
  }

  React.useEffect(() =>{ 

    getAllProperties();

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
          id='CreateProperty'
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
                  {/* <Button 
                    id="Read"
                    size="small" 
                    color="primary"
                    startIcon={<PageViewIcon />}
                    onClick= {handleClickOpen}
                  >
                    Details
                  </Button> */}
                    
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
                    onClick={handleClickOpen}
                  >
                    Supprimer
                  </Button>
                </CardActions>
              </Card>

              <Dialog
                open={openDialog.Delete}
                onClose={() => setOpenDialog({Delete:false })}
              >
                <DialogTitle>
                  {id}
                </DialogTitle>
              
                <DialogContent>
                  
                </DialogContent>
                <DialogActions>
                  <Button
                    id="Delete"
                    onClick={handleClose}
                    color="secondary"
                    variant="contained"
                  >
                    ANNULER
                  </Button>
                  <Button
                    id="Delete"
                    onClick={() => deleteProperty(id)}
                    color="primary"
                    variant="contained"
                  >
                    SUPPRIMER
                  </Button>
                </DialogActions>
              </Dialog>

            </Grid>
            
          )})}
      </Grid>
      
    </Grid>
    )
}

export default PropertyList;
