import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";

const Title = styled(Typography)(({ theme }) => ({
    flexGrow: 1,
}));

const NavLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: 'inherit',
    margin: '0 10px',
}));

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Title variant="h6"></Title>
                <Button color="inherit">
                    <NavLink to="/">Home</NavLink>
                </Button>
                <Button color="inherit">
                    <NavLink to="/registration">Registration</NavLink>
                </Button>
                <Button color="inherit">
                    <NavLink to="/login">Login</NavLink>
                </Button>
                <Button color="inherit">
                    <NavLink to="/admin">Admin</NavLink>
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
