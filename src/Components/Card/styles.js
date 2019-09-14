import styled from 'styled-components';

export const Card = styled.div`
   width: 31%;
    margin-right: 30px;

    & p {
        margin: 0;
    }
`;

export const Body = styled.div`
    background-color: #fff;
    position: relative;
    margin-bottom: 15px;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: inherit;
    box-shadow: 0px 0px 4px -1px ${props => props.color};
`;

export const Sides = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: space-around;
`;

export const RightSide = styled(Sides)`
    width: calc(30% - 30px);
    text-align: right;
    margin-right: 10px;
`;

export const LeftSide = styled(Sides)`
    width: 50%;
`;

export const TextMiddle = styled.p`
    text-align: center;
`;

export const TextMiddleKda = styled(TextMiddle)`
    font-weight: bold;
    padding-top: 5px;
    color: ${props => props.color};
    font-size: 20px;
`;

export const TextMiddleBold = styled(TextMiddle)`
    padding: 15px 0 10px 0;
    font-weight: bold;
`;

export const Icon = styled(Sides)`
    width: 20%;
    padding: 10px;
`;

export const Image = styled.img`
    border-radius: 50%;
    margin-left: 10px;
    width: 90px;
`;