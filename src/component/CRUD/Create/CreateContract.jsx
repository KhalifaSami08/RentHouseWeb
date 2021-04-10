import React from 'react';
import {useHistory, useParams} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    FormHelperText, Checkbox, FormControlLabel,

} from "@material-ui/core";
import {
    HomeWork as HomeWorkIcon,
    AccountCircleRounded as AccountCircleRoundedIcon,
} from "@material-ui/icons";

import ResetSubmit from "./persoLayout/ResetSubmit";
import MyTextField from "./persoLayout/MyTextField";
import {useDispatch, useSelector} from "react-redux";
import {addContractAction, updateContractAction} from "../../../store/action/ContractAction";
import MyDatePicker from "./persoLayout/MyDatePicker";


const useStyles = makeStyles((theme) =>
    createStyles({
        grid:{
            margin: theme.spacing(2),
        },
        formControl:{
            margin: theme.spacing(0.5),
            minWidth: 100,
            maxWidth: 250,
        },
        selectProp:{
            color: 'teal',
        }
    }),
);

const CreateContract = () => {

    const classes = useStyles();
    const { idParam } = useParams();
    const history = useHistory();

    const dispatch = useDispatch();
    const myCurrentContract = useSelector(contr => contr.reducerContractKey.currentContract);

    const listOfProperties = useSelector(contr => contr.reducerPropertyKey.allProperties);
    const listOfClients = useSelector(contr => contr.reducerClientKey.allClient);
    

    const contractDefaultValues = {

        propertyId:3,
        clientId:1,
        
        property:{
            rentCost:""
        },
        client:{},

        beginContract:new Date("2020-05-28"), //date actuelle par défaut, géré dans le back
        endContract:new Date("2030-05-30"),
        duration:"", // par défaut = diff entre date de sortie et date d'entrée
        baseIndex:4,
        guaranteeAmount:0, // par défaut = 2X Loyer
        signatureDate:new Date("2020-10-20"), //date actuelle par défaut, géré dans le back

        beginIndexWater:0,
        beginIndexGaz:0,
        beginIndexElectricity:0,

        endIndexWater:0,
        endIndexGaz:0,
        endIndexElectricity:0,

        isGuaranteePaid:false,
        guaranteePaidDate:new Date("2020-10-20"),
        isFirstMountPaid:true,
        entryDate:new Date("2020-10-20"), //date actuelle par défaut
        releaseDate:new Date("2030-10-20"),
    }

    const [isUpdateStatus, setUpdateStatus] = React.useState(false);
    const [contract,setContracts] = React.useState(contractDefaultValues);

    React.useEffect(() => {
        
        if(idParam !== undefined){
            setUpdateStatus(true);
            setContracts(myCurrentContract);
        }
    },[idParam, myCurrentContract]);


    React.useEffect(() => {
        const index = listOfProperties.findIndex(p => p.idProperty === contract.propertyId);
        const newProp = listOfProperties[index];
        setContracts(c => ({...c, property: newProp, guaranteeAmount: newProp?.rentCost *2}))
    },[contract.propertyId, listOfProperties]);

    React.useEffect(() => {
        let beginCont = new Date(contract.beginContract);
        let endCont = new Date(contract.endContract);
        let finalDuration =( endCont.getMonth() - beginCont.getMonth() ) + ( endCont.getFullYear() - beginCont.getFullYear() ) * 12;
        setContracts(c => ({...c, duration: finalDuration }))
    },[contract.beginContract, contract.endContract]);

    const handleOnSubmit = async e => {
        e.preventDefault();

        if(isUpdateStatus){
            await dispatch(updateContractAction(contract));
        }
        else{
            await dispatch(addContractAction(contract));
        }
        return history.push('/AdminProfile');
    }

    const handleChange = e => {
        const eId = e.currentTarget.id;
        console.log(eId+" -> "+e.target.value);
        setContracts({...contract, [eId]:e.target.value });
    }


    const handleBoolean = e => setContracts({...contract,[e.target.name]: e.target.checked});

    const clearBtn = e => setContracts(contractDefaultValues);
    const ListsOfPropsAndClients = () => {
        return(
            <Grid className={classes.grid} item>
                <FormControl
                    className={classes.formControl}
                >
                    <InputLabel id="Property_label">ID du Propriétaire</InputLabel>
                    <Select
                        id="propertyId"
                        labelId="Property_label"
                        value={contract.propertyId}
                        onChange={handleChange}
                        color="primary"
                        variant={"filled"}
                        startAdornment={<HomeWorkIcon />}
                    >
                        {listOfProperties.map(
                            property => {
                                let propID = property.idProperty;
                                return (
                                    <MenuItem key={propID} id="propertyId" className={property.nbLocator > 0?classes.selectProp:""} value={propID}>{'Property : '+propID} {property.isCurrentlyRented?'*':''}</MenuItem>
                                )}
                        )}
                    </Select>
                    <FormHelperText className={classes.selectProp}> Colocation Uniquement * </FormHelperText>
                </FormControl>

                <FormControl
                    className={classes.formControl}
                >
                    <InputLabel id="client_label">ID du client</InputLabel>
                    <Select
                        id="clientId"
                        labelId={"client_label"}
                        value={contract.clientId}
                        onChange={handleChange}
                        color="primary"
                        variant={"filled"}
                        startAdornment={<AccountCircleRoundedIcon />}
                    >
                        {listOfClients.map(
                            client => {
                                let cliID = client.idClient;
                                let fullname = client.name+" "+client.surname;
                                let canRent = client.haveAlreadyRentedHouse;
                                return (
                                    <MenuItem disabled={canRent} key={cliID} id="clientId" value={cliID}>{fullname} {canRent?'*':''}</MenuItem>
                                )}
                        )}
                    </Select>
                    <FormHelperText disabled>Un contrat par client * </FormHelperText>
                </FormControl>
            </Grid>
        )
    }
    return (
        <form onSubmit={handleOnSubmit}>
            <Grid container
                  className={classes.grid}
                  direction="row"
                  alignItems="center"
                  justify="center"
            >
                <Grid
                    item
                    xs={12} sm={6}
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >

                    {isUpdateStatus?"SI VOUS VOULEZ MODIFIER LE CLIENT OU LA PROPRIETE, FAITES UN AUTRE CONTRAT":<ListsOfPropsAndClients />}

                    <Grid className={classes.grid} item>
                        <MyDatePicker id={"beginContract"} label={"Début du contrat"} value={contract.beginContract} onChange={e => setContracts(c =>({...c, beginContract:e}))} />
                        <MyDatePicker id={"endContract"} label={"Fin du contrat"} value={contract.endContract} onChange={e => setContracts(c =>({...c, endContract:e}))}/>
                        <MyTextField id={"duration"} label={"Durée en mois"} disabled value={contract.duration} type={"number"}/>
                    </Grid>
                    <Grid className={classes.grid} item>
                        <MyTextField id={"baseIndex"} label={"Index de Base"} onChange={handleChange} value={contract.baseIndex} type={"number"}/>
                        <MyTextField id={"guaranteeAmount"} label={"Montant de la Garantie en €"} onChange={handleChange} value={contract.guaranteeAmount+' € '} disabled/>
                        <MyDatePicker id={"signatureDate"} label={"Date de signature"} onChange={e => setContracts(c =>({...c, signatureDate:e}))} value={contract.signatureDate} />
                    </Grid>
            </Grid>
            <Grid
                item
                xs={12} sm={6}
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Grid className={classes.grid} item>
                    <MyTextField id={"beginIndexWater"} label={"Index Eau a l'entrée"} onChange={handleChange} value={contract.beginIndexWater} type={"number"}/>
                    <MyTextField id={"beginIndexGaz"} label={"Index Gaz a l'entrée"} onChange={handleChange} value={contract.beginIndexGaz} type={"number"}/>
                    <MyTextField id={"beginIndexElectricity"} label={"Index Electricité a l'entrée"} onChange={handleChange} value={contract.beginIndexElectricity} type={"number"}/>
                </Grid>
                <Grid className={classes.grid} item>
                    <MyTextField id={"endIndexWater"} label={"Index Eau a la sortie"} onChange={handleChange} value={contract.endIndexWater} type={"number"}/>
                    <MyTextField id={"endIndexGaz"} label={"Index Gaz a la sortie"} onChange={handleChange} value={contract.endIndexGaz} type={"number"}/>
                    <MyTextField id={"endIndexElectricity"} label={"Index Electricité a la sortie"} onChange={handleChange} value={contract.endIndexElectricity} type={"number"}/>
                </Grid>
                <Grid className={classes.grid} item>
                    <FormControlLabel
                        control={ <Checkbox checked={contract.isGuaranteePaid} name={"isGuaranteePaid"} onChange={handleBoolean} />}
                        label="La garantie est-elle payée ? "
                        labelPlacement="top"
                    />

                    <MyDatePicker id={"guaranteePaidDate"} label={"Date de paimenent de la garantie"} onChange={e => setContracts(c =>({...c, garanteePaidDate:e}))} value={contract.guaranteePaidDate} disabled={!contract.isGuaranteePaid} />
                </Grid>

                <Grid className={classes.grid} item>
                    <FormControlLabel
                        control={ <Checkbox checked={contract.isFirstMountPaid} name={"isFirstMountPaid"} onChange={handleBoolean} />}
                        label="Le premier mois est-il payé  ? "
                        labelPlacement="top"
                    />

                    <MyDatePicker id={"entryDate"} label={"Date d'entrée"} onChange={e => setContracts(c =>({...c, entryDate:e}))} value={contract.entryDate} />
                    <MyDatePicker id={"releaseDate"} label={"Date de sortie"} onChange={e => setContracts(c =>({...c, releaseDate:e})) } value={contract.releaseDate} />
                </Grid>

            </Grid>
        </Grid>

        <ResetSubmit clearBtn={clearBtn} />

        </form>
    )
}

export default CreateContract
