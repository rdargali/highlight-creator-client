import React from 'react';
import {Link} from 'react-router-dom'
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Profile from "./Profile"
import { useAuth0 } from "../react-auth0-spa";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PrimarySearchAppBar() {

  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {!isAuthenticated && <div>
        <MenuItem onClick={() => loginWithRedirect({})}>Log in</MenuItem>
      </div>}
      {isAuthenticated && <div>
        <MenuItem onClick={() => logout()}>Log out</MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <a className="menu-item-a-mobile" href="/profile">Profile</a>
        </MenuItem>
        <MenuItem component={Link} to="/profile">My account</MenuItem>
      </div>}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem>
        <a className="menu-item-a-mobile" href="/your-highlights">Highlights</a>
      </MenuItem>
      <MenuItem>
        <a className="menu-item-a-mobile" href="/your-playlists">Playlists</a>
      </MenuItem>
      <MenuItem>
        <a className="menu-item-a-mobile" href="/video">Videos</a>
      </MenuItem>
      <MenuItem>
        <a className="menu-item-a-mobile" href="/upload">Upload</a>
      </MenuItem>
    </Menu>
  );

  return (
    <div className="top">
    <div className={classes.grow}>
      <AppBar position="fixed" style={{ background: 'transparent', boxShadow: 'none'}}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <a className="menu-item-a" href="/">VarsityHype</a>
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <MenuItem>
              <a className="menu-item-a" href="/your-highlights">Highlights</a>
            </MenuItem>
            <MenuItem>
              <a className="menu-item-a" href="/your-playlists">Playlists</a>
            </MenuItem>
            <MenuItem>
              <a className="menu-item-a" href="/video">Videos</a>
            </MenuItem>
            <MenuItem>
              <a className="menu-item-a" href="/upload">Upload</a>
            </MenuItem>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <div className="header">
      {renderMobileMenu}
        {renderMenu}

        <div className="title">
            <img src= { require('./logo.png') } width="200"></img>
            <div className="paragraph">
                <h3>"Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore <br></br> et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco <br></br> laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                    irure dolor in reprehenderit in voluptate velit <br></br> esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</h3>

            </div>
        </div>
      </div>
        
    </div>
    </div>
  );
}