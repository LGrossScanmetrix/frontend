import React, { Component } from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  width: ${({ minimized }) => (minimized ? '0px' : '250px')};
  height: 100vh;
  background-color: ${({ minimized }) => (minimized ? 'transparent' : '#1a1a1a')};
  display: flex;
  flex-direction: column;
  align-items: ${({ minimized }) => (minimized ? 'center' : 'flex-start')};
  transition: width 0.3s ease, background-color 0.3s ease;
  color: #ecf0f1;
  padding: ${({ minimized }) => (minimized ? '0' : '20px')};
  overflow: hidden;
  border-right: ${({ minimized }) => (minimized ? 'none' : '4px solid #121212')};
  z-index: 5;
  box-sizing: border-box;

  /* Vollbild auf kleinen Bildschirmen */
  @media (max-width: 850px) {
    width: ${({ minimized }) => (minimized ? '0px' : '100vw')};
    position: fixed;
    box-sizing: border-box;
  }
`;

const BurgerButton = styled.button`
  background: none;
  border: none;
  color: #ecf0f1;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 6;
  display: ${({ minimized }) => (minimized ? 'block' : 'none')};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #ecf0f1;
  font-size: 24px;
  cursor: pointer;
  align-self: flex-end;
  margin-bottom: 20px;
  display: ${({ minimized }) => (minimized ? 'none' : 'block')};
`;

const CreateButton = styled.button`
  background-color: #3b3b3b;
  color: #ecf0f1;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-bottom: 20px;
  width: 100%;
  visibility: ${({ minimized }) => (minimized ? 'hidden' : 'visible')};
  opacity: ${({ minimized }) => (minimized ? 0 : 1)};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const NavLink = styled.div`
  color: #ecf0f1;
  text-decoration: none;
  margin: 10px 0;
  font-size: ${({ minimized }) => (minimized ? '0px' : '1em')};
  display: flex;
  align-items: center;
  justify-content: ${({ minimized }) => (minimized ? 'center' : 'flex-start')};
  width: 100%;
  padding: ${({ minimized }) => (minimized ? '0' : '0 20px')};
  opacity: ${({ minimized }) => (minimized ? 0 : 1)};
  overflow: hidden;
  transition: opacity 0.3s ease, font-size 0.3s ease;
  cursor: pointer;
`;

export default class Navbar extends Component {
  render() {
    const { minimized, setMinimized, workspaces, onWorkspaceSelect, onCreate } = this.props;

    return (
      <>
        <BurgerButton minimized={minimized} onClick={() => setMinimized(false)}>
          ☰
        </BurgerButton>

        <NavbarContainer minimized={minimized}>
          <CloseButton minimized={minimized} onClick={() => setMinimized(true)}>
            ⇦
          </CloseButton>
          
          {!minimized && (
            <>
              <CreateButton onClick={onCreate}>New Workspace</CreateButton>
              {workspaces.map((workspace) => (
                <NavLink
                  key={workspace.id}
                  minimized={minimized}
                  onClick={() => onWorkspaceSelect(workspace.id)}
                >
                  {workspace.name}
                </NavLink>
              ))}
            </>
          )}
        </NavbarContainer>
      </>
    );
  }
}
