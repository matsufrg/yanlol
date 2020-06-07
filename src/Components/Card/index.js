import React from 'react';
import * as Styled from './styles';

const Card = ({ ...props }) => (
    props.infoMatches.map((value, i) => {

        return (
            <Styled.Card key={value.gameId}>
                <Styled.Body color={value.win[0]}>
                    <Styled.Icon>
                        <Styled.Image src={props.getChampion(value.championId)[1]} />
                    </Styled.Icon>
                    <Styled.LeftSide>
                        <Styled.TextMiddleBold bold>{props.infoMatches.length !== 0 ? props.getChampion(value.championId)[0] : ''}</Styled.TextMiddleBold>
                        <Styled.TextMiddleKda color={value.win[0]}>{value.kda}</Styled.TextMiddleKda>
                        <Styled.TextMiddleBold>{value.win[1]}</Styled.TextMiddleBold>
                    </Styled.LeftSide>
                    <Styled.RightSide>
                        <p>{props.timeStamps(value.timestamp)}</p>
                        {/* <p>há 5 minutos</p> */}
                        <p>{Math.floor((value.gameDuration) / 60)} minutos</p>
                    </Styled.RightSide>
                </Styled.Body>
            </Styled.Card>
        )
    })
)

export default Card;