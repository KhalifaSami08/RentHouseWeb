import React from 'react'
import axios from 'axios';
import {useSelector} from "react-redux";
import SelfButton from "./CRUD/Create/persoLayout/SelfButton";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const GenerateContract = () => {
    const myCurrentContract = useSelector(contr => contr.reducerContractKey.currentContract);
    // console.log(myCurrentContract)

    const [toDownload,setToDownload] = React.useState({
        BAIL:false,
        GARANT:false,
        LIEU_ENTRE:false,
        LIEU_SORTIE:false,
        RESILIATION_ANTICIPE:false,
        CONGE_BAIL:false
    });

    const handleChange = e =>{
        const eId = e.currentTarget.id;
        // console.log(toDownload);
        setToDownload(c => ({...c, [eId] : !toDownload[eId] }))
    }

    const submitBtn = e => {
        e.preventDefault();
        console.log("Fichiers en cours de téléchargement...");

        for (const val in toDownload) {
            if(toDownload[val]){
                download(myCurrentContract.idContract, val)
                    .then(() => console.log("Tout les documents ont été téléchargés ! "));
            }
        }
    }

    const download = async (idContr,idType) =>{
        await axios.get("http://localhost:5000/api/contract/doc/"+idContr+"/"+idType)
            .then(res => console.log(res.data));
    }

    return (
        <Grid
            container
        >
            <Grid
                item
                container
                direction={"column"}
                justify={"center"}
                alignItems={"center"}
            >
                <SelfButton id={"BAIL"} text={"Contrat de Bail"} click={handleChange} color={toDownload.BAIL?"secondary":"primary"} />
                <SelfButton id={"GARANT"} text={"Caution du garant"} click={handleChange} color={toDownload.GARANT?"secondary":"primary"} />
                <SelfButton id={"LIEU_ENTRE"} text={"Etat des lieux d'entrée"} click={handleChange} color={toDownload.LIEU_ENTRE?"secondary":"primary"} />
                <SelfButton id={"LIEU_SORTIE"} text={"Etat des lieux de sortie"} click={handleChange} color={toDownload.LIEU_SORTIE?"secondary":"primary"} />
                <SelfButton id={"RESILIATION_ANTICIPE"} text={"Résiliation anticipée"} click={handleChange} color={toDownload.RESILIATION_ANTICIPE?"secondary":"primary"} />
                <SelfButton id={"CONGE_BAIL"} text={"Congé de bail"} click={handleChange} color={toDownload.CONGE_BAIL?"secondary":"primary"} />
            </Grid>
            <Grid
                item
                container
                direction="row"
                justify="flex-end"
                alignItems="flex-end"
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
