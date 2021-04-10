import React from 'react';
import SelfButton from "./CRUD/Create/persoLayout/SelfButton";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {useParams} from "react-router-dom";

const GenerateContract = () => {
    // const myCurrentContract = useSelector(contr => contr.reducerContractKey.currentContract);
    const { idParam } = useParams();
    console.log(idParam);

    const initState = {
        Lease:false,
        Guarantor:false,
        EntryState:false,
        ExitInventory:false,
        EarlyTermination:false,
        LeaseCancellation:false
    }
    const [toDownload,setToDownload] = React.useState(initState);

    const handleChange = e =>{
        const eId = e.currentTarget.id;
        setToDownload(c => ({...c, [eId] : !toDownload[eId] }))
    }

    const submitBtn = e => {
        e.preventDefault();
        console.log("Fichiers en cours de téléchargement...");

        for (const val in toDownload) {
            if(toDownload[val]){
                download(idParam, val).then(r => console.log(r));
            }
        }

        console.log("Tout les documents ont été téléchargés ! ");
        setToDownload(initState);
    }

    const download = async (idContr,idType) =>{
        window.open(`http://localhost:5000/api/contract/doc/${idContr}/${idType}`).blur();
    }
    const Count = () => {
        let cpt = 0;
        for (const val in toDownload) {
            if(toDownload[val]){
                cpt++;
            }
        }
        return cpt;
    }
    return (
        <Grid container>
            <Grid
                // xs={6}
                item
                container
                direction={"row"}
                justify={"center"}
                alignItems={"center"}
                style={{margin:15}}
            >
                <SelfButton id={"Lease"} text={"Lease Contract"} click={handleChange} color={toDownload.Lease?"secondary":"primary"} />
                <SelfButton id={"Guarantor"} text={"Guarantor"} click={handleChange} color={toDownload.Guarantor?"secondary":"primary"} />
                <SelfButton id={"EntryState"} text={"Entry State"} click={handleChange} color={toDownload.EntryState?"secondary":"primary"} />
                <SelfButton id={"ExitInventory"} text={"Exit Inventory"} click={handleChange} color={toDownload.ExitInventory?"secondary":"primary"} />
                <SelfButton id={"EarlyTermination"} text={"Early Termination"} click={handleChange} color={toDownload.EarlyTermination?"secondary":"primary"} />
                <SelfButton id={"LeaseCancellation"} text={"Lease Cancellation"} click={handleChange} color={toDownload.LeaseCancellation?"secondary":"primary"} />
                <Count /> / 6

            </Grid>
            {/*<Grid
                item
                container
                direction={"row"}
                justify={"center"}
                alignItems={"center"}
            >
                <Count /> / 6
            </Grid>*/}
            <Grid
                // xs={6}
                item
                container
                direction={"row"}
                justify={"center"}
                alignItems={"center"}
            >
                <Button
                    color={"secondary"}
                    onClick={submitBtn}
                    variant={"contained"}
                    style={{'margin':'1em'}}
                >
                    GENERER LES DOCUMENTS
                </Button>
            </Grid>
        </Grid>
    )
}

export default GenerateContract;
