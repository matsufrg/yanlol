import React from 'react';
import * as Styled from './styles';

const Card = ({ ...props }) => (

    props.fragsDoYan.map((value, i) => (
        <Styled.Card >
            <Styled.Body color={props.getVictory(i)[0]}>
                <Styled.Icon>
                    <Styled.Image src={props.getChampion(props.fragsDoYan[i].participants[0].championId)[1]} />
                </Styled.Icon>
                <Styled.LeftSide>
                    <Styled.TextMiddleBold bold>{props.fragsDoYan.length !== 0 ? props.getChampion(props.fragsDoYan[i].participants[0].championId)[0] : ''}</Styled.TextMiddleBold>
                    <Styled.TextMiddleKda color={props.getVictory(i)[0]}>{props.getKda(i)}</Styled.TextMiddleKda>
                    <Styled.TextMiddleBold>{props.getVictory(i)[1]}</Styled.TextMiddleBold>
                </Styled.LeftSide>
                <Styled.RightSide>
                    <p>{props.timeStamps(props.yanMatches.matches[i].timestamp)}</p>
                    <p>{Math.floor((props.fragsDoYan[i].gameDuration)/60)} minutos</p>
                </Styled.RightSide>
            </Styled.Body>
        </Styled.Card>
    ))
);

export default Card;