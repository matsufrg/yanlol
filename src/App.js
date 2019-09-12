import React, { Component } from 'react';
import axios from 'axios';
import champions from 'lol-champions'

export default class Main extends Component {

  constructor(){
    super();
    this.state = {
      yanStats: [],
      yanMatches: [],
    }
  }

  componentDidMount() {
    console.log(champions);
    this.getYanStats();
  }

  getYanStats() {

    axios.get('https://br1.api.riotgames.com/lol/match/v4/matchlists/by-account/mLyOddaGsx_ohjyV0pgkUkxaztB9t4k3BaP6xVuWRx9DePk?api_key=RGAPI-cba63c91-b2b6-4d7e-a8b4-069e1c5a1b8a');
    
  }

  render() {
    return(
        <div>
          {champions.map((c) => (
            <ul>
              <li>{c.name}</li>
              <img src={c.icon} />
            </ul>
          ))}
        </div>
    )
  }
}