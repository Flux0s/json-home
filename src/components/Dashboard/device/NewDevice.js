import React, { Component } from "react";
import {
    withStyles,
    CardContent,
    Button,
    Box,
    Grid,
    Chip,
    CircularProgress
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import css from "./device.module.css";
import { withSnackbar } from "notistack";

import { api } from "../../helpers/api-service";

const styles = (theme) => ({
    addDeviceCard: {
        height: "100%",
        width: "100%",
        "text-align": "center",
        display: "flex"
    },
    BackgroundBox: {
        "background-color": theme.palette.grey[200],
        width: "inherit"
    },
    addIconButton: {
        margin: "auto",
        width: "inherit",
        height: "100%"
    },
    addIcon: {
        width: "30%",
        height: "30%"
    },
    activeButton: {
        margin: theme.spacing(0, 0, 0, 1)
    },
    typeChip: {
        margin: theme.spacing(0, 1, 1, 0)
    },
    deviceTypesLoad: {}
});
const device = {};

class NewDevice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "add",
            deviceTypes: null
        };
        api.getDeviceTypes()
            .then((types) => {
                this.setState({ deviceTypes: types });
            })
            .catch((error) => {
                this.props.enqueueSnackbar(error.message, {
                    variant: "error",
                    autoHideDuration: 4000
                });
            });
    }

    handleTypeChange = (type) => {
        this.setState({ type: type });
    };

    handleChipClick = (name) => {
        this.handleTypeChange("form");
    };

    handleSubmit = (event) => {
        event.preventDefault();
        api.addDevice(device)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                this.props.enqueueSnackbar(error.message, {
                    variant: "error",
                    autoHideDuration: 4000
                });
            });
    };

    render() {
        const MUIstyles = this.props.classes;
        const classes = { ...css, ...MUIstyles };
        let content;

        if (this.state.type === "form") {
            content = (
                <Box className={classes.parent}>
                    <Box className={classes.content} />
                    <Box className={classes.footer}>
                        <form onSubmit={this.handleSubmit}>
                            <Button
                                className={classes.activeButton}
                                variant="outlined"
                                onClick={() => this.handleTypeChange("add")}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className={classes.activeButton}
                                variant="contained"
                                color="primary"
                            >
                                Submit
                            </Button>
                        </form>
                    </Box>
                </Box>
            );
        } else if (this.state.type === "device-select") {
            content = (
                <Box className={classes.parent}>
                    <Box className={classes.content}>
                        {this.state.deviceTypes == null && (
                            <CircularProgress
                                className={classes.deviceTypesLoad}
                            />
                        )}
                        {this.state.deviceTypes != null && (
                            <Grid>
                                <>
                                    {this.state.deviceTypes.map((type) => {
                                        return (
                                            <Chip
                                                key={type}
                                                label={type}
                                                className={classes.typeChip}
                                                clickable
                                                onClick={() =>
                                                    this.handleChipClick(type)
                                                }
                                            />
                                        );
                                    })}
                                </>
                            </Grid>
                        )}
                    </Box>
                    <Box className={classes.footer}>
                        <Button
                            className={classes.activeButton}
                            variant="outlined"
                            onClick={() => this.handleTypeChange("add")}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            );
        } else if (this.state.type === "add") {
            content = (
                <Box className={classes.BackgroundBox}>
                    <Button
                        aria-label="add"
                        size="large"
                        className={classes.addIconButton}
                        onClick={() => this.handleTypeChange("device-select")}
                    >
                        <AddIcon className={classes.addIcon} />
                    </Button>
                </Box>
            );
        }
        return (
            <CardContent
                className={classes.addDeviceCard}
                style={{ padding: "0px" }}
            >
                {content}
            </CardContent>
        );
    }
}

export default withSnackbar(withStyles(styles)(NewDevice));
