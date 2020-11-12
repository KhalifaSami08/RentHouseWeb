import React from 'react'

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
} from '@material-ui/icons';
import {useDispatch, useSelector} from "react-redux";
import {deletePropertyAction, getPropertyByIDAction} from "../../../store/action/PropertyAction";


const PropertyList = () => {
    const myListofProperties = useSelector(prop => prop.reducerPropertyKey.allProperties);
    const dispatch = useDispatch();

    const history = useHistory();
    const redirectCreate = e => history.push(history.location.pathname+'/Property/Create/');

    const redirectUpdate = async e =>{
        const eID = e.currentTarget.id;
        console.log(eID);
        await dispatch( getPropertyByIDAction(eID) ).then(() => history.push(history.location.pathname+'/Property/Update/'+eID) );
    }

    const deleteProperty = idProperty => {
        console.log(idProperty);
        const propCurrID = myListofProperties.findIndex(
            prop => prop.idProperty === idProperty
        );
        const propCurr = myListofProperties[propCurrID];
        if(propCurr.nbLocator>0){
            window.alert("Une propriété ne peux pas être supprimé car elle est liée a plusieurs contrats ! ");
        }
        else{
            if(
                window.confirm("Etes vous surs de vouloir continuer ? ")
            ){
                dispatch(deletePropertyAction(idProperty));
            }
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
                {myListofProperties.map( prop => {
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
                                        image={"https://i.ytimg.com/vi/cA2cYo86Kws/maxresdefault.jpg"}
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
                                        id={id}
                                        size="small"
                                        color="primary"
                                        startIcon={<EditIcon />}
                                        onClick={redirectUpdate}
                                    >
                                        Modifier
                                    </Button>
                                    <Button
                                        id={"Delete"+id}
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
