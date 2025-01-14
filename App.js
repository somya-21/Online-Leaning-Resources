import React from 'react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import ResourceList from './components/ResourceList';
import Header from './components/Header';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <ResourceList />
    </ThemeProvider>
  );
}

export default App;
