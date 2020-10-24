import React from 'react'
import {useSelector} from "react-redux";
import SelfButton from "./CRUD/Create/persoLayout/SelfButton";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const GenerateContract = () => {
    const myCurrentContract = useSelector(contr => contr.reducerContractKey.currentContract);
    console.log(myCurrentContract)

    const [toDownload,setToDownload] = React.useState({
        bail:false,
        garant:false,
        lieuEntree:false,
        lieuSortie:false,
        resiAntip:false,
        congeBail:false
    });

    const handleChange = e =>{
        const eId = e.currentTarget.id;
        console.log(toDownload);
        setToDownload(c => ({...c, [eId] : !toDownload[eId] }))
    }

    const submitBtn = e => {
        console.log("Fichiers en cours de téléchargement...")
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
                <SelfButton id={"bail"} text={"Contrat de Bail"} click={handleChange} color={toDownload.bail?"secondary":"primary"} />
                <SelfButton id={"garant"} text={"Caution du garant"} click={handleChange} color={toDownload.garant?"secondary":"primary"} />
                <SelfButton id={"lieuEntree"} text={"Etat des lieux d'entrée"} click={handleChange} color={toDownload.lieuEntree?"secondary":"primary"} />
                <SelfButton id={"lieuSortie"} text={"Etat des lieux de sortie"} click={handleChange} color={toDownload.lieuSortie?"secondary":"primary"} />
                <SelfButton id={"resiAntip"} text={"Résiliation anticipée"} click={handleChange} color={toDownload.resiAntip?"secondary":"primary"} />
                <SelfButton id={"congeBail"} text={"Congé de bail"} click={handleChange} color={toDownload.congeBail?"secondary":"primary"} />
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
