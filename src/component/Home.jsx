import React from 'react';
import { useHistory } from 'react-router-dom';
import { 
    Grid,
    Card, 
    Button, 
    TextField, 
    IconButton, 
    FormControl, 
} from '@material-ui/core';

import { 
    createStyles, 
    makeStyles, 
} from '@material-ui/core/styles';

import { 
    SupervisorAccount as SupervisorAccountIcon,
    DoubleArrowRounded as DoubleArrowRoundedIcon,
    AccountCircle as AccountCircleIcon,
    Visibility,
    VisibilityOff, 
} from '@material-ui/icons';


const useStyles = makeStyles((theme) =>
    createStyles({
        root:{
            margin: theme.spacing(2),
        },
        inputAdmin:{
            display:"none",
            padding: theme.spacing(2),
        },
    }),
);

const Home = () => {
    const classes = useStyles(); 

    const AdminPsw = 'Admin12345'; 
    
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
        isValid: true,
        labelTextInput: 'Entrez votre mot de passe Admin'
    }
);

const history = useHistory();

const verifyPassword = () =>{

    if(values.password === AdminPsw){
    
        console.log("Authentification réiussie ! ");
        return history.push('/AdminProfile');
    }
    else{
        console.log(values.password);
        console.log("Authentification échouée !");
        setValues({ ...values , isValid:false, labelTextInput:'Mot de passe incorrect ! ' })
    }
}

const activeInputAdmin = () => {
    let dis = document.getElementById('inputAdmin').style.display;
    dis==="block"?document.getElementById('inputAdmin').style.display="none":document.getElementById('inputAdmin').style.display="block";
}

const handleChangeTextInput = e => {
    setValues({ ...values, password: e.target.value });
}
const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
};

    return (
        <div className={classes.root}>
            <Grid container
                direction="row"
                justify="center"
                spacing={3}
            >
                <Grid item
                    xs={12} sm={6} md={4}
                >
                    <Card>
                        <Button 
                            fullWidth
                            variant="contained"
                            size="large"
                            color="primary"
                            startIcon={<AccountCircleIcon />}
                            href="/"
                        >
                            JE SUIS UN CLIENT
                        </Button>
                    </Card>
                </Grid>

                <Grid item
                    xs={12} sm={6} md={4}
                >
                    
                    <Card>
                        <Button 
                            fullWidth
                            variant="contained"
                            size="large"
                            color="primary"
                            startIcon={<SupervisorAccountIcon />}
                            onClick={activeInputAdmin}
                        >
                            JE SUIS L'ADMIN
                        </Button>
                    </Card> 
                    
                    <FormControl 
                        id="inputAdmin" 
                        className={classes.inputAdmin}
                        color="primary"
                    >
                        <TextField
                            id="psw"
                            placeholder="Mot de passe..."
                            color="primary"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChangeTextInput}
                            variant="outlined"
                            autoFocus
                            error={values.isValid? false:true}
                            label={values.labelTextInput}
                        />
                        <IconButton
                            color="primary"
                            onClick={handleClickShowPassword}
                        >
                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                        
                        <IconButton 
                            color="primary"
                            onClick={verifyPassword}
                            >
                            <DoubleArrowRoundedIcon />                
                        </IconButton>
                    </FormControl>

                </Grid>
            </Grid>
        </div>
    )
}

export default Home;
