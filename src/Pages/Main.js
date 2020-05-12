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

    let r = await axios.get('https://br1.api.riotgames.com/lol/match/v4/matchlists/by-account/NmbD8Iz8nIUZ-PnVWsesyffQNQfmSfPQitJMrYHZwBcH?api_key=RGAPI-c45586b3-f2b6-4253-8b98-d36436d4fad0');

    console.log(r);
    
  }

  getChampion(id) {

    if (id === 235) {
      return ['Senna', 'https://66.media.tumblr.com/6fc000f0f6b6a79d97d526706842b557/f167f97ab5d98078-3e/s128x128u_c1/1e47e2ec9a0c0680543c40b083efa9d1f3e337f2.jpg'];
    }

    if (id === 518) {
      return ['Neeko', 'https://i.imgur.com/VqWTupp.png'];
    }

    if (id === 246) {
      return ['Qiyana', 'https://66.media.tumblr.com/7afb5598a6738a8d06c90ec290ba6341/tumblr_psy9ucdMg31v8bzgjo4_250.png'];
    }

    let champ = champions.filter((c) => {
      if (parseInt(c.key) === id) {
        return c.name;
      }
    });
    console.log(champ);
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
