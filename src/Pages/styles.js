import styled from 'styled-components';

export const Header = styled.div`
    width: 100%;
    height: 70px;
    background-color: #fff;
    box-shadow: 0px 0px 6px -1px black;

    & div {
        text-align: center;
    padding: 15px;

        & h1 {
            margin: 0;
            font-size: 30px;
        }
    }
`;

export const Container = styled.div`
    width: 90%;
    margin: 60px auto;
    display: flex;
    -webkit-flex-flow: row wrap;
    -ms-flex-flow: row wrap;
    flex-flow: row wrap;
`;