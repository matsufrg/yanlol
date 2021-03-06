import React, { Component } from 'react';
import Card from '../Components/Card';
import axios from 'axios';
import * as Styled from './styles';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import champions from 'lol-champions'

const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "*"
  }
};

export default class Main extends Component {

  constructor() {
    super();
    this.state = {
      infoMatches: [],
      userId: "AS8N5bncASE9y0MJq03wAhnNOyndRdlu-OTHNhX8_QRF" // AS8N5bncASE9y0MJq03wAhnNOyndRdlu-OTHNhX8_QRF << yan
    }
  }

  // RGAPI-dbe31bf4-3cc7-42b5-9b17-08f4ff07bb3b


  async componentDidMount() {

    let matches;

    if (!localStorage.getItem('match')) {
      const yanId = await axios.get(`https://yanrequests.herokuapp.com/yanId`);

      const matchList = await axios.get(`https://yanrequests.herokuapp.com/matchlist/${yanId.data.accountId}`, config);

      matches = await this.getMatches(matchList);

      localStorage.setItem('match', JSON.stringify(matches));
    }

    if (!matches) {
      matches = JSON.parse(localStorage.getItem('match'));
    }

    let userMatches = this.getOnlyUserIdFrags(matches);

    this.setState({ infoMatches: userMatches });
  }

  getOnlyUserIdFrags = (arr) => {
    let userKda = [];
    let personId;
    let teamWin;
    let gameDuration;
    let gameId;
    let timestamp;

    console.log(arr);

    arr.map((infoMatches) => {
      infoMatches.participantIdentities.map((identities) => {
        if (identities.player.accountId === this.state.userId) {
          personId = identities.participantId;
        }
      });

      teamWin = infoMatches.teams.filter((p) => {
        return p.win === "Win";
      });

      timestamp = infoMatches.timestamp;

      gameDuration = infoMatches.gameDuration;

      gameId = infoMatches.gameId;

      infoMatches.participants.map((p) => {

        let isWinning;

        if (teamWin[0].teamId === p.teamId) {
          isWinning = ['green', 'Vitória'];
        } else {
          isWinning = ["red", "Derrota"];
        }

        if (p.participantId === personId && this.getKda(p.stats)) {
          userKda.push({ ...p, win: isWinning, kda: this.getKda(p.stats), gameDuration, gameId, timestamp });
        }
      });
    });

    return userKda;
  };

  getKda = (stats) => {
    let kills = stats.kills;
    let deaths = stats.deaths;
    let assists = stats.assists;

    // return `${kills}/${deaths}/${assists}`;

    var result = deaths - kills > 5;

    if (result) {
      return `${kills}/${deaths}/${assists}`;
    }

    return false;
  };

  getMatches(matchList) {
    return new Promise((resolve, reject) => {

      let arr = [];

      matchList.data.matchList.map((match, i) => {

        console.log(match);

        const timestamp = match.timestamp;

        axios.get(`https://yanrequests.herokuapp.com/match/${match.gameId}`, config).then((result) => {
          const { participants, participantIdentities, teams, gameMode, gameType, gameDuration, gameId } = result.data.match;

          let obj = {
            participantIdentities,
            participants,
            teams,
            gameMode,
            gameType,
            gameDuration,
            gameId,
            timestamp
          };

          arr.push(obj);

          if (i === matchList.data.matchList.length - 1) {
            resolve(arr);
          }
        });
      });

    });
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

    if (id === 350) {
      return ['Yuumi', 'https://i.pinimg.com/736x/52/78/c3/5278c35994da3f962e3a3a44645cf895.jpg'];
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
    return moment(data, "DDMMYYYY").locale('pt-br').startOf('day').fromNow();
  }

  render() {

    const { infoMatches } = this.state;

    return (
      <div>{
        <div>
          <Styled.Header>
            <div>
              <h1>Frags do Yan</h1>
            </div>
          </Styled.Header>
          <Styled.Container>
            <Card
              infoMatches={infoMatches}
              timeStamps={this.getTimeAgo}
              getChampion={this.getChampion}
            />
          </Styled.Container>
        </div>
      }
      </div>
    )
  }
}
