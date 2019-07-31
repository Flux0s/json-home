import React, { Component } from "react";
import { Container, Typography, Paper } from "@material-ui/core";

class NotFound extends Component {
    render() {
        return (
            <Paper style={{ height: "100%" }}>
                <Container>
                    <Typography variant="h1">404.</Typography>
                    <Typography variant="h5">
                        Sorry we were unable to find the page you're looking
                        for.
                    </Typography>
                </Container>
            </Paper>
        );
    }
}

export default NotFound;
