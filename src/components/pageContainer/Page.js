import React, { Component } from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  width: calc(100vw - calc(96px + 64px));
  position: relative;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  padding-top: ${props => props.maxSize === "100%" ? 0 : "32px"};
  box-sizing: border-box;
  background: ${props => props.background || "transparent"}; /* Hintergrund-Prop */

  .maxSize {
    width: ${props => props.maxSize ? `${props.maxSize}` : "100%"};
    height: ${props => props.fullHeight ? "100%" : "fit-content"};
    margin-bottom: ${props => props.fullHeight ? 0 : "64px"};
    padding: ${props => props.padding ? props.padding : "0 32px"};
    box-sizing: border-box;
    max-width: 100%;
    
    &.full {
      padding: 0;
      overflow: hidden;
    }
  }
`;

export default class Page extends Component {
    render() {
        return (
            <PageContainer
                padding={this.props.padding}
                fullHeight={this.props.fullHeight}
                responsiveMaxSize={this.props.responsiveMaxSize}
                maxSize={this.props.maxSize}
                background={this.props.background} /* Neues Background-Prop */
            >
                <div className={`maxSize ${this.props.full ? "full" : ""}`}>
                    {this.props.children}
                </div>
            </PageContainer>
        );
    }
}
