import React from "react";
import { makeStyles } from "@material-ui/core";
import { HuePicker, AlphaPicker } from "react-color";

const useStyles = makeStyles((theme) => ({
  pickerContainer: {
    margin: theme.spacing(2, 3),
    display: "flex"
  },
  picker: {
    margin: "0 auto"
  }
}));

// Helper functions to handle parsing of colors
// const hexToRGB = (hex) => {
//   const R = 0,
//     G = 1,
//     B = 2,
//     A = 3;
//   let rgba = [hex.substring(1, 3), hex.substring(3, 5), hex.substring(5, 7)];
//   // Check if the hex includes alpha otherwise set to 0
//   rgba[A] = hex.length > 7 ? hex.substring(7, 9) : "00";
//   rgba.forEach((element, i) => {
//     rgba[i] = parseInt(element, 16);
//   });
//   rgba[A] /= 255;
//   return {
//     r: rgba[R],
//     g: rgba[G],
//     b: rgba[B],
//     a: rgba[A]
//   };
// };

function ColorInput(props) {
  // -------------- //
  // Initialization //
  // -------------- //
  const classes = useStyles();
  let handleColorUpdate = (update, event) => {
    event = {
      target: {
        id: "Color",
        value: update.hex + props.color.substring(7, 9)
      }
    };
    props.handleUpdate(event);
  };

  // -------------- //
  // Event Handlers //
  // -------------- //

  let handleAlphaUpdate = (update, event) => {
    event = {
      target: {
        id: "Color",
        value: props.color.substring(0, 7) + decimalToHex(update.rgb.a)
      }
    };
    props.handleUpdate(event);
  };

  // ---------------- //
  // Helper Functions //
  // ---------------- //

  let decimalToHex = (x) => {
    x = Math.trunc(x * 255).toString(16);
    x = x.length < 2 ? "0" + x : x;
    return x;
  };
  // --------------- //
  // Render Function //
  // --------------- //

  return (
    <div>
      <div className={classes.pickerContainer}>
        <HuePicker
          className={classes.picker}
          onChangeComplete={handleColorUpdate}
          color={props.color}
        />
      </div>
      <div className={classes.pickerContainer}>
        <AlphaPicker
          className={classes.picker}
          onChangeComplete={handleAlphaUpdate}
          color={props.color}
        />
      </div>
    </div>
  );
}

export default ColorInput;
