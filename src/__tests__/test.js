import React from "react";
import ReactDOM from "react-dom";
import App from ".././components/App/index";
import sum from ".././components/App/sum.js";

it("App renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
});

it("Tests are working", () => {
    expect(sum(1, 2)).toEqual(3);
    expect(sum(2, 2)).toEqual(4);
});
