import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { List, Button, AutoComplete, Divider } from "antd";

class Main extends Component {
  state = {
    data: [],
    king: "",
    type: "",
    location: "",
    searchlist: []
  };
  componentDidMount() {
    axios
      .get("http://localhost:4000/list")
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
    
  }

  onSelectK = king => {
    this.setState(
      { king },
      () => (this.props.location.search = this.state.king)
    );
    
  };

  onSelectL = location => {
    this.setState({ location });
  };

  onSelectT = type => {
    this.setState({ type });
  };

  onSearchClick = e => {
    e.preventDefault();
    const { king, type, location } = this.state;
    axios
      .get(
        `http://localhost:4000/search?king=${king}&type=${type}&location=${location}`
      )
      .then(response => {
        let searchresults = response.data.map(resp => resp.name);
        let results = [].concat.apply([], searchresults);
        results = Array.from(new Set(results));
        this.setState({ searchlist: results });
      })
      // .then(this.setState({ king: "", type: "", location: "" }))
      .catch(function(error) {
        console.log(error);
      });
  };

  onResetClick = e => {
    e.preventDefault();
    window.location.reload();
  };

  render() {
    let battleslist =
      this.state.data && this.state.data.map(battle => battle.name);

    let battles = [].concat.apply([], battleslist);
    battles = Array.from(new Set(battles));

    let attacker_kingslist =
      this.state.data && this.state.data.map(king => king.attacker_king);

    //  console.log(attacker_kingslist);
    let defender_kingslist =
      this.state.data && this.state.data.map(king => king.defender_king);

    let kings = [].concat.apply([], defender_kingslist, attacker_kingslist);
    kings = Array.from(new Set(kings));
    kings = kings.filter(king => king != null);
   //  console.log(this.state.searchlist.length);

    let locationslist =
      this.state.data && this.state.data.map(location => location.location);
    let locations = [].concat.apply([], locationslist);
    locations = Array.from(new Set(locations));
    locations = locations.filter(location => location != null);

    let battletypelist =
      this.state.data && this.state.data.map(type => type.battle_type);
    let types = [].concat.apply([], battletypelist);
    types = Array.from(new Set(types));
    types = types.filter(type => type != null);

    return (
      <>
        <AutoComplete
          //   value={king}

          dataSource={kings}
          style={{ width: 200, marginRight: 25 }}
          onSelect={this.onSelectK}
          //   onSearch={this.onSearch}
          placeholder="Kings Name"
        />
        <AutoComplete
          dataSource={locations}
          style={{ width: 200, marginRight: 25 }}
          onSelect={this.onSelectL}
          //   onSearch={this.onSearch}
          placeholder="Location"
        />
        <AutoComplete
          dataSource={types}
          style={{ width: 200, marginRight: 25 }}
          onSelect={this.onSelectT}
          //   onSearch={this.onSearch}
          placeholder="Battle Type"
        />
        <Button
          type="primary"
          style={{ marginRight: 25 }}
          icon="search"
          onClick={this.onSearchClick}
        >
          Search
        </Button>
        <Button type="danger" onClick={this.onResetClick}>
          Reset
        </Button>

        <Divider />
        <List
          grid={{
            gutter: 16,
            column: 3,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 3,
            xxl: 3
          }}
          dataSource={
            this.state.searchlist.length !== 0
              ? this.state.searchlist
              : //   : this.state.searchlist.length === 0 && (this.state.king !== "" || this.state.type!== "" || this.state.location !== "")
                //   ? []
                battles
          }
          renderItem={battle => (
            <List.Item>
              <Link to={`/view/${battle}`}>{battle}</Link>
            </List.Item>
          )}
        />
      </>
    );
  }
}
export default Main;
