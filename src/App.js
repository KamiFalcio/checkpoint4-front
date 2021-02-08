import {
  Heading,
  Box,
  Grommet,
  Avatar,
  Main,
  TextArea,
  Form,
  FormField,
  TextInput,
  Button,
  Text,
} from "grommet";

import React from "react";
import axios from "axios";
import "./App.css";
import Objet from "./components/Objet";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "14px",
      height: "20px",
    },
  },
};

const AppBar = (props) => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="white"
    pad={{ left: "medium", right: "small", vertical: "small" }}
    elevation="medium"
    style={{ zIndex: "1" }}
    {...props}
  />
);

class App extends React.Component {
  state = {
    inputValue: "",
    listeChampions: [],
    filtered: [],
    img: "",
  };

  componentDidMount() {
    axios
      .get(
        `http://ddragon.leagueoflegends.com/cdn/11.3.1/data/en_US/champion.json`
      )
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        return data.data;
      })
      .then((data) => {
        const tablChamps = Object.values(data);
        const tablFiltered = Object.values(data);
        this.setState({ listeChampions: tablChamps, filtered: tablFiltered });
      });
  }

  // Object.values(this.state.listeChampions);
  handleChange = (e) => {
    if (e.target.value) {
      this.setState({ inputValue: e.target.value });
      console.log(e.target.value);
    }
  };

  handleClick = () => {
    let currentList = [];
    let newList = [];
    if (this.state.inputValue !== "" || this.state.inputValue !== undefined) {
      currentList = this.state.listeChampions;
      newList = currentList.filter((item) => {
        const lc = item.name.toLowerCase();

        const filter = this.state.inputValue.toLowerCase();

        return lc.includes(filter);
      });
    } else {
      newList = this.props.listeChampions;
    }

    this.setState({
      filtered: newList,
    });
    this.setState({
      img: this.state.filtered[0].name,
    });

    console.log(this.state.filtered);
  };

  render() {
    let { img } = this.state;
    return (
      <Grommet theme={theme} height="100vh">
        <AppBar>
          <Box flex>
            <Avatar src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/694/4573275694_fee3248d-a417-4d43-9f71-8cb710a1f93f.png?cb=1612430609" />
          </Box>
          <Box alignContent="start" width="large">
            <Heading margin="none" color="#8C2632">
              Lol Construct
            </Heading>
          </Box>
        </AppBar>
        <Box
          flex
          direction="row"
          margin={{
            left: "large",
            right: "large",
            vertical: "medium",
            bottom: "xsmall",
          }}
          align="center"
          justify="center"
        >
          <Box width="medium">
            <TextInput
              width="medium"
              placeholder="type here"
              onChange={this.handleChange}
            />
          </Box>
          <Button
            primary
            label="label"
            color="#8C2632"
            onClick={this.handleClick}
          />
        </Box>
        <Main pad="xlarge" flex direction="row">
          <Box
            flex
            elevation="medium"
            round="medium"
            height="700px"
            background={{
              repeat: "no-repeat",
              size: "cover",
              // image: `url(${this.state.filtered[0].image.full})`,
              image: `url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${img}_0.jpg)`,
            }}
          >
            <Box flex direction="row" justify="between">
              <Box
                background="white"
                round="medium"
                margin="1%"
                width="medium"
                direction="row"
                border={{ color: "#8C2632", size: "large" }}
                pad="medium"
              >
                <div>
                  <div className="voila">
                    <Text>
                      {this.state.filtered[0] ? (
                        <h2>{this.state.filtered[0].name}</h2>
                      ) : (
                        "no data"
                      )}
                    </Text>
                    <Text>
                      {this.state.filtered[0]
                        ? this.state.filtered[0].title
                        : "no data"}
                    </Text>
                  </div>
                  {this.state.filtered[0] ? (
                    <ul>
                      <li>{`Points de vie = ${this.state.filtered[0].stats.hp}`}</li>
                      <li>{`Points de mana = ${this.state.filtered[0].stats.mp}`}</li>
                      <li>{`Points d'armure' = ${this.state.filtered[0].stats.armor}`}</li>
                      <li>{`Points de résistance magique = ${this.state.filtered[0].stats.spellblock}`}</li>
                      <li>{`Distance d'attaque = ${this.state.filtered[0].stats.attackrange}`}</li>
                      <li>{`Dégats d'attaque = ${this.state.filtered[0].stats.attackdamage}`}</li>
                    </ul>
                  ) : (
                    "no data"
                  )}
                  <Text>
                    {this.state.filtered[0] ? (
                      <ul>
                        <li>{this.state.filtered[0].tags[0]}</li>
                        <li>{this.state.filtered[0].tags[1]}</li>
                      </ul>
                    ) : (
                      "no data"
                    )}
                  </Text>
                  <p>
                    {this.state.filtered[0]
                      ? this.state.filtered[0].blurb
                      : "no data"}
                  </p>
                </div>
              </Box>
            </Box>
            <Box direction="row" height="small">
              <Box
                background="white"
                flex
                round="medium"
                margin="1%"
                direction="row"
                border={{ color: "#8C2632", size: "large" }}
                pad="medium"
              >
                <TextArea placeholder="type here" />
              </Box>

              <Box
                background="white"
                round="medium"
                flex
                margin="1%"
                direction="row"
                border={{ color: "#8C2632", size: "large" }}
                pad="medium"
              />
            </Box>
          </Box>
          <Box width="30%" alignSelf="center">
            <Form>
              <FormField name="name" htmlFor="text-input-id" label="Name">
                <TextInput id="text-input-id" name="name" />
              </FormField>
              <Box direction="row" gap="medium">
                <Button type="submit" primary label="Envoyer" />
              </Box>
            </Form>
          </Box>
        </Main>
        <Box
          background="white"
          round="medium"
          flex
          margin="1%"
          height="140px"
          direction="row"
          border={{ color: "#8C2632", size: "large" }}
          pad="medium"
        >
          <div className="objet">
            <Objet indice="6029" />
            <Objet indice="6035" />
            <Objet indice="6609" />
            <Objet indice="6616" />
            <Objet indice="6617" />
            <Objet indice="6656" />
            <Objet indice="6630" />
            <Objet indice="6631" />
            <Objet indice="6632" />
            <Objet indice="6653" />
            <Objet indice="6655" />
            <Objet indice="6660" />
          </div>
        </Box>
      </Grommet>
    );
  }
}

export default App;
