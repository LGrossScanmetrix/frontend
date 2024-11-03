import React, { Component } from 'react';
import styled from 'styled-components';
import AddListComponent from '../addListItem/AddListComponent';

const WorkspaceContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  background-color: #121212;
  color: #ecf0f1;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const Header = styled.div`
  padding: 20px;
  border-bottom: 1px solid #333;
  text-align: center;
`;

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  overflow-x: scroll;
  padding: 20px;
  width: 100%;
`;

export default class Workspace extends Component {
  render() {
    const { workspaces, workspaceId } = this.props;
    const workspace = workspaces.find((ws) => ws.id === workspaceId);

    if (!workspace) {
      return (
        <WorkspaceContainer>
          <h2>Loading Workspace...</h2>
        </WorkspaceContainer>
      );
    }

    return (
      <WorkspaceContainer>
        <Header>
          <h1>{workspace.name}</h1>
          <p>{workspace.description}</p>
        </Header>
        <ListsContainer>
          {workspace.lists && workspace.lists.map((list) => (
            <AddListComponent key={list.id} list={list} />
          ))}
        </ListsContainer>
      </WorkspaceContainer>
    );
  }
}
