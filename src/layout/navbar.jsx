import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import {Outlet, useNavigate} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import {Suspense} from "react";

const Navbar = () => {
    const nav = useNavigate();

    // Onpress function for the buttons
    const onPress = (path) => {

        // alert("dsds")
        nav(path);
    }


    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" onClick={() => onPress(`/`)}>Page 1</Button>
                    <Button color="inherit" onClick={()=> onPress(`/page2`)}>Page 2</Button>
                    <Button color="inherit" onClick={()=> onPress('page3')}>Page 3</Button>
                </Toolbar>
            </AppBar>
        </Box>
        <Box component="main" sx={{ p: 3 }}>
            <Suspense fallback={<CircularProgress color="success" />}>
            <Outlet />
            </Suspense>
        </Box>
    </>
    );
}

export default Navbar