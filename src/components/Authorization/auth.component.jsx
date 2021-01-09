import React, { useState, useEffect } from "react";
import { db } from "../FireBase/firebase";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn({ signedIn, setSignedIn }) {
  const [userList, setUserList] = useState([
    // {
    //   userName: "zheksha",
    //   passcode: "1234",
    // },
  ]);

  const [currentUser, setCurrentUser] = useState({});
  const [userExists, setUserExists] = useState(true);

  const checkUser = (e) => {
    userList.forEach((user) => {
      if (
        user.passcode === currentUser.passcode &&
        user.userName === currentUser.userName
      ) {
        setSignedIn(true);
      } else {
        setUserExists(false);
      }
    });
  };

  const onInputChange = (e) => {
    const value = e.target.value;
    setCurrentUser({ ...currentUser, [e.target.name]: value });
  };

  useEffect(() => {
    (async () => {
      const res = await db.collection("usersList").get();
      const response = [];
      res.docs.map((doc) => {
        response.push(doc.data());
        return;
      });
      setUserList([...userList, ...response]);
    })();
  }, []);

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="userName"
            autoComplete="email"
            autoFocus
            onChange={onInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="passcode"
            label="Passcode"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onInputChange}
          />
          <label>
            {userExists
              ? "Please, be aware this is not secure."
              : "No such username or passcode 🤪"}
          </label>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={checkUser}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}
