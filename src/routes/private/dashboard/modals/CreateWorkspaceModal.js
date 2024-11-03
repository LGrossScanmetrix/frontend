// src/components/CreateWorkspaceModal.js
import React, { Component } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: #1a1a1a;
  padding: 20px;
  border-radius: 8px;
  color: #ecf0f1;
  width: 400px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  background: #333;
  color: #ecf0f1;
  border: none;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #3b3b3b;
  color: #ecf0f1;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;

export default class CreateWorkspaceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
    };
  }

  handleCreate = () => {
    const { name, description } = this.state;
    if (!name) return;

    const newWorkspace = {
      name,
      description,
      createdBy: 1, // Beispiel für Benutzer-ID, sollte dynamisch sein
      color: '#3b82f6',
    };

    // Emit to server
    fetch('/api/workspaces', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newWorkspace),
    })
      .then((res) => res.json())
      .then((data) => {
        this.props.onCreate(data);
        this.props.onClose();
      });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { onClose } = this.props;
    const { name, description } = this.state;

    return (
      <ModalOverlay>
        <ModalContent>
          <h2>Create New Workspace</h2>
          <Input
            name="name"
            type="text"
            placeholder="Workspace Name"
            value={name}
            onChange={this.handleChange}
          />
          <Input
            name="description"
            type="text"
            placeholder="Description"
            value={description}
            onChange={this.handleChange}
          />
          <Button onClick={this.handleCreate}>Create</Button>
          <Button onClick={onClose} style={{ marginTop: '10px', backgroundColor: '#e74c3c' }}>
            Cancel
          </Button>
        </ModalContent>
      </ModalOverlay>
    );
  }
}