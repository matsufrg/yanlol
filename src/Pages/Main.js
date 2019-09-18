import React, { Component } from 'react';
import moment from 'moment';
import Card from '../Components/Card';
import axios from 'axios';
import * as Styled from './styles';
import champions from 'lol-champions'

export default class Main extends Component {

  constructor() {
    super();
    this.state = {
      fragsDoYan: [],
      yanQuery: [],
      yanMatches: [],
    }

    this.getVictory = this.getVictory.bind(this);
    this.getKda = this.getKda.bind(this);
    this.getTimeAgo = this.getTimeAgo.bind(this);
  }

  async componentDidMount() {

    var result = await axios.get('https://cors-anywhere.herokuapp.com/https://acs.leagueoflegends.com/v1/stats/player_history/BR1/1026866?begIndex=0&endIndex=20');
    var result2 = await axios.get('https://cors-anywhere.herokuapp.com/https://br1.api.riotgames.com/lol/match/v4/matchlists/by-account/NmbD8Iz8nIUZ-PnVWsesyffQNQfmSfPQitJMrYHZwBcH?api_key=RGAPI-6b0e2872-2dde-4e1d-b27b-1b562b4938ea')
    let status = result.data.games.games

    let fragsDoYan = status.filter((result) => {
      if (result.participants[0].stats.deaths - result.participants[0].stats.kills >= 5) {
        return { ...result }
      }
      return '';
    });

    this.setState({ fragsDoYan: fragsDoYan, yanQuery: fragsDoYan[0].participants[0].stats, yanMatches: result2.data });

    this.getKda(1);
  }

  getChampion(id) {

    if (id === 518) {
      return ['Neeko', 'https://i.imgur.com/VqWTupp.png'];
    }

    let champ = champions.filter((c) => {
      if (parseInt(c.key) === id) {
        return c.name;
      }
    });
    return [champ[0].name, champ[0].icon];
  }

  getTimeAgo(timeStamps) {
    var data = new Date(timeStamps);
    data = data.toLocaleDateString();
    data = data.replace(new RegExp('/', 'g'), '');
    return moment(data, "DDMMYYYY").startOf('day').fromNow();
  }

  getVictory(i) {
    if (this.state.fragsDoYan[i].participants[0].stats.win) {
      return ['green', 'Vitória'];
    } else {
      return ['red', 'Derrota']
    }
  }

  getKda(i) {
    let kda = this.state.fragsDoYan.length !== 0 ? this.state.fragsDoYan[i].participants[0].stats.kills + '/' + this.state.fragsDoYan[i].participants[0].stats.deaths + '/' + this.state.fragsDoYan[i].participants[0].stats.assists : '';
    return kda;
  }

  render() {
    return (
      <div>
        <div>
          <Styled.Header>
            <div>
              <h1>Frags do Yan</h1>
            </div>
          </Styled.Header>
          <Styled.Container>
            <Card
              yanMatches={this.state.yanMatches}
              timeStamps={this.getTimeAgo}
              getVictory={this.getVictory}
              getKda={this.getKda}
              fragsDoYan={this.state.fragsDoYan.reverse()}
              getChampion={this.getChampion} />
          </Styled.Container>
        </div>
      </div>
    )
  }
}