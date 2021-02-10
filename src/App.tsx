import React from 'react';
import { AppBar, Toolbar, Typography, CssBaseline, Container, Grid, Divider } from '@material-ui/core';
import FileUploadComponent from './Components/FileUploadComponent';
import { ThemeProvider, unstable_createMuiStrictModeTheme } from '@material-ui/core/styles'
import DialogProvider from './Components/DialogProvider';
import PolicyPopup from './Components/PolicyPopup';


const theme = unstable_createMuiStrictModeTheme();

function App() {

  return (
    <ThemeProvider theme={theme}>
    <DialogProvider>
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
            <PolicyPopup />
            
          </Grid>
          
      </Container>
    </div>
    </DialogProvider>
    </ThemeProvider>
  );
}

export default App;
