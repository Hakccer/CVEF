import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { BugReport, Logout } from '@mui/icons-material'
import { bgcolor } from "@mui/system";
import { useNavigate } from "react-router-dom";

const DappBar = () => {
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const navigation = useNavigate()

    return (
        <Box sx={{ flexGrow: 1, borderBottom: '2px solid white' }}>
            <AppBar position="static" sx={{ backgroundColor: 'tomato' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <BugReport />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: '700', letterSpacing: '4px' }}>
                        CVE-Finder
                    </Typography>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => {
                            navigation('/logout')
                        }}
                    >
                        <Logout></Logout>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box >
    )
}

export default DappBar