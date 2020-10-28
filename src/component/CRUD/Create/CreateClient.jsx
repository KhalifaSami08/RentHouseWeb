import React from 'react';

import { useParams, useHistory } from "react-router-dom";
import {
    Grid,
    InputAdornment,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    FormControlLabel,
    Checkbox,
} from '@material-ui/core';

import { 
    createStyles, 
    makeStyles, 
} from '@material-ui/core/styles';

import {
    Person as PersonIcon,
    Wc as WcIcon,
    Home as HomeIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
} from '@material-ui/icons';
import ResetSubmit from "./persoLayout/ResetSubmit";
import MyTextField from "./persoLayout/MyTextField";
import {useDispatch, useSelector} from "react-redux";
import {addClientAction, updateClientAction} from "../../../store/action/ClientAction";
import MyDatePicker from "./persoLayout/MyDatePicker";

const useStyles = makeStyles((theme) =>
    createStyles({
        grid:{
            margin: theme.spacing(2),
        }
    }),
);

const CreateClient = () => {

    const classes = useStyles();
    const { idParam } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const myClient = useSelector(state => state.reducerClientKey.currentClient);

    const initialStateClient = {
        
        civility:"Mr",
        gender:'M', //Defaut
        name:"Rachid",
        surname:"Castafiore",
        adress:"Rue Blabla 23",
        postalCode:"1090",
        city:"Bruxelles",
        country:"be",
        email:"okok@gmail.com",
        phoneNumber:"0492164040",

        isClient:false, //Garant ou locataire
        dateOfBirth:"0001-01-01",
        age:0, //Defaut
        placeOfBirth:null,
        nationalRegister:null,
        haveAlreadyRentedHouse:false,
    };

    const [client , setClient] = React.useState(initialStateClient);
    const [isUpdateStatus, setUpdateStatus] = React.useState(false);

    const handleChange = e => {
        const eId = e.currentTarget.id;
        setClient({...client, [eId]:e.target.value});
    }

    const handleisClient = () => {
        setClient({...client, isClient : !client.isClient});
    }

    const handleOnSubmit = async e => {
        e.preventDefault();

        if(isUpdateStatus){
            await dispatch( updateClientAction(client) )
        }
        else{
            await dispatch( addClientAction(client) )
        }
        return history.push('/AdminProfile');
    };
    


    //Cacher la div si la personne n'est pas garant
    React.useEffect(()=> {
        let dis = document.getElementById("isClient").style;
        client.isClient ? dis.display="block" : dis.display="none";

    },[client.isClient])

    React.useEffect(() => {
        
        if(idParam !== undefined){
            setUpdateStatus(true);
            console.log(myClient);
            setClient(myClient);
        }

    },[idParam, myClient]);

    //Recalculer l'age en fonction de la datedeNaissance
    React.useEffect(() => {
        const dateClient = new Date(client.dateOfBirth);
        const getUTCDate = new Date(Date.now() - dateClient.getTime())
        const currentAge = getUTCDate.getUTCFullYear() - 1970;
        setClient(c=>({...c, age:currentAge}));
    },[client.dateOfBirth]);

    //Changer le genre au changement de civilité
    React.useEffect(() => {
        let genderChange;
        if(client.civility==='Mr'){
            genderChange = 'M';
        }
        else{
            genderChange = 'F';
        }
        setClient(c => ({...c, gender: genderChange}) );
    },[client.civility])

    const clearBtn = e => setClient(initialStateClient);

    return (
        <form onSubmit={handleOnSubmit}>  
            <Grid 
              className={classes.grid}
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={2}
            >
                <Grid 
                  item
                  xs={12} sm={6}
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                 
                  <MyTextField id="name" label="Nom" value={client.name} onChange={handleChange} required
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PersonIcon />
                            </InputAdornment>
                        ),
                    }}
                  />

                  <MyTextField id="surname" label="Prenom" value={client.surname} onChange={handleChange} required
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PersonIcon />
                            </InputAdornment>
                        ),
                    }}
                  />

                  <Grid 
                    className={classes.grid}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <FormControl>
                        <InputLabel htmlFor="CivilityLabel">Civilité</InputLabel>
                        <Select
                            className={classes.elem}
                            id="civility"
                            value={client.civility}
                            onChange={handleChange}
                            color="primary"
                            variant={"filled"}
                            autoWidth
                            required
                            startAdornment={<WcIcon />}
                            inputProps={{
                                id: 'CivilityLabel',
                            }}
                        >
                        
                        <MenuItem id="civility" value="Mr">Monsieur</MenuItem>
                        <MenuItem id="civility" value="Mrs">Madame</MenuItem>
                        <MenuItem id="civility" value="Ms">Mademoiselle</MenuItem>
                        </Select>  
                    </FormControl>

                      <MyTextField style={{'width':'20%'}} id="gender" label="Genre" disabled value={client.gender}/>

                  </Grid>
                  
                  <MyTextField id="email" label="Email" type="email" value={client.email} onChange={handleChange} required
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon />
                            </InputAdornment>
                        ),
                    }}
                  />
                  <MyTextField id="phoneNumber" label="Phone" type="tel" value={client.phoneNumber} onChange={handleChange} required
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PhoneIcon />
                            </InputAdornment>
                        ),
                    }}
                  />
                  
                </Grid>

                <Grid
                  item
                  xs={12} sm={6} 
                  container
                  direction="column"
                  justify="center"
                  alignItems="center" 
                >
                    <MyTextField id="adress" label="Adresse" value={client.adress} onChange={handleChange} required
                      InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <HomeIcon />
                            </InputAdornment>
                        ),
                      }}
                    />
                    <MyTextField id="postalCode" label="Code Postal" type="number" value={client.postalCode} onChange={handleChange} required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                  <Grid 
                    className={classes.grid}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <MyTextField id="city" label="Ville" value={client.city} onChange={handleChange} required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <HomeIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormControl>
                      <InputLabel htmlFor="Pays">Pays</InputLabel>
                      <Select
                        className={classes.elem}
                        id="country"
                        value={client.country}
                        onChange={handleChange}
                        color="primary"
                        variant={"filled"}
                        autoWidth
                        inputProps={{
                            id: 'Pays',
                        }}
                      >
                        {/* Liste prédéfinie pour plus de clarté */}
                        <MenuItem id="country" value="be">Belgique</MenuItem>
                        <MenuItem id="country" value="fr">France</MenuItem>
                        <MenuItem id="country" value="de">Allemagne</MenuItem>
                        <MenuItem id="country" value="nl">Pays-Bas</MenuItem>
                        <MenuItem id="country" value="uk">Grande Bretagne</MenuItem>
                        </Select> 
                    </FormControl>
                  </Grid>
                    <Grid
                        className={classes.grid}
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                    <FormControlLabel
                        disabled
                        control={<Checkbox checked={client.haveAlreadyRentedHouse} name="checkedE" />}
                        label="Loue déja une habitation ? "
                        labelPlacement="top"
                    />
                    <FormControlLabel
                         control={ <Checkbox checked={client.isClient} onChange={handleisClient}/> }
                         label="Êtes vous un Client ? "
                         labelPlacement="top"
                    />
                    </Grid>
                    <div id="isClient" style={{display:'block'}}>
                        Donc Remplissez les champs ici présent :

                        <MyDatePicker id="dateOfBirth" label="Date de Naissance" value={client.dateOfBirth} onChange={e => setClient(c =>({...c,dateOfBirth:e}))} required={client.isClient}/>
                        <MyTextField id="age" label="Votre age est : " type="number" disabled value={client.age} required={client.isClient} />
                        <MyTextField id="placeOfBirth" label="Lieu de Naissance" value={client.placeOfBirth} onChange={handleChange} required={client.isClient}/>
                        <MyTextField id="nationalRegister" label="N° Registre National" value={client.nationalRegister} onChange={handleChange} required={client.isClient}/>

                    </div>

                </Grid>

                <ResetSubmit clearBtn={clearBtn} />

            </Grid>
        </form>
    )
}

export default CreateClient
