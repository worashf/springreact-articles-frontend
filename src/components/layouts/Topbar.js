import React from 'react';
import { useTheme, Box, IconButton } from '@mui/material';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { Link, NavLink } from 'react-router-dom';
import { ColorModeContext, tokens } from "../../theme";

const TopBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Styling for the links
  const linkStyle = {
    textDecoration: 'none',
    color: colors.greenAccent[300],
    padding: '0.5rem',
    marginRight: '1rem',
    fontSize: '1.2rem',
  };

  // Styling for the active link
  const activeLinkStyle = {
    ...linkStyle,
    fontWeight: 'bold',
    // Add additional styles for the active link
  };

  // Styling for the <hr> element
  const hrStyle = {
    border: 'none',
    height: '1px',
    backgroundColor: colors.grey[500],
    margin: '0',
  };

  // Styling for the logo link
  const logoStyle = {
    textDecoration: 'none',
    color: colors.blueAccent[400],
    padding: '0.5rem',
    marginRight: '1rem',
    fontSize: '1.5rem',
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignContent="center" px={3} py={1}>

      <Box sx={{ display: 'flex', gap: 5 }}>
         {/* Logo Link */}
        <Link to="/" style={logoStyle}>
          SpringReact Articles
        </Link>
          {/* Navigation Links */}
          <NavLink to="/authors" style={linkStyle} activeStyle={activeLinkStyle}>
            Authors
          </NavLink>
        </Box>

        <Box display="flex">
          <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>
          <IconButton>
            <PersonOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
      <hr style={hrStyle} />
    </>
  );
};

export default TopBar;
