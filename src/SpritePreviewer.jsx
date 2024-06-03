import React from 'react';

import './SpritePreviewer.css';
import { customCharacters, customVanillas, getPercent, getUrl } from './sprites.js';

const containerStyle = {
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "space-around",
} 

const boxStyle = (mode) => { return {
    display: "flex",
    borderRadius: "4px",
    border: "1px solid #bbb",
    padding: "4px",
    margin: "2px",
    flexBasis: mode === 1 ? "32%": "19%",
    minWidth: mode === 1 ? "175px" : "75px",
    flexDirection: mode === 1 ? "row" : "column-reverse",
    alignItems: mode === 1 ? "inherit" : "center",
}}

const spriteDisplayStyle = (character) => { return {
    backgroundImage: `url('${getUrl(character?.value, 1)}')`,
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
    textAlign: "center",
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


const SpritePreviewer = (props) => {
    const customs = props.mode === 1 ? customCharacters : customVanillas;
    return <div style={containerStyle}>
    { customs === customVanillas && <div>
        Expanded vanilla sprites have been improved, with alternate sprite versions—ghost, climbing, jumping, etc—by Defqon1 (thank you!)
    </div>}
    { customs.map(character => {
        return <div key={character.value} style={boxStyle(props.mode)}>
            <div className="animatedSprite" style={spriteDisplayStyle(character)} />
            <div style={infoStyle}>
                <span style={labelStyle}>{character.label}</span>
                { customs === customCharacters && <>
                    <span style={creatorStyle}>Creator: {character.creator}</span>
                    <span style={conversionStyle}>
                        {getPercent(character)}% conversion
                    </span>
                </>}
            </div>
        </div>
    })}
    </div>
}

export default SpritePreviewer;