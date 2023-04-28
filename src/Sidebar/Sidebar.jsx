import React from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StoreIcon from '@mui/icons-material/Store';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { ListItemButton } from '@mui/material';
import styled from 'styled-components';
import { space, typography, color } from 'styled-system';

const SidebarContainer = styled.div`
  width: 240px;
  height: 100%;
  background-color: #F8F9FA;
  display: flex;
  flex-direction: column;
  padding: 16px;
  box-sizing: border-box;
  ${space}
  ${typography}
  ${color}
`;

const SidebarItem = styled(ListItemButton)`
  ${color}
`;

const Sidebar = ({ isAdmin }) => {
  return (
    <SidebarContainer
      color="#212529"
      fontFamily="Roboto, sans-serif"
      fontSize="16px"
    >
      <List>
        <SidebarItem component={Link} to="/" color="#212529">
          <ListItemIcon>
            <DashboardIcon style={{ color: '#7F5C46' }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </SidebarItem>
        <SidebarItem component={Link} to="/orders" color="#212529">
          <ListItemIcon>
            <StoreIcon style={{ color: '#7F5C46' }} />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </SidebarItem>
        {isAdmin && (
          <SidebarItem component={Link} to="/admin/products" color="#212529">
            <ListItemIcon>
              <StoreIcon style={{ color: '#7F5C46' }} />
            </ListItemIcon>
            <ListItemText primary="Product Management" />
          </SidebarItem>
        )}
        {!isAdmin && (
          <SidebarItem component={Link} to="/user/products" color="#212529">
            <ListItemIcon>
              <StoreIcon style={{ color: '#7F5C46' }} />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </SidebarItem>
        )}
        <SidebarItem component={Link} to="/logout" color="#212529">
          <ListItemIcon>
            <ExitToAppIcon style={{ color: '#7F5C46' }} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </SidebarItem>
      </List>
    </SidebarContainer>
  );
};

export default Sidebar;
















