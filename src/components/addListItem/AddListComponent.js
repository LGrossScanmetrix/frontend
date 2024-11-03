import React, { Component } from 'react';
import styled from 'styled-components';
import ListItem from '../listItem/ListItem';

const ListContainer = styled.div`
  background-color: #1a1a1a;
  padding: 12px;
  border-radius: 8px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TitleContainer = styled.div`
  display: flex;
  gap: 6px;
`;

const AddItemButton = styled.button`
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: #2980b9;
  }
`;

export default class AddListComponent extends Component {
  state = {
    title: this.props.list.title || '',
    items: this.props.list.items || [],
    editingIndex: null, // Index des aktuell zu bearbeitenden Items
  };

  handleAddItem = () => {
    const newItem = { title: '', description: '', editing: true };
    this.setState((prevState) => ({
      items: [...prevState.items, newItem],
      editingIndex: prevState.items.length,
    }));
  };

  handleSaveItem = (index, item) => {
    this.setState((prevState) => {
      const updatedItems = [...prevState.items];
      updatedItems[index] = { ...item, editing: false };
      return { items: updatedItems, editingIndex: null };
    });
  };

  handleClickOutside = (index) => {
    const { items } = this.state;
    if (items[index].editing) {
      this.handleSaveItem(index, items[index]);
    }
  };

  render() {
    const { title, items, editingIndex } = this.state;

    return (
      <ListContainer>
        <TitleContainer>
          <h3>{title}</h3>
        </TitleContainer>
        {items.map((item, index) => (
          <ListItem
            key={index}
            item={item}
            isEditing={index === editingIndex}
            onSave={(updatedItem) => this.handleSaveItem(index, updatedItem)}
            onClickOutside={() => this.handleClickOutside(index)}
          />
        ))}
        <AddItemButton onClick={this.handleAddItem}>+ Add ListItem</AddItemButton>
      </ListContainer>
    );
  }
}
