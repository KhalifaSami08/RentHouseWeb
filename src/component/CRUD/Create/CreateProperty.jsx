import React from 'react';
import axios from 'axios';
import { useParams, useHistory } from "react-router-dom";
// import MuiAlert from '@material-ui/lab/Alert';
import {
    TextField,
    Select,
    MenuItem,
    Grid,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    InputAdornment,
    IconButton,
    Button,
    FormControlLabel,
    Checkbox,
    // Snackbar,
} from '@material-ui/core';

import { 
    createStyles, 
    makeStyles, 
} from '@material-ui/core/styles';

import {
    ExpandMore as ExpandMoreIcon,
    Euro as EuroIcon,
    AddPhotoAlternate as AddPhotoAlternateIcon,
    Kitchen as KitchenIcon,
    LocalDining as LocalDiningIcon,
    AirlineSeatIndividualSuite as AirlineSeatIndividualSuiteIcon,
    Home as HomeIcon,
    HomeWork as HomeWorkIcon,
    Dialpad as DialpadIcon,
    GridOn as GridOnIcon,
    Description as DescriptionIcon,
} from '@material-ui/icons';


const useStyles = makeStyles((theme) =>
    createStyles({
        element:{
            margin: theme.spacing(1.5),
        },
        inputFile:{
            display: 'none',
        },
        
    }),
);

const CreateProperty = () => { 

    const classes = useStyles();
    const { idParam } = useParams();
    const history = useHistory();

    const stateDefaultValues = {

        adress: "Rue Okay",
        type: "house",
        floor: 0,
        nbRoom: 1,
        totalArea: 234,
        description:"Belle maison tout ça tout ça",
        // roomsDetails:[],
        diningRoomArea:34,
        kitchenArea:28,
        rentCost:764,
        fixedChargesCost:234,
        imageLink:null,
        isCurrentlyRented:false,
    }

    const [state,setState] = React.useState(stateDefaultValues);
    const [isUpdateStatus, setUpdateStatus] = React.useState(false);
    
    const [roomArea,setRoomArea] = React.useState([]);

    const getProperty = React.useCallback(async (idParam) => {
        await axios.get("http://localhost:5000/api/property/"+idParam)
        .then(res => setState(res.data))
        .catch(err => console.log(err));
        console.log("Property get ok ! ");
    },[])

    // console.log("ID : "+idParam);

    
    React.useEffect(() => {
        if(idParam !== undefined){
            getProperty(idParam);
            setUpdateStatus(true);
        }
        
    },[getProperty, idParam]);
      

    /* const [snackbarValid,setsnackbarValid] = React.useState({

        valid:false,
        reset:false,
        imageUpload:false,
        error:false,
    });
 */
    const handleChange = e => {
        const eId = e.currentTarget.id;
        // console.log(eId+" -> "+e.target.value);
        setState({...state, [eId]:e.target.value});
        // console.log(state);
    }

    const handleChangeRoomArea = e => {
        const eId = e.currentTarget.id;
        // console.log(eId+" -> "+e.target.value);
        setRoomArea({...roomArea, [eId]:e.target.value});
        // console.log(roomArea);
    }

    const fileSelectedHandler = e =>{
        let selFile = e.target.files[0].name;
        // console.log(selFile);
        setState({...state , imageLink:selFile })
    }

    /* function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    } */


    const handleOnSubmit = async e => {
        // console.log(state);
        e.preventDefault();

        if(isUpdateStatus){
            await axios.put("http://localhost:5000/api/property/"+idParam , state)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        }
        else{
            await axios.post("http://localhost:5000/api/property/" , state)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        }
        return history.push('/AdminProfile');
    }

    const clearBtn = e => {
        setState(stateDefaultValues);
    }

    const final = [];

    for (let i = 0; i < state.nbRoom; i++) {
        final.push(
            <Grid container 
                key={i}
                className={classes.element}
                direction="row"
                justify="center"
                alignItems="center"
            >
                <TextField 
                    id={'idRoom'+i}
                    label="Nom de la piéce"
                    className={classes.element}
                    color="secondary"
                    variant="outlined"
                    value={roomArea.idRoom}
                    onChange={handleChangeRoomArea}
                    
                />
                <TextField 
                    id={'labelRoom'+i}
                    label="Aire de la piéce"
                    className={classes.element}
                    type="number"
                    color="secondary"
                    variant="outlined"
                    value={roomArea.labelRoom}
                    onChange={handleChangeRoomArea}
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                                <GridOnIcon />
                          </InputAdornment>
                        ),
                        endAdornment:(
                            <Typography>
                                (M²)
                            </Typography>
                        ),
                    }}
                />
            </Grid>
        );
        
    }

    return (
        <form onSubmit={handleOnSubmit}>

            <Grid container 
                className={classes.element}
                direction="column"
                justify="center"
                alignItems="center"
            >
                <TextField 
                    id="description"
                    label="description"
                    placeholder="description"
                    className={classes.element}
                    color="primary"
                    value={state.description}
                    onChange={handleChange}
                    variant="outlined"
                    required
                    multiline
                    rowsMax={3}
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                                <DescriptionIcon />
                          </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid container 
                className={classes.element}
                direction="row"
                justify="center"
                alignItems="center"
            >

                

            <Grid item
                xs={12} sm={6}
            >

                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                >
                
                
                <TextField 
                    id="adress"
                    label="Adresse"
                    placeholder="Adresse"
                    className={classes.element}
                    color="primary"
                    value={state.adress}
                    onChange={handleChange}
                    variant="outlined"
                    required
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                                <HomeIcon />
                          </InputAdornment>
                        ),
                    }}
                />

                <Select
                    id="type"
                    className={classes.element}
                    value={state.type}
                    onChange={handleChange}
                    color="primary"
                    variant="outlined"
                    startAdornment={<HomeWorkIcon />}
                >
                    
                    <MenuItem id="type" value="flat">Appartement</MenuItem>
                    <MenuItem id="type" value="house">Maison</MenuItem>
                    <MenuItem id="type" value="room">Chambre</MenuItem>
                </Select>  

                <TextField 
                    id="floor"
                    label="Etage n°"
                    placeholder={state.type==='house'?'(Facultatif)':'(Obligatoire)'}
                    className={classes.element}
                    type="number"
                    color="primary"
                    value={state.floor}
                    onChange={handleChange}
                    variant="outlined"
                    required={state.type==='house'?false:true}
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                                <DialpadIcon />
                          </InputAdornment>
                        ),
                    }}
                />

                <TextField 
                    id="totalArea"
                    placeholder="Superficie totale"
                    label="Superficie totale"
                    className={classes.element}
                    type="number"
                    color="primary"
                    value={state.totalArea}
                    onChange={handleChange}
                    variant="outlined"
                    required
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                                <GridOnIcon />
                          </InputAdornment>
                        ),
                        endAdornment:(
                            <Typography>
                                (M²)
                            </Typography>
                        ),
                    }}
                />

                <TextField 
                    id="nbRoom"
                    placeholder="Nombre de Pièces"
                    label="Nombre de Pièces"
                    className={classes.element}
                    type="number"
                    color="primary"
                    value={state.nbRoom}
                    onChange={handleChange}
                    variant="outlined"
                    
                    required
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                                <AirlineSeatIndividualSuiteIcon />
                          </InputAdornment>
                        ),
                        inputProps:{
                            min:'0',
                            max:'5',
                        },
                        endAdornment:(
                            <Typography>
                                (5 Max)
                            </Typography>
                        ),
                    }}
                    
                />
                
                <Accordion
                    className={classes.element}
                    defaultExpanded
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                    <Typography>Liste des pièces</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container
                            direction="column"
                            alignItems="center"
                            justify="center"
                        >
                            {final}
                            
                        </Grid>

                    </AccordionDetails>
                </Accordion>

                </Grid>
            </Grid>
            <Grid item
                xs={12} sm={6}
            >
                <Grid container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                >
                    
                    <TextField 
                        id="diningRoomArea"
                        placeholder="Aire de la salle a manger"
                        label="Aire de la salle a manger"
                        className={classes.element}
                        type="number"
                        color="primary"
                        value={state.diningRoomArea}
                        onChange={handleChange}
                        variant="outlined"
                        required
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                    <LocalDiningIcon />
                            </InputAdornment>
                            ),
                            endAdornment:(
                                <Typography>
                                    (M²)
                                </Typography>
                            ),
                        }}
                    />
                    
                    <TextField 
                        id="kitchenArea"
                        placeholder="Aire de la cuisine"
                        label="Aire de la cuisine"
                        className={classes.element}
                        type="number"
                        color="primary"
                        value={state.kitchenArea}
                        onChange={handleChange}
                        variant="outlined"
                        required
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                    <KitchenIcon />
                            </InputAdornment>
                            ),
                            endAdornment:(
                                <Typography>
                                    (M²)
                                </Typography>
                            ),
                        }}
                    />
                    
                    <TextField 
                        id="rentCost"
                        placeholder="Rente mensuelle (en €)"
                        label="Rente mensuelle (en €)"
                        className={classes.element}
                        type="number"
                        color="primary"
                        value={state.rentCost}
                        onChange={handleChange}
                        variant="outlined"
                        required
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                    <EuroIcon />
                            </InputAdornment>
                            ),
                            endAdornment:(
                                <Typography>
                                    (€)
                                </Typography>
                            ),
                        }}
                    />
                    <TextField 
                        id="fixedChargesCost"
                        placeholder="Charges mensuelles"
                        label="Charges mensuelles"
                        className={classes.element}
                        type="number"
                        color="primary"
                        value={state.fixedChargesCost}
                        onChange={handleChange}
                        variant="outlined"
                        required
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                    <EuroIcon />
                            </InputAdornment>
                            ),
                            endAdornment:(
                                <Typography>
                                    (€)
                                </Typography>
                            ),
                        }}
                    />

                    <FormControlLabel
                     disabled 
                     control={<Checkbox checked={state.isCurrentlyRented} name="checkedE" />} 
                     label="Logement actuellement loué ? " 
                     labelPlacement="top"
                    />
                    
                   
                    <Grid container item
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        
                        <input 
                            accept="image/*" 
                            className={classes.inputFile} 
                            id="icon-button-file" 
                            type="file" 
                            onChange={fileSelectedHandler}
                        />
                        <label htmlFor="icon-button-file">
                            <IconButton 
                                id="iconButton"
                                className={classes.element}
                                component="span"
                                color={state.imageLink===null?"secondary":"primary"}
                            >
                                <AddPhotoAlternateIcon />
                            </IconButton>
                            
                        </label>

                       <label htmlFor="iconButton">
                            {state.imageLink}
                        </label>

                        {/* <Button
                            className={classes.element}
                            // onClick={fileUploadHandler}
                            variant="contained"
                            color={state.imageLink===null?"secondary":"primary"}
                        > 
                            Upload Image 
                        </Button> */}


                    </Grid>
                                
                </Grid>
            </Grid>

            <Grid container item
                direction="row"
                justify="flex-end"
                alignItems="flex-end"
            >
                <Button
                    color="secondary"
                    variant="contained"
                    className={classes.element}
                    type="reset"
                    onClick={clearBtn}
                >
                    Reset
                </Button>

                <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    className={classes.element}
                    // onClick={handleOnSubmit}
                >
                    Valider
                </Button>
            </Grid>
            
            {/* <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                This is a success message!
                </Alert>
            </Snackbar> */}
            
            {/* <Alert severity="error">Certaines données sont incomplétes / Fausses ! </Alert>
            <Alert severity="warning">Vous venez de reset le formulaire</Alert>
            <Alert severity="info">L'Image a bien été chargée</Alert>
            <Alert severity="success">Formulaire validé ! </Alert> */}
        </Grid>
        </form>
    )
}

export default CreateProperty;