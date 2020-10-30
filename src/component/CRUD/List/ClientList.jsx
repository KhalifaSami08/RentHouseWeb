import React from 'react';

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
import {useDispatch, useSelector} from "react-redux";
import {deleteClientAction, getClientByIDAction} from "../../../store/action/ClientAction";
import {deleteContractAction} from "../../../store/action/ContractAction";


const ClientList = () => {
    const history = useHistory();
    const myListofClients = useSelector(cli => cli.reducerClientKey.allClient);

    const allContr = useSelector(contr => contr.reducerContractKey?.allContracts);
    const dispatch = useDispatch();

    const redirectCreate = e => history.push(history.location.pathname+'/Client/Create/');

    const redirectUpdate = async e =>{
        const eID = e.currentTarget.id;
        console.log(eID);
        await dispatch( getClientByIDAction(eID) ).then(() => history.push(history.location.pathname+'/Client/Update/'+eID) );
    }

    const deleteClient = idClient => {
        console.log(idClient);

        const cliCurrID = myListofClients.findIndex(
            cli => cli.idClient === idClient
        )
        const cliCurr = myListofClients[cliCurrID];

        if(cliCurr.haveAlreadyRentedHouse){
            alert("Cette maison a des contrats en cours, êtes vous surs de vouloir continuer ? ");
            const idContractToDelete = allContr.find(c => c.clientId === idClient);
            console.log(idContractToDelete);
            dispatch(deleteContractAction(idContractToDelete.idContract))
        }

        if (window.confirm(
            "Confirmez votre choix ! "
        ))
        {
            dispatch(deleteClientAction(idClient))
        }

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
          onClick={redirectCreate}
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

        {myListofClients.map( client => {
          const cliId = client.idClient;
          return(
            <Grid item
              key={cliId}
              xs={12} sm={6} md={4} lg={3}
            >
              <Card key={cliId}>
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
                    id={cliId}
                    size="small" 
                    color="primary"  
                    startIcon={<EditIcon />}
                    onClick={redirectUpdate}
                  >
                    Modifier
                  </Button>
                  <Button 
                    id={"Delete"+cliId}
                    size="small"
                    color="primary"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteClient(cliId)}
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
