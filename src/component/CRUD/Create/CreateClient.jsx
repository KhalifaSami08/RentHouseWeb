import React from 'react';
import axios from 'axios';
import { useParams, useHistory } from "react-router-dom";
import {
    Grid,
    InputAdornment,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    FormControlLabel,
    Checkbox,
    Button,
} from '@material-ui/core';

/* import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
import 'date-fns'; */
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

const useStyles = makeStyles((theme) =>
    createStyles({
        grid:{
            margin: theme.spacing(2),
        },
        elem:{
            margin: theme.spacing(0.5),
        },
        elemSpe: {
            width:'40%',
            margin: theme.spacing(0.5),
        }
        
    }),
);

const CreateClient = () => {

    const classes = useStyles();
    const { idParam } = useParams();
    const history = useHistory();

    const initialStateClient = {
        
        civility:"Mr",
        gender:'', //Defaut
        name:"Rachid",
        surname:"Castafiore",
        adress:"Rue Blabla",
        postalCode:"1080",
        city:"Bruxelles",
        country:"be",
        email:"okok@gmail.com",
        phoneNumber:"0492164040",

        isClient:false, //Garant ou locataire
        dateOfBirth:"1981-10-21",
        age:0, //Defaut
        placeOfBirth:"Bruxelles", 
        nationalRegister:"810304-254.87", 

    };

    const [client , setClient] = React.useState(initialStateClient);
    const [isUpdateStatus, setUpdateStatus] = React.useState(false);

    const variant = "filled";

    const handleChange = e => {
        const eId = e.currentTarget.id;
        console.log(eId+" -> "+e.target.value);
        setClient({...client, [eId]:e.target.value});
    }

    const handleisClient = () => {
        setClient({...client, isClient : !client.isClient});
    }

    const handleOnSubmit = async e => {
        // console.log(state);
        e.preventDefault();

        if(isUpdateStatus){
            await axios.put("http://localhost:5000/api/client/"+idParam , client)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        }
        else{
            await axios.post("http://localhost:5000/api/client/" , client)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        }
        return history.push('/AdminProfile');
    };
    


    //Cacher la div si la personne n'est pas garant
    React.useEffect(()=> {
        let dis = document.getElementById("isClient").style;
        client.isClient ? dis.display="block" : dis.display="none";


    },[client.isClient])

    console.log("render");
    React.useEffect(() => {

        const fetchData = async (idParam) => {
            await axios.get("http://localhost:5000/api/client/"+idParam)
                .then(res => {
                    console.log(res.data);
                    setClient(res.data);
                    const realDate = new Date(res.data.dateOfBirth).toISOString().split('T')[0].toString();
                    setClient(c=>({...c, dateOfBirth: realDate }))
                    console.log(client.dateOfBirth)
                })
                .catch(err => console.log(err));

        }

        if(idParam !== undefined){
            fetchData(idParam);
            setUpdateStatus(true);
        }

    },[idParam]);

    //Recalculer l'age en fonction de la datedeNaissance
    React.useEffect(() => {

        const dateClient = new Date(client.dateOfBirth);
        const getUTCDate = new Date(Date.now() - dateClient.getTime())
        const currentAge = getUTCDate.getUTCFullYear() - 1970;

        setClient(c=>({...c, age:currentAge}));
    },[client.dateOfBirth]);

    const clearBtn = e => {
        setClient(initialStateClient);
    }

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
                 
                  <TextField 
                    className={classes.elem}
                    id="name"
                    label="Nom"
                    color="primary"
                    value={client.name}
                    onChange={handleChange}
                    variant={variant}
                    required
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PersonIcon />
                            </InputAdornment>
                        ),
                    }}
                  />

                  <TextField 
                    className={classes.elem}
                    id="surname"
                    label="Prenom"
                    color="primary"
                    value={client.surname}
                    onChange={handleChange}
                    variant={variant}
                    required
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
                        variant={variant}
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
                    <TextField
                      className={classes.elem}
                      style={{'width':'20%'}}
                      id="gender"
                      label="Genre"
                      required
                      disabled
                    //   size="small"
                      variant={variant}
                      value={client.civility==='Mr'?'M':'F'}
                    />  
                  </Grid>
                  
                  <TextField 
                    className={classes.elem}
                    id="email"
                    label="Email"
                    type="email"
                    color="primary"
                    value={client.email}
                    onChange={handleChange}
                    variant={variant}
                    required
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon />
                            </InputAdornment>
                        ),
                    }}
                  />
                  <TextField 
                    className={classes.elem}
                    id="phoneNumber"
                    label="Phone"
                    type="tel"
                    color="primary"
                    value={client.phoneNumber}
                    onChange={handleChange}
                    variant={variant}
                    required
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
                    <TextField 
                      className={classes.elem}
                      id="adress"
                      label="Adresse"
                      color="primary"
                      value={client.adress}
                      onChange={handleChange}
                      variant={variant}
                      required
                      InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <HomeIcon />
                            </InputAdornment>
                        ),
                      }}
                    />
                    <TextField 
                        className={classes.elem}
                        id="postalCode"
                        label="Code Postal"
                        color="primary"
                        type="number"
                        value={client.postalCode}
                        onChange={handleChange}
                        variant={variant}
                        required
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
                    <TextField 
                        className={classes.elemSpe}
                        id="city"
                        label="Ville"
                        color="primary"
                        value={client.city}
                        onChange={handleChange}
                        variant={variant}
                        required
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
                        variant={variant}
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
                  
                  <FormControlLabel 
                     control={
                        <Checkbox 
                            checked={client.isClient}
                            // id="isClient"
                            onChange={handleisClient}
                        />} 
                     label="Êtes vous un Client ? "
                     labelPlacement="top"
                    />

                    <div id="isClient" style={{display:'block'}}>
                        Donc Remplissez les champs ici présent :

                        <TextField
                            className={classes.elemSpe}
                            id="dateOfBirth"
                            label="Date de Naissance"
                            type="date"
                            color="primary"
                            defaultValue={client.dateOfBirth}
                            onChange={handleChange}
                            variant={variant}
                            required={client.isClient}
                            
                        />
                        <TextField 
                            className={classes.elemSpe}
                            id="age"
                            label="Votre age est : "
                            color="primary"
                            type="number"
                            disabled
                            value={client.age}
                            variant={variant}
                            required={client.isClient}
                        />
                        <TextField 
                            className={classes.elem}
                            id="placeOfBirth"
                            label="Lieu de Naissance"
                            color="primary"
                            value={client.placeOfBirth}
                            onChange={handleChange}
                            variant={variant}
                            required={client.isClient}
                        />
                        <TextField 
                            className={classes.elem}
                            id="nationalRegister"
                            label="N° Registre National"
                            color="primary"
                            value={client.nationalRegister}
                            onChange={handleChange}
                            variant={variant}
                            required={client.isClient}
                        />

                    </div>

                </Grid>

                <Grid container item
                    direction="row"
                    justify="flex-end"
                    alignItems="flex-end"
                >
                <Button
                    color="secondary"
                    variant="contained"
                    className={classes.elem}
                    type="reset"
                    onClick={clearBtn}
                >
                    Reset
                </Button>

                <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    className={classes.elem}
                >
                    Valider
                </Button>
            </Grid>

            </Grid>
        </form>
    )
}

export default CreateClient
