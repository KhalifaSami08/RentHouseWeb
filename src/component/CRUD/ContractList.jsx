import React from 'react';
import axios from 'axios';

import { useHistory } from 'react-router-dom';
import {
    Grid, 
    Typography, 
    Button,
    CardContent, 
    CardActions,
    Card, 
} from '@material-ui/core';

import {
    Delete as DeleteIcon,
    AddCircle as AddCircleIcon,
    Edit as EditIcon,
    Pageview as PageViewIcon,
    NoteAdd as NoteAddIcon,
    Description as DecriptionIcon,
} from '@material-ui/icons';


const ContractList = () => {

  const history = useHistory();

    const redirectCRUD = e => {
        console.log(e.currentTarget.id);
        return history.push(history.location.pathname+'/'+e.currentTarget.id);
    };

  const [listofContracts,setListofContract] = React.useState([]); 

  React.useEffect(() =>{

    axios.get("http://localhost:5000/api/contract")
    .then(res => {
        setListofContract(res.data);

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
      <Grid container item 
        justify="center" 
        alignItems="center" 
      >
        
        <Button
          id='CreateContract'
          size="large"
          color="primary"
          startIcon={<AddCircleIcon />}
          onClick={redirectCRUD}
        >  
          <Typography>
            CREE UN CONTRAT
          </Typography> 
        </Button>

        <Button
          id='GenerateContract'
          size="large"
          color="primary"
          variant="contained"
          startIcon={<NoteAddIcon />}
          onClick={redirectCRUD}
        >  
          <Typography>
            GENERER UN DOCUMENT
          </Typography> 
        </Button>

        <Button
          id='GetAllContracts'
          size="large"
          color="primary"
          startIcon={<DecriptionIcon />}
          onClick={redirectCRUD}
        >  
          <Typography>
            VOIR TOUT LES CONTRATS
          </Typography> 
        </Button>
      </Grid>
      <Grid container item 
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >

        {listofContracts.map( contract => {
          return(

            <Grid item
              key={contract.idContract}
              xs={12} sm={6} md={4} lg={3}
            >
              <Card>
                  <CardContent>
                  
                  <Typography variant="body2" color="textSecondary" component="p">
                    {'L\'id de la propriété est la suivante : '+contract.propertyId}
                  </Typography>

                  <Typography gutterBottom variant="h5" component="h2">
                    {'Contrat du client portant l\'id : '+contract.clientId}
                  </Typography>

                  </CardContent>

                <CardActions>
                  <Button 
                    id={"Read/"+contract.idContract}
                    size="small" 
                    color="primary"
                    startIcon={<PageViewIcon />}
                    // onClick={}
                  >
                    Details
                  </Button>
                  <Button 
                    id={"Update/"+contract.idContract}
                    size="small" 
                    color="primary"  
                    startIcon={<EditIcon />}
                    // onClick={}
                  >
                    Modifier
                  </Button>
                  <Button 
                    id={"Delete/"+contract.idContract}
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

export default ContractList;
