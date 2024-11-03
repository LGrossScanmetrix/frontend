import React from 'react';
import styled from 'styled-components';

const Action = ({ text }) => {
  return (
    <StyledWrapper>
      {text}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.button`
  --glow-color: rgb(217, 176, 255);
  --glow-spread-color: rgba(191, 123, 255, 0.5); /* Geringere Deckkraft für dezenteren Glow */
  --btn-color: rgb(100, 61, 136);
  border: .25em solid var(--glow-color);
  font-family: Montserrat, Helvetica, sans-serif;
  letter-spacing: 2px;
  cursor: pointer;
  padding: 1em 3em;
  color: var(--glow-color);
  font-size: 15px;
  font-weight: bold;
  background-color: var(--btn-color);
  border-radius: 1em;
  outline: none;
  position: fixed;
  transition: all 0.3s;
  box-sizing: border-box;
  width: 10%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  /* Der box-shadow hier erzeugt den Hauptglow */
  box-shadow: 
    0 0 1.5em 0.5em var(--glow-color), 
    inset 0 0 0.5em 0.2em var(--glow-color);

  text-shadow: 0 0 0.5em var(--glow-color);
  @media (max-width: 1550px) {
    width: 11%;
    height: 48px;
    padding: 2px;
  }
  @media (max-width: 1350px) {
    width: 14%;
  }
  @media (max-width: 1050px) {
    width: 18%;
  }
  @media (max-width: 850px) {
    width: 20%;
    height: 48px;
    white-space: wrap;
    padding: 2px;
  }
  @media (max-width: 500px) {
    width: 24%;
    height: 48px;
    white-space: wrap;
    padding: 2px;
  }
  @media (max-width: 420px) {
    width: 30%;
    height: 48px;
    white-space: wrap;
    padding: 2px;
  }
  @media (max-width: 350px) {
    width: 36%;
    height: 48px;
    white-space: wrap;
    padding: 2px;
    min-width: 120px;
  }
    @media (max-width: 200px) {
    width: 24%;
    height: 48px;
    white-space: wrap;
    padding: 2px;
  }
  &:after {
    pointer-events: none;
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(2); /* Größere Skalierung, um über die Grenzen zu leuchten */
    width: 200%;
    height: 200%;
    background-color: var(--glow-spread-color);
    filter: blur(2em); /* Blur erhöht, um Rand zu vermeiden */
    opacity: 0.3; /* Dezenter, damit er weicher wirkt */
    border-radius: 50%; /* Rundere Ecken für weichen Rand */
    z-index: -1; /* Hinter dem Button platzieren */
  }

  &:hover {
    color: var(--btn-color);
    background-color: var(--glow-color);
    transform: scale(1.05); /* Nur die Skalierung anwenden */
    text-shadow: 0 0 3px rgba(255, 255, 255, 0.8); /* Schattierung, um den „Fett-Effekt“ zu simulieren */
    font-weight: 600;
    box-shadow: 
      0 0 2em 0.7em var(--glow-color), 
      inset 0 0 1em 0.3em var(--glow-color);
  }

  &:active {
    box-shadow: 
      0 0 1em 0.3em var(--glow-color), 
      inset 0 0 0.5em 0.2em var(--glow-color);
  }
`;

export default Action;
