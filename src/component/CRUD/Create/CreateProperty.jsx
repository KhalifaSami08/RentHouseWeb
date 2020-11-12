import React from 'react';
import { useParams, useHistory } from "react-router-dom";
import {
    Select,
    MenuItem,
    Grid,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    InputAdornment,
    IconButton,
    FormControlLabel,
    Checkbox,
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
import ResetSubmit from "./persoLayout/ResetSubmit";
import MyTextField from "./persoLayout/MyTextField";
import {useDispatch, useSelector} from "react-redux";
import {addPropertyAction, updatePropertyAction} from "../../../store/action/PropertyAction";


const useStyles = makeStyles((theme) =>
    createStyles({
        Grid:{
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
    const dispatch = useDispatch();

    const myProp = useSelector(state => state.reducerPropertyKey.currentProp);

    const stateDefaultValues = {

        adress: "Rue Okay 32",
        type: "house",
        floor: 0,
        nbRoom: 1,
        totalArea: 234,
        description:"Belle maison tout ça tout ça",
        roomsDetails:[
            {
                nameRoom:"Room 1",
                area:45,
            }
        ],
        diningRoomArea:34,
        kitchenArea:28,
        rentCost:764,
        fixedChargesCost:234,
        imageLink:null,
        nbLocator:0,
    }

    const [state,setState] = React.useState(stateDefaultValues);
    const [isUpdateStatus, setUpdateStatus] = React.useState(false);

    React.useEffect(() => {

        if(idParam !== undefined){
            setUpdateStatus(true);
            setState(myProp)
        }
    },[idParam, myProp]);


    const handleChange = e => {
        const eId = e.currentTarget.id;
        setState({...state, [eId]:e.target.value});
    }

    const onChangenbRoom = e => {
        let list = [];
        for (let i = 1; i <= e.target.value; i++){
            list.push(
                {
                    nameRoom:"Room "+i,
                    area:45
                }
            );
        }
        setState({...state, roomsDetails: list,nbRoom: e.target.value})
        console.log(state);
    }


    const fileSelectedHandler = e =>{
        let selFile = e.target.files[0].name;
        setState(c => ({...c , imageLink: selFile}))
    }

    const handleOnSubmit = async e => {
        e.preventDefault();

        if(isUpdateStatus){
            await dispatch(updatePropertyAction(state))
        }
        else{
            await dispatch(addPropertyAction(state))
        }
        return history.push('/AdminProfile');
    }

    const clearBtn = e => setState(stateDefaultValues);

    const roomDetailInputChange = (e, roomId) => {
        setState({...state, roomsDetails: state.roomsDetails.map((listRoom,index) => {
                if (listRoom.nameRoom === roomId) {
                    return {...listRoom, area: e.target.value}
                }
                else if(index === roomId){
                    return {...listRoom, nameRoom: e.target.value}
                }
                return listRoom
            }) })

    }

    return (
        <form onSubmit={handleOnSubmit}>

            <Grid container
                  className={classes.Grid}
                  direction="column"
                  justify="center"
                  alignItems="center"
            >
                <MyTextField id="description" label="description" value={state.description} onChange={handleChange} required multiline rowsMax={3}
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
                  className={classes.Grid}
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

                        <MyTextField id="adress" label="Adresse" value={state.adress} onChange={handleChange} required
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
                            className={classes.Grid}
                            value={state.type}
                            onChange={handleChange}
                            color="primary"
                            variant="filled"
                            startAdornment={<HomeWorkIcon />}
                        >

                            <MenuItem id="type" value="flat">Appartement</MenuItem>
                            <MenuItem id="type" value="house">Maison</MenuItem>
                            <MenuItem id="type" value="room">Chambre</MenuItem>
                        </Select>

                        <MyTextField id="floor" label={state.type==='house'?'Etage n° (Facultatif)':'Etage n° (Obligatoire)'} type="number" value={state.floor} onChange={handleChange} required={state.type !== 'house'}
                                     InputProps={{
                                         startAdornment: (
                                             <InputAdornment position="start">
                                                 <DialpadIcon />
                                             </InputAdornment>
                                         ),
                                     }}
                        />

                        <MyTextField id={"totalArea"} label={"Superficie totale"} type={"number"} value={state.totalArea} onChange={handleChange} required
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

                        <MyTextField id={"nbRoom"} label={"Nombre de Pièces"} type={"number"} value={state.nbRoom} onChange={onChangenbRoom} required
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
                            className={classes.Grid}
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
                                    {state.roomsDetails.map((room, index) =>

                                        <Grid container
                                              key={index}
                                              className={classes.Grid}
                                              direction="row"
                                              justify="center"
                                              alignItems="center"
                                        >
                                            <MyTextField
                                                key={index}
                                                label={"Nom de la piéce"}
                                                value={room.nameRoom}
                                                onChange={e=>roomDetailInputChange(e,index)}
                                            />
                                            <MyTextField
                                                style={{width:"100%"}}
                                                key={room.nameRoom}
                                                label="Aire de la piéce"
                                                type="number"
                                                value={room.area}
                                                onChange={e=>roomDetailInputChange(e,room.nameRoom)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <GridOnIcon/>
                                                        </InputAdornment>
                                                    ),
                                                    endAdornment: (
                                                        <Typography>
                                                            (M²)
                                                        </Typography>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                    )
                                }
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

                        <MyTextField id="diningRoomArea" label="Aire de la salle a manger" type="number" value={state.diningRoomArea} onChange={handleChange} required
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

                        <MyTextField id="kitchenArea" label="Aire de la cuisine" type="number" value={state.kitchenArea} onChange={handleChange} required
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

                        <MyTextField id="rentCost" label="Rente mensuelle (en €)" type="number" value={state.rentCost} onChange={handleChange} required
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
                        <MyTextField id="fixedChargesCost" label="Charges mensuelles" type="number" value={state.fixedChargesCost} onChange={handleChange} required
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
                            control={<Checkbox checked={state.nbLocator > 0} name="checkedE" />}
                            label="Logement actuellement loué ? "
                            labelPlacement="top"
                        />

                        <MyTextField id={"nbLocator"} label={"Nombre de Locataires"} disabled value={state.nbLocator} type="number" />

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
                                    className={classes.Grid}
                                    component="span"
                                    color={state.imageLink===null?"secondary":"primary"}
                                >
                                    <AddPhotoAlternateIcon />
                                </IconButton>

                            </label>

                            <label htmlFor="iconButton">
                                {state.imageLink}
                            </label>


                        </Grid>
                    </Grid>
                </Grid>

                <ResetSubmit clearBtn={clearBtn} />

            </Grid>
        </form>
    )
}

export default CreateProperty;