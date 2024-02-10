import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import decode from "jwt-decode";
import useStyles from "./styles";

import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";

const Navbar = ({ userInfo }) => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const logout = () => {
    dispatch({ type: LOGOUT });
    history.push("/");
    setUser(null);

    window.location.reload();
  };

  useEffect(() => {
    const token = user?.token;

    // JWT
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
    // eslint-disable-next-line
  }, [location]);

  return (
    <AppBar
      className={classes.appBar}
      position="static"
      color="inherit"
      elevation={0}
    >
      <div className={classes.brandContainer}>
        <Typography
          className={classes.heading}
          component={Link}
          to="/"
          variant="h5"
          align="center"
        >
          InvestSphere
        </Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {userInfo ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt="useravatar"
              src={user ? user.result.image : ""}
            >
              {userInfo.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {userInfo.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="default"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            {" "}
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
