import React, { Component } from 'react';
import styled from 'styled-components';
import Edit from '../uiVerse/buttons/edit';
const ListItemContainer = styled.div`
  padding: 20px;
  border-radius: 20px;
  background: #353535;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: 0.5s ease-in-out;
  .card:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h4`
  margin: 0;
  color: #ecf0f1;
  cursor: pointer;
  font-size: 24px;
  width: 100%;
`;


const Input = styled.input`
  width: 100%;
  margin: 5px 0;
  padding: 8px;
  border-radius: 4px;
  border: none;
  font-size: 14px;
  background-color: #2c2c2c;
  color: #ecf0f1;
  transition: border-color 0.3s, box-shadow 0.3s;
  box-sizing: border-box;
  &:focus {
    border: 1px solid #3498db;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
  }
`;

const SaveButton = styled.button`
  background-color: #27ae60;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
  text-align: center;
  &:hover {
    background-color: #219653;
  }
`;

export default class ListItem extends Component {
  state = {
    title: this.props.item.title || '',
    description: this.props.item.description || '',
    isTitleEditing: false, // Zustand für Titelbearbeitung
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.handleSave();
    }
  };

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  };

  handleSave = () => {
    const { onSave } = this.props;
    const { title, description } = this.state;
    onSave({
      title: title || 'Untitled',
      description: description || 'No description',
    });
    this.setState({ isTitleEditing: false });
  };

  handleTitleEdit = () => {
    this.setState({ isTitleEditing: true });
  };

  handleTitleBlur = () => {
    const { title } = this.state;
    this.props.onSave({ ...this.props.item, title });
    this.setState({ isTitleEditing: false });
  };

  render() {
    const { isEditing } = this.props;
    const { title, description, isTitleEditing } = this.state;

    return (
      <ListItemContainer ref={this.setWrapperRef}>
        <TitleContainer>
          {isEditing ? (
            <>
              <Input
                value={description}
                placeholder="Description"
                onChange={this.handleDescriptionChange}
              />
              <SaveButton onClick={this.handleSave}>Save</SaveButton>
            </>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", width: "100%", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                {isTitleEditing ? (
                  <Input
                    value={title}
                    onChange={this.handleTitleChange}
                    onBlur={this.handleTitleBlur}
                    autoFocus
                  />
                ) : (
                  <Title onClick={this.handleTitleEdit}>{title || 'Untitled Item'}</Title>
                )}
                {!isTitleEditing && <Edit />}
              </div>
              {!isEditing && (
                <div>
                  <label style={{ border: "1px solid", padding: "4px", borderRadius: "8px", fontSize: "14px" }}>
                    Priorität: Hoch
                  </label>
                </div>
              )}
            </div>
          )}
        </TitleContainer>
      </ListItemContainer>
    );
  }
}
