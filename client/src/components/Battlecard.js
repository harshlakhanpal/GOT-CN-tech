import React from "react";
import { withRouter } from "react-router-dom";
import { Card, Col, Row } from "antd";

import axios from "axios";

class Battlecard extends React.Component {
  state = {
    data: null
  };
  componentDidMount() {
    axios
      .get(`http://localhost:4000/view/${this.props.match.params.name}`)
      .then(response => {
        this.setState({ data: response.data[0] });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    
    return (
      this.state.data && (
        <div style={{ background: "#ECECEC", padding: "30px" }}>
          <Row gutter={16}>
            <Col span={8}>
              <Card title="Attacker" bordered={false}>
                {` King : ${
                  this.state.data.attacker_king !== null
                    ? this.state.data.attacker_king
                    : ""
                }`}
                <br />
                {`Commander : ${
                  this.state.data.attacker_commander !== null
                    ? this.state.data.attacker_commander
                    : ""
                }`}
                <br />
                {`Allies : ${
                  this.state.data.attacker_1 !== null
                    ? this.state.data.attacker_1
                    : ""
                } ${
                  this.state.data.attacker_2 !== null
                    ? this.state.data.attacker_2
                    : ""
                } ${
                  this.state.data.attacker_3 !== null
                    ? this.state.data.attacker_3
                    : ""
                } 
                ${
                  this.state.data.attacker_4 !== null
                    ? this.state.data.attacker_4
                    : ""
                }`}
                <br />
                {`Army Size : ${
                  this.state.data.attacker_size !== null
                    ? this.state.data.attacker_size
                    : "Not specified"
                }`}
                <br />
                {`Outcome : ${
                  this.state.data.attacker_outcome !== null
                    ? this.state.data.attacker_outcome
                    : ""
                }`}
              </Card>
            </Col>
            <Col span={8}>
              <Card title={this.state.data.name} bordered={false}>
                {`Year : ${
                  this.state.data.year !== null
                    ? this.state.data.year
                    : "Not specified"
                }`}
                <br />
                {`Battle Type : ${
                  this.state.data.battle_type !== null
                    ? this.state.data.battle_type
                    : "Not specified"
                }`}
                <br />
                {`The battle took place in ${
                  this.state.data.location !== null
                    ? this.state.data.location
                    : "Not specified"
                } of the ${
                  this.state.data.region !== null
                    ? this.state.data.region
                    : "Not specified"
                } region in ${
                  this.state.data.summer !== 1 || null ? "Summer" : "Winter"
                }`}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Defender" bordered={false}>
                {` King : ${
                  this.state.data.defender_king !== null
                    ? this.state.data.defender_king
                    : ""
                }`}
                <br />
                {`Commander : ${
                  this.state.data.defender_commander !== null
                    ? this.state.data.defender_commander
                    : ""
                }`}
                <br />
                {`Allies : ${
                  this.state.data.defender_1 !== null
                    ? this.state.data.defender_1
                    : ""
                } ${
                  this.state.data.defender_2 !== null
                    ? this.state.data.defender_2
                    : ""
                } ${
                  this.state.data.defender_3 !== null
                    ? this.state.data.defender_3
                    : ""
                } 
                ${
                  this.state.data.defender_4 !== null
                    ? this.state.data.defender_4
                    : ""
                }`}
                <br />
                {`Army Size : ${
                  this.state.data.defender_size !== null
                    ? this.state.data.defender_size
                    : "Not specified"
                }`}
                <br />
                {`Outcome : ${
                  this.state.data.attacker_outcome !== null
                    ? this.state.data.attacker_outcome === "win"
                      ? "loss"
                      : "win"
                    : ""
                }`}
              </Card>
            </Col>
          </Row>
        </div>
      )
    );
  }
}

export default withRouter(Battlecard);
