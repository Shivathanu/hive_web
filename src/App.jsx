import React, { useState } from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import SideBar from './Components/SideBar/SideBar';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import { Drawer } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import UserInfo from './Components/UserInfo/UserInfo';
import { UserInfoProvider } from './Components/UserInfo/UserInfoContext';
import ProfessionalReg from './Components/Authentication/Registration/ProfessionalReg'
import Routes from './Configs/Routes';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';

/**
 * APP - Main Component
 */
export default function App() {
  const [appContext, setAppContext] =
    useState({
      isLoggedIn: false,
      professionalContext: null
    })

  const onSessionStateChange = (newState) => {
    setAppContext({
      isLoggedIn: newState.isLoggedIn,
      professionalContext: newState.professionalContext
    })
  }

  const classes = useStyles();

  if (!appContext.isLoggedIn) {
    return (
      <ProfessionalReg currrentState={appContext} changeSessionState={onSessionStateChange}></ProfessionalReg>
    )
  } else {
    return (
      <BrowserRouter>
        <div className="root">
          <CompleteSideBar />
          <main className="content">
            <div className={classes.toolbar} />
            <UserInfoProvider >
              <UserInfo currrentState={appContext} />
              <Container className="container" id="container-position">
                <Routes />
              </Container>
            </UserInfoProvider>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

/**
 * Copyright Component
 */
function Copyright() {
  return (
    <Typography variant="body2" color="textPrimary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://hivesofts.com/" target="_blank">
        Hive Health
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

/**
 * Complete Side Bar Component
 */
function CompleteSideBar() {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} color="default">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className="logoTextColor">
            My Health Diary
            </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            className="drawerWraper"
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <div className="logoText">
              <h2>My <br />Health <br />Diary</h2>
            </div>
            <List>
              <SideBar />
            </List>
            <div className="copyright">
              <Copyright />
            </div>
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            variant="permanent"
            open
          >
            <div className="logoText">
              <h2>My <br />Health <br />Diary</h2>
            </div>
            <List>
              <SideBar />
            </List>
            <div className="copyright">
              <Copyright />
            </div>
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      display: 'none',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: {
    minHeight: '50px',
    [theme.breakpoints.up('sm')]: {
      minHeight: '0px',
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

