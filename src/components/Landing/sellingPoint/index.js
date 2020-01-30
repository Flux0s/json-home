import {
  withStyles,
  Card,
  Typography,
  Grid,
  CardContent,
  Divider
  // CardMedia
} from "@material-ui/core"
import React, { Component } from "react"

const styles = (theme) => ({
  gridItem: {
    zIndex: 1
  },
  card: {
    // padding: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(4),
      width: 300,
      height: 200
    },
    [theme.breakpoints.up("sm")]: {
      margin: theme.spacing(0, 2),
      height: 280
    },
    [theme.breakpoints.up("md")]: {
      margin: theme.spacing(0, 4),
      height: 280
    },
    [theme.breakpoints.up("lg")]: {
      margin: theme.spacing(0, 10),
      padding: 10
    }
  },
  divider: {
    // [theme.breakpoints.up("sm")]: {
    // margin: theme.spacing(0, 2)
    // },
    [theme.breakpoints.up("md")]: {
      margin: theme.spacing(2, 0)
    }
  }
})

class SellingPoint extends Component {
  render() {
    const { classes } = this.props

    return (
      <Grid item sm className={classes.gridItem}>
        <Card className={classes.card}>
          {/* <CardMedia
                            className={classes.media}
                            image={this.props.imagePath}
                        /> */}
          <CardContent>
            <Typography gutterBottom variant='h5'>
              {this.props.title}
            </Typography>
            <Divider className={classes.divider} />
            <Typography variant='body2' color='textSecondary' component='p'>
              {this.props.content}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    )
  }
}

export default withStyles(styles)(SellingPoint)
