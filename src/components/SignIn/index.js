import React, { Component } from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import LockedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"

import { authenticationService } from "../helpers/auth-service"
import { DASHBOARD } from "../../constants/routes"
import { withSnackbar } from "notistack"

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
})

class SignIn extends Component {
  constructor(props) {
    super(props)
    // redirect to home if already logged in
    if (authenticationService.currentUserValue) {
      this.props.history.push(DASHBOARD)
    }
    this.state = {
      username: "",
      password: ""
    }
  }

  handleUsernameChange = (event) => {
    // console.log(
    //     "User attempted to modify username field",
    //     event.target.value
    // );
    this.setState({ username: event.target.value })
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    // console.log(
    //     "User attempted to submit sign in information!\n Username: ",
    //     this.state.username,
    //     " Password: ",
    //     this.state.password
    // );
    authenticationService
      .signin(this.state.username, this.state.password)
      .then((user) => {
        if (user != null) this.props.history.push(DASHBOARD)
      })
      .catch((error) => {
        this.props.enqueueSnackbar(error.message, {
          variant: "error",
          autoHideDuration: 4000
        })
      })
  }

  render() {
    const { classes } = this.props
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign In
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={this.handleSubmit}
          >
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
        </div>
      </Container>
    )
  }
}

export default withSnackbar(withStyles(styles)(SignIn))
