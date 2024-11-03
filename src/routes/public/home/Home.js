// src/pages/Dashboard.js
import React, { Component } from 'react';
import styled from 'styled-components';
import Navbar from '../../../components/nav/top/TopNav';
const Container = styled.div`
 width: 100%;
 background: #19181f;
 color: white;
 box-sizing: border-box;
 user-select: none;
`
const Flex = styled.div`
display: flex;
flex-direction: column;
align-items: center;

height: 100%;
width: 100%;
box-sizing: border-box;
`

const Content = styled.div`
background: #211e27;
width: 90%;
height: 85%;
color: white;
border-radius: 60px;
display: flex;
box-sizing: border-box;
padding: 60px;
box-shadow: 5px 10px 20px rgb(60, 60, 120),
           -5px -10px 15px rgb(30, 30, 45);
z-index: 1;   
font-size: 34px;        
`





export default class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }



  render() {
    

    return (
      <Container>
       <Flex>
        <Navbar></Navbar>
        <Content>
           Organize your WorkFlow now 
        </Content>
       </Flex>
      </Container>
    );
  }
}
