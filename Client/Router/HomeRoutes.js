import React, { Component } from "react";
import { Router, Scene } from "react-native-router-flux";

import Home from "../Views/Home";
import Editor from "../Views/Editor";
import Draft from "../Views/Draft";

const Routes = (props) => {
  return (
    <Router>
      <Scene key="root">
        <Scene
          key="Home"
          component={Home}
          initial={true}
          title={"Home"}
          hideNavBar={true}
        />
        <Scene
          key="Editor"
          component={Editor}
          title={"Editor"}
          hideNavBar={true}
        />
        <Scene
            key="Draft"
            component={Draft}
          title={"Draft"}
          hideNavBar={true}
        />
      </Scene>
    </Router>
  );
};

export default Routes;
