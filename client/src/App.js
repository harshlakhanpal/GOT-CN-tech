import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.css";

import { Layout } from "antd";

import Navbar from "../src/components/Navbar";
import Main from "../src/components/Main";
import Battlecard from "../src/components/Battlecard";
// import Add from "./components/Add";
// import Orderlist from "./components/Orderlist";
// import RetailerList from "./components/RetailerList";
// import ViewOrder from "./components/ViewOrder";
// import ViewRetailer from "./components/ViewRetailer";
// import Check from "./components/Check";

const { Content } = Layout;

class App extends Component {
  render() {
    return (
      <Layout>
        <Navbar />
        <Content style={{ padding: "0 50px", marginTop: 90 }}>
          <div style={{ background: "#fff", padding: 24, minHeight: 450 }}>
            <Switch>
              {/* <Route
                exact
                path="/orders"
                render={props => <Orderlist {...props} />}
              />
              <Route
                exact
                path="/retailer"
                render={props => <RetailerList {...props} />}
              {/* /> */}
              <Route exact path="/" render={props => <Main {...props} />} />
              <Route
                exact
                path="/view/:name"
                render={props => <Battlecard {...props} />}
              />
              {/* <Route
                exact
                path="/view/:id"
                render={props => <ViewOrder {...props} />}
              />
              <Route
                exact
                path="/retailer/:retailer_name"
                render={props => <ViewRetailer {...props} />}
              />
              <Route exact path="/add" render={props => <Add {...props} />} />  */}{" "}
              */}
            </Switch>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default withRouter(App);
