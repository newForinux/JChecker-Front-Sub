import React from 'react';
import { AppBar, Toolbar, Typography, CssBaseline, Container, Grid, Divider } from '@material-ui/core';
import FileUploadComponent from './Components/FileUploadComponent';
import { ThemeProvider, unstable_createMuiStrictModeTheme } from '@material-ui/core/styles'
import SelectCond from './Components/policy/SelectCond';



const theme = unstable_createMuiStrictModeTheme();

function App() {

  return (
    <ThemeProvider theme={theme}>

    <div className="App">
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">React File Upload</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Toolbar />

      <Container maxWidth="md">
          <Grid container>
            <FileUploadComponent />
            <Divider />
            <SelectCond />
            
          </Grid>
          
      </Container>
    </div>
    </ThemeProvider>
  );
}

export default App;
