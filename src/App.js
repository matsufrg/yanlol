import React, { Component } from 'react';
import axios from 'axios';
import champions from 'lol-champions'

export default class Main extends Component {

  constructor() {
    super();
    this.state = {
      fragsDoYan: [],
      yanStats: [],
    }
  }

  async componentDidMount() {

    var result = await axios.get('https://cors-anywhere.herokuapp.com/https://acs.leagueoflegends.com/v1/stats/player_history/BR1/1026866?begIndex=0&endIndex=20');

    this.setState({ yanStats: result.data });

    console.log(this.state.yanStats);

    let status = this.state.yanStats.games.games

    let fragsDoYan = status.filter((result) => {
      if (result.participants[0].stats.deaths - result.participants[0].stats.kills >= 5) {
        return { ...result }
      }
    });

    this.setState({ fragsDoYan: fragsDoYan });

    console.log(this.state.yanStats);
  }

  getChampion(id) {

    let champ = champions.filter((c) => {
      if (parseInt(c.key) === id) {
        return c.name;
      }
    });
    return champ[0].name;
  }

  render() {
    return (
      <div>
        <h1>Frags do Yan:</h1>
        <div>
          {this.state.fragsDoYan.map((value, i) => (
            <>
              <span>{this.state.fragsDoYan.length !== 0 ? this.getChampion(this.state.fragsDoYan[i].participants[0].championId) : ''} </span>
              <p>{this.state.fragsDoYan.length !== 0 ? this.state.fragsDoYan[i].participants[0].stats.kills + '/' + this.state.fragsDoYan[i].participants[0].stats.deaths + '/' + this.state.fragsDoYan[i].participants[0].stats.assists : ''}</p>
            </>
          ))}
        </div>
      </div>
    )
  }
}