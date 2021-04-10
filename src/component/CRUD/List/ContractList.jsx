import React from 'react';

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
} from '@material-ui/icons';
import {useDispatch, useSelector} from "react-redux";
import {deleteContractAction, getContractByIdAction} from "../../../store/action/ContractAction";


const ContractList = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const myContractList = useSelector(contr => contr.reducerContractKey.allContracts)
   /* 
        const myClientList = useSelector(cli => cli.reducerClientKey.allClient);
        const myPropertiesList = useSelector(prop => prop.reducerPropertyKey.allProperties);
    */

    const redirectCRUD = e => history.push(history.location.pathname+'/Contract/'+e.currentTarget.id);
    const redirectGenerate = async e =>{
        const eID = e.currentTarget.id;
        console.log(eID);
        await dispatch( getContractByIdAction(eID)).then(() => history.push(history.location.pathname+'/Contract/GenerateContract/'+eID) );

    }

    const redirectUpdate = async e =>{
        const eID = e.currentTarget.id;
        console.log(eID);
        await dispatch( getContractByIdAction(eID)).then(() => history.push(history.location.pathname+'/Contract/Update/'+eID) );
    }

  const deleteContract = idContract => {

    if (window.confirm("En êtes vous sûrs ? ")) {
        dispatch(deleteContractAction(idContract))
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

        {myContractList.map( contract => {
            
            const cliCurr = contract.client;
            const propCurr = contract.property;

            return(
            <Grid
                key={contract.idContract}
                item
                xs={12} sm={6} md={4} lg={3}
            >
              <Card>
                  <CardContent>
                      <Typography color={"primary"} variant="body2" component="p">
                          {"ID Contrat : "+contract.idContract}
                      </Typography>
                      <Typography color={"primary"} variant="body2" component="p">
                          {"CLIENT : "}
                      </Typography>
                      <Typography variant="h6" color="textSecondary" component="h2">
                          {cliCurr?.name+" "+cliCurr?.surname}
                      </Typography>
                      <Typography color={"primary"} variant="body2" component="p">
                          {" Pour l'Habitation  "}
                      </Typography>
                      <Typography variant="h6" color="textSecondary" component="h2">
                          {propCurr?.idProperty}
                      </Typography>
                  </CardContent>

                <CardActions>
                  
                  <Button 
                    id={contract.idContract}
                    size="small" 
                    color="primary"  
                    startIcon={<EditIcon />}
                    onClick={redirectUpdate}
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
                    id={contract.idContract}
                    color="secondary"
                    variant="contained"
                    size="small"
                    startIcon={<NoteAddIcon />}
                    onClick={redirectGenerate}
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
