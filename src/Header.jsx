import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Box } from '@mui/material';
import { Menu as MenuIcon, AccountCircle, ArrowDropDown } from '@mui/icons-material';

// Define your custom theme here
const theme = {
  palette: {
    primary: {
      main: '#795548', // brownish undertone
    },
    secondary: {
      main: '#9E9E9E',
    },
    text: {
      primary: '#fff',
    },
  },
  typography: {
    fontFamily: 'Roboto',
    fontSize: 16,
  },
};

const StyledAppBar = styled(AppBar)`
  background-color: ${props => props.theme.palette.primary.main};
  color: ${props => props.theme.palette.text.primary};
  box-shadow: none;
  border-bottom: 2px solid ${props => props.theme.palette.secondary.main};

  /* Override MUI styles */
  @media (min-width: 600px) {
    .MuiToolbar-root {
      min-height: 64px;
      background-color: #8d6e63; // brownish undertone
    }
  }
`;

const StyledTypography = styled(Typography)`
  flex-grow: 1;
  font-size: ${props => props.theme.typography.fontSize}px;
`;

const StyledIconButton = styled(IconButton)`
  margin-right: 16px;
`;

const Header = ({ onMenuButtonClick }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box component="header" sx={{ bgcolor: 'brown', color: 'white', p: 3 }}>
        <StyledAppBar position="fixed">
          <Toolbar>
            <StyledIconButton
              color="inherit"
              aria-label="open menu"
              onClick={onMenuButtonClick}
            >
              <MenuIcon />
            </StyledIconButton>
            <StyledTypography variant="h6" noWrap>
              Store
            </StyledTypography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          </Toolbar>
        </StyledAppBar>
      </Box>
    </ThemeProvider>
  );
};

export default Header;













        
              




