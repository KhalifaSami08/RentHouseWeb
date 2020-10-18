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
    NoteAdd as NoteAddIcon,
    // Description as DecriptionIcon,
} from '@material-ui/icons';


const ContractList = () => {

  const history = useHistory();

    const redirectCRUD = e => {
        console.log(e.currentTarget.id);
        return history.push(history.location.pathname+'/Contract/'+e.currentTarget.id);
    };

  const [listofContracts,setListofContract] = React.useState([]); 
  const [isItemDeleted,setItemDeleted] = React.useState(false); 
  
  const GetAllContracts = async () => {

    axios.get("http://localhost:5000/api/contract")
    .then(res => setListofContract(res.data))
    .catch(err => console.log(err))
  }

  React.useEffect(() =>{

    GetAllContracts();
        
  },[isItemDeleted]);

  const deleteContract = idContract => {
    console.log(idContract);

    if (window.confirm("En êtes vous sûrs ? ")) {

      axios.delete("http://localhost:5000/api/contract/"+idContract)
      .then(res => {
        console.log(res);
        alert("Contrat supprimé ! ");
      })
      .catch(err => console.log(err));
      setItemDeleted(!isItemDeleted);
    }
  }

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
          id='Create'
          size="large"
          color="primary"
          startIcon={<AddCircleIcon />}
          onClick={redirectCRUD}
        >  
          <Typography>
            CREE UN CONTRAT
          </Typography> 
        </Button>



      </Grid>
        <Typography color={"primary"}> VOICI LA LISTE DE CONTRATS EN COURS : </Typography>
      <Grid container item 
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >

        {listofContracts.map( contract => {
            console.log(contract);
          return(

            <Grid item
              key={contract.idContract}
              xs={12} sm={6} md={4} lg={3}
            >
              <Card>
                  <CardContent>
                  <Typography color={"primary"} variant="body2" component="p">
                      {"CLIENT : "}
                  </Typography>
                  <Typography variant="h6" color="textSecondary" component="h2">
                      {contract.client.name+" "+contract.client.surname}
                  </Typography>
                  </CardContent>

                <CardActions>
                  
                  <Button 
                    id={"Update/"+contract.idContract}
                    size="small" 
                    color="primary"  
                    startIcon={<EditIcon />}
                    onClick={redirectCRUD}
                  >
                    Modifier
                  </Button>
                  <Button 
                    id={"Delete/"+contract.idContract}
                    size="small"
                    color="primary"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteContract(contract.idContract)}
                  >
                    Supprimer
                  </Button>
                  <Button
                    id={"GenerateContract/"+contract.idContract}
                    color="primary"
                    variant="contained"
                    size="small"
                    startIcon={<NoteAddIcon />}
                    onClick={redirectCRUD}
                  >
                    DOCUMENTS
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
