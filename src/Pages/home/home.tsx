import { Col, Row } from 'antd';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { AssistandsItems } from '../../components/assistandsItems';
import { SmoothContent } from '../../components/smoothContent';
import { useConfig } from '../../hooks/config';

interface HomeProps {
}

const fadeIn = keyframes`
  0% {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);
            opacity: 0;
            filter: blur(5px);
        }
        100% {
            -webkit-transform: translateZ(160px);
            transform: translateZ(160px);
            opacity: 1;
            filter: blur(0px);
  }
`

const fadeOut = keyframes`
  0% {
    -webkit-transform: translateZ(160px);
            transform: translateZ(160px);
            opacity: 1;
            filter: blur(0px);
        }
        100% {
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            filter: blur(5px);
            opacity: 0;
  }
`


const WordSpan = styled.span<{ first?: boolean; color?: 'orange' | 'blue' | 'purple' | 'gray' }>`
    color: ${(props) => {
        switch (props.color) {
            case 'orange':
                return props.theme.colors.orange
            case 'blue':
                return props.theme.colors.blue
            case 'purple':
                return props.theme.colors.purple
            case 'gray':
                return props.theme.colors.gray
            default:
                return '#000'

        }
    }};

    ${(props) => {
        if (props.color === 'gray') {
            return {
                fontSize: '20px',
                opacity: 0
                // animation: `1s ${props.first ? fadeIn : fadeOut} ease-in-out`
            }
        }
    }}

    animation:  6s ${props => props.color === 'gray' && props.first ? fadeOut : fadeIn} ease-in-out infinite alternate;
    animation: ${props => props.color !== 'gray' && 'unset'};
    
`;

const Header = styled.header`
    width: 100%;
    height:113px;
    background-color: #FFF;
    box-shadow: 0px 6px 22px -3px rgba(0, 0, 0, 0.1);
    display:flex;
    position: fixed;
    justify-content: center;
    align-items: center;
    z-index: 10;
    /* margin-bottom: 160px; */
`

const Container = styled.div`
    width: 1190px;
    margin:0px auto;
    min-height:60vh;
    height:calc(100vh);
    position: relative;
    overflow: hidden;
    display:flex;
    align-items: center;
    @media (max-width:1024px) {
        width: 80%;
    }

  
`

const MegaTitle = styled.h1`
font-size:32px;
display:inline-flex;
align-items: center;
margin-bottom: 50px;
position: relative;
${WordSpan}{
    margin:0px 5px;

    &:first-child{
        position: absolute;
        top: -20px;
        left:-10px;
    }

    &:last-child{
        position: absolute;
        bottom: -20px;
        right: -10px;
    }
}

`

const Assistands = styled.div`
    width: 100%;
    height:135px;
    display:inline-flex;
    justify-content:space-between;
    align-items: center;
    position: relative;
    &:before, &:after{
        display:block;
        width: 185px;
        height:100%;
        content:' ';
    }

    &::before{
        background-image: url('/assistants-left.png');
    }

    &::after{
        background-image: url('/assistants-right.png');
    }

    ${MegaTitle}{
        /* position: absolute; */
        justify-content: center;
        width: 100%;
        margin:0;

        ${WordSpan}{
            position: unset;
        }
    }


`


export const Home: React.FC<HomeProps> = props => {
    const config = useConfig();

    return (
        <>
            <Header>
                <figure>
                    <img src={`${process.env.PUBLIC_URL}/logo.svg`} alt={config.title} />
                </figure>
            </Header>

            <Container>
                <Row justify={"center"} align="middle" >
                    <Col md={5} xs={24}>
                        <img src={`${process.env.PUBLIC_URL}/working-me.png`} alt="" />
                    </Col>
                    <Col md={13} xs={24}>
                        <MegaTitle>
                            <WordSpan color="gray">always</WordSpan>
                            <WordSpan>Keep</WordSpan>
                            <WordSpan>it</WordSpan>
                            <WordSpan color='orange'>Creative</WordSpan>
                            <WordSpan>&</WordSpan>
                            <WordSpan color='blue'>Simple</WordSpan>
                            <WordSpan color="gray" first>always</WordSpan>
                        </MegaTitle>
                        <p>I have been working as a front-end developer for over 7 years. I strive to create projects based on UI & UX principles, and write code that is performant and easy to maintain. I always aim to improve the quality of my work and make it more scalable. I am passionate about what I do and take pride in delivering high-quality results. Looking forward to new challenges and opportunities in the future!</p>
                    </Col>
                </Row>
            </Container>
            <Container >
                <SmoothContent>
                    <Row justify={"center"}>
                        <Col>
                            <img src="/boom.png" width={"400px"} alt="" />
                        </Col>
                        <Col span={24}>
                            <Assistands >
                                <MegaTitle>
                                    My assistants are listed below in a
                                    <WordSpan color='orange'>thank you</WordSpan>
                                </MegaTitle>
                                <AssistandsItems
                                    data={[
                                        {
                                            image: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/visual-studio-code/visual-studio-code.png',
                                            title: 'VSCode'
                                        },
                                        {
                                            image: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png',
                                            title: 'macOS'
                                        },
                                        {
                                            image: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png',
                                            title: 'JavaScript'
                                        }
                                    ]}
                                />
                            </Assistands>
                        </Col>
                    </Row>
                </SmoothContent>
            </Container>
        </>
    )
}

