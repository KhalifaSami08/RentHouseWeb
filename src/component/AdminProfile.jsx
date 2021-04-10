import React from 'react';
import PropertyList from './CRUD/List/PropertyList';
import ClientList from './CRUD/List/ClientList';
import ContractList from './CRUD/List/ContractList';
import { 
  Grid, 
  Box, 
  Tabs, 
  Tab, 
  AppBar, 
} from '@material-ui/core';
import {useDispatch} from "react-redux";
import {getAllPropertiesAction} from "../store/action/PropertyAction";
import {getAllClientsAction} from "../store/action/ClientAction";
import {getAllContractsAction} from "../store/action/ContractAction";

let TABINDEX = 1;

const AdminProfile = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getAllPropertiesAction());
        dispatch(getAllClientsAction());
        dispatch(getAllContractsAction());
        console.log("FETCH DATAS ADMINPROFIL OK");
    },[dispatch]);

    const [value, setValue] = React.useState(TABINDEX);

    const handleChangeTab = (e, newValue) => {
        setValue(newValue);
        TABINDEX = newValue;
    };

    const TabPanel = (props) => {
        const { children, index, ...other } = props;

        return (
            <Grid
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                {...other}
            >
                {value === index && (
                    <Box p={3}>
                        <Grid>{children}</Grid>
                    </Box>
                )}
            </Grid>
        );
    }

  return (
    <>
      <AppBar position="static">
        <Tabs 
          value={value} 
          onChange={handleChangeTab}
          variant="fullWidth"
        >
            <Tab label="Propriétés"  />
            <Tab label="Clients"  />
            <Tab label="Documents" />
          </Tabs>
      </AppBar>
      <Grid>
        <TabPanel value={value} index={0}>
          <PropertyList />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ClientList />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ContractList />
        </TabPanel>
      </Grid>
      
    </>
    
  );
}

export default AdminProfile;
