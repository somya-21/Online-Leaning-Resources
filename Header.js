import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

function Header() {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <SchoolIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div">
            VirtuNexa Learning Platform
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
