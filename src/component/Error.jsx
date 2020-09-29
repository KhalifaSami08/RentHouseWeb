import React from 'react'
import Typography from '@material-ui/core/Typography';
const Error = () => {
    return (
        <>
            <Typography
                variant="h4"
                color="primary"
            >
                Zut Erreur 404 -  Cette page n'existe pas...
                <br/>
                <br/>
                Retournez au menu en appuyant sur la petite maison ou sur le nom de l'application
            </Typography>  
        </>
    )
}

export default Error;
