import React from 'react';
import PropertyList from './CRUD/PropertyList';
import ClientList from './CRUD/ClientList';
import ContractList from './CRUD/ContractList';
import { 
  Grid, 
  Box, 
  Tabs, 
  Tab, 
  AppBar, 
} from '@material-ui/core';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

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

const AdminProfile = () => {

  const [value, setValue] = React.useState(0);
  
  const handleChangeTab = (e, newValue) => {
    setValue(newValue);
  };

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
      <Grid

      >
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
