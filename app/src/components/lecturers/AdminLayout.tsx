import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import AccountMenu from './AccountMenu';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { NavLink } from 'remix';
import { useLocation } from 'remix'





const drawerWidth: number = 270;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
       zIndex: 1,
      background:`linear-gradient( rgba(0, 0, 0, 0.8) 100%, rgba(0, 0, 0, 0.7) 100%), url("/sidebar/sidebar-2.jpg")`,
      backgroundSize:'cover',
      backgroundPosition: 'center center',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme({
  components: {
    MuiListItemText: {
      styleOverrides: {
        root: {
            fontSize: 10, 
            color: 'white',
            
          }
       }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          marginTop: 7, 
          marginBottom: 12, 
          '&.Mui-selected': {
            width: '80%',
            marginLeft: 5,
            '&:hover': {
              backgroundColor : 'white'
            },
            backgroundColor: 'white',
            borderRadius: 5,
            boxShadow : `0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) inset`,
            
           // paddingRight: 5
          }
          
        }
      }
    },
  
   }
});

function AdminLayout ({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(true);
 // const router = useRouter();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const isActiveRoute = (to: string): Boolean => {
    const currentLocation = useLocation();
    return  currentLocation.pathname === to ? true : false

  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex'}}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon fontSize="medium"/>
              </Badge>
             </IconButton>
               <AccountMenu/>    
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
              backgroundColor: 'transparent',
            }}
          >
            <IconButton onClick={toggleDrawer}>
                          <ChevronLeftIcon sx={{color:'white'}}/>
            </IconButton>
          </Toolbar>
          <Divider sx={{backgroundColor:'#757575', mx: 2}}/>
          <List component="nav" aria-label="main nav links" sx={{ ml: open ? 4 : 0 }}>
            <ListItemButton
              component={NavLink}
              to="/admin/"
              selected={isActiveRoute('/admin/') ? true : false}
              sx={{ boxShadow: isActiveRoute('/admin') ? 4 : 0 }}
            >
              <ListItemIcon>
                <Avatar
                alt="Remy Sharp"
                src="/teacher.png"
                sx={{ width: 35, height: 35 }}
                />
              </ListItemIcon>
              <ListItemText primary="Lecturer"
                sx={{
                color: isActiveRoute('/admin/')? 'black' : 'white',

              }} />
            </ListItemButton>
                      {[
                       
                          { url: '/admin/administrator',logo:'/net_admin.png', name:'Administrator'},
                          { url: '/admin/cours1',logo:'/graduation.png',name:'Course1' },
                          { url: '/admin/course2',logo:'/account_settings.png',name:'Settings' }].map((item, index) => 
                        <ListItemButton
                              key={index}
                              component={NavLink}
                              to={item.url}
                          selected={isActiveRoute(item.url) ? true : false}
                          //onClick={(event) => handleListItemClick(event, item.url)}
                          sx={{boxShadow: isActiveRoute(item.url) ? 4 : 0 }}
                        >          
            <ListItemIcon>
             <Avatar
                alt="Remy Sharp"
                src={item.logo}
                sx={{ width: 35, height: 35 }}
                />
           </ListItemIcon>
                          <ListItemText
                            primary={item.name}
                            sx={{ color: isActiveRoute(item.url) ? 'black' : 'white' }}

                          />                    
            </ListItemButton>
             )

                      }
                  </List>
          <Divider />
          
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor:'#cfd8dc',
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
            {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default AdminLayout