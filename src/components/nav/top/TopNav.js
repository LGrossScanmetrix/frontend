import React, { Component } from 'react';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa'; // Beispiel-Icon
import Action from '../../uiVerse/buttons/action';
const NavbarContainer = styled.div`
  width: 100%;
  height: 8%;
  padding: 4px;
  box-sizing: border-box;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  gap: 2%;
`;

const NavItem = styled.button`
  background: transparent;
  color: rgba(255, 255, 255, 0.80);
  border: none;
  font-size: 18px;
  font-weight: 500; /* Konstantes font-weight */
  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 5px;
  box-sizing: border-box;
  display: flex;

  &:hover {
    color: rgba(255, 255, 255, 1);
    transform: scale(1.05); /* Nur die Skalierung anwenden */
    text-shadow: 0 0 3px rgba(255, 255, 255, 0.8); /* Schattierung, um den „Fett-Effekt“ zu simulieren */
  }

  @media (max-width: 768px) {
    font-size: 14px;
    letter-spacing: 3px;
  }
`;

const NavItemIcon = styled(FaUserCircle)`
  display: none;
  color: rgba(255, 255, 255, 0.80);
  font-size: 20px;
  cursor: pointer;

  @media (max-width: 600px) {
    display: inline-block;
  }
`;

const Div = styled.div`
  height: 100%;
  
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2%;
  min-width: 0;
  overflow: hidden;

  @media (max-width: 768px) {
    gap: 1%;
  }
  @media (max-width: 450px) {
    display: none;
  }
`;
const TitleContainer = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2%;
  min-width: 0;
  overflow: hidden;

  @media (max-width: 1024px) {
    display: none;
  }
 
  
`;
const Right = styled.div`
  height: 100%;
  
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4%;
  min-width: 0;
  overflow: hidden;

  @media (max-width: 768px) {
    gap: 1%;
  }
`;

const Title = styled.h1`
  font-size: 40px;
  width: 100%;
  padding-left: 8%;
  letter-spacing: 5px;
  font-family: Morganite, Helvetica, sans-serif;
  text-transform: uppercase;
  font-weight: 900;
  color: transparent;
  -webkit-text-stroke: 1px white;
  opacity: 0.3;
  @media (max-width: 1000px) {
    font-size: 20px;
  }
  
`;

const LangSelect = styled.div`
  height: 100%;
  width: 80%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;

  
  @media (max-width: 768px) {
    font-size: 14px;
    letter-spacing: 3px;
  }
`;

const LangButton = styled.button`
  height: 30%;
  width: 10%;
  font-size: 18px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 5px;
  font-weight: 300;
  font-family: Montserrat, Helvetica, sans-serif;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.80);
  transition: all 0.3s ease;
  cursor: pointer;
    &:hover {
    color: rgba(255, 255, 255, 1);
    transform: scale(1.05); /* Nur die Skalierung anwenden */
    text-shadow: 0 0 3px rgba(255, 255, 255, 0.8); /* Schattierung, um den „Fett-Effekt“ zu simulieren */
    font-weight: 600;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    letter-spacing: 3px;
  }
`;


export default class PublicNavbar extends Component {
  render() {
    return (
      <NavbarContainer>
        <Flex>
          <TitleContainer>
            <Title>TaskSmart</Title>
          </TitleContainer>
          <Div>
            <NavItem>Product</NavItem>
            <NavItem>Pricing</NavItem>
            <NavItem>Docs</NavItem>
            <NavItem>Ressourcen</NavItem>
            <NavItem>About</NavItem>
          </Div>
          <Right>
            <LangSelect>
              <LangButton>EN</LangButton>
              <LangButton>DE</LangButton>
            </LangSelect>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80%", width: "100%", }}>
              <Action  text={"Start Organizing"} />
            </div>
          </Right>
        </Flex>
      </NavbarContainer>
    );
  }
}
