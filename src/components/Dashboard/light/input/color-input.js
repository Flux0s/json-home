import React, { useState, useEffect } from "react";
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
const hexToRGB = (hex) => {
  const R = 0,
    G = 1,
    B = 2,
    A = 3;
  let rgba = [hex.substring(1, 3), hex.substring(4, 5), hex.substring(5, 7)];
  // Check if the hex includes alpha otherwise set to 0
  rgba[A] = hex.length > 7 ? hex.substring(7, 9) : "00";
  rgba.forEach((element, i) => {
    rgba[i] = parseInt(element, 16);
  });
  rgba[A] /= 255;
  return {
    r: rgba[R],
    g: rgba[G],
    b: rgba[B],
    a: rgba[A]
  };
};

const decimalToHex = (x) => {
  x = Math.trunc(x * 255).toString(16);
  x = x.length < 2 ? "0" + x : x;
  return x;
};

function ColorInput(props) {
  const classes = useStyles();
  const [color, setColor] = useState(hexToRGB(props.color));
  useEffect(() => {
    if (props.reset) setColor(hexToRGB(props.color));
  }, [props.reset]);
  let handleColorUpdate = (update, event) => {
    // console.log("Updating color to: " + JSON.stringify(update));
    setColor((prevColor) => {
      return {
        a: prevColor.a,
        r: update.rgb.r,
        g: update.rgb.g,
        b: update.rgb.b
      };
    });
    event = {
      target: {
        id: "Color",
        value: update.hex + decimalToHex(color.a)
      }
    };
    props.handleUpdate(event);
  };
  let handleAlphaUpdate = (update, event) => {
    setColor((prevColor) => {
      return {
        a: update.rgb.a,
        r: prevColor.r,
        g: prevColor.g,
        b: prevColor.b
      };
    });
    event = {
      target: {
        id: "Color",
        value: props.color.substring(0, 6) + decimalToHex(update.rgb.a)
      }
    };
    props.handleUpdate(event);
  };
  return (
    <div>
      <div className={classes.pickerContainer}>
        <HuePicker
          className={classes.picker}
          onChangeComplete={handleColorUpdate}
          color={color}
        />
      </div>
      <div className={classes.pickerContainer}>
        <AlphaPicker
          className={classes.picker}
          onChangeComplete={handleAlphaUpdate}
          color={color}
        />
      </div>
    </div>
  );
}

export default ColorInput;
