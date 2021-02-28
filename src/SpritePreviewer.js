import React from 'react';

import './SpritePreviewer.css';
import { customCharacters, getPercent, getUrl } from './sprites.js';

const containerStyle = {
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "space-around",
} 

const boxStyle = {
    display: "flex",
    borderRadius: "4px",
    border: "1px solid #bbb",
    padding: "4px",
    margin: "2px",
    flexBasis: "32%",
    minWidth: "175px",
}

const spriteDisplayStyle = (character) => { return {
    backgroundImage: `url('${getUrl(character, 1)}')`,
    margin: "6px",
    marginRight: "12px",
    alignSelf: "center",
}}

const infoStyle = {
    display: "flex",
    flexDirection: "column",
    lineHeight: "1em",
}

const labelStyle = {
    fontWeight: "bold",
    marginBottom: "4px",
}

const creatorStyle = {
    marginBottom: "4px",
    color: "#666",
    fontSize: "0.9em",
}

const conversionStyle = {
    color: "green",
    fontSize: "0.8em",
}

const SpritePreviewer = () => {
    return <div style={containerStyle}>
    { customCharacters.map(character => {
        return <div key={character.value} style={boxStyle}>
            <div className="animatedSprite" style={spriteDisplayStyle(character)} />
            <div style={infoStyle}>
                <span style={labelStyle}>{character.label}</span>
                <span style={creatorStyle}>Creator: {character.creator}</span>
                <span style={conversionStyle}>
                    {getPercent(character)}% conversion
                </span>
            </div>
        </div>
    })}
    </div>
}

export default SpritePreviewer;