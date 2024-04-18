import React, { useState } from "react";

import TableSearchable from "./components/Table";

export default function App() {
  const [driverDropdown, setDriverDropdown] = useState("id");
  const [plantDropdown, setPlantDropdown] = useState("id");
  const [offenceDropdown, setOffenceDropdown] = useState("id");

  const [driverText, setDriverText] = useState("");
  const [plantText, setPlantText] = useState("");
  const [offenceText, setOffenceText] = useState("");

  const [driverData, setDriverData] = useState([]);
  const [plantData, setPlantData] = useState([]);
  const [offenceData, setOffenceData] = useState([]);

  function handleDriverClick(text, dd) {
    let uri = "";
    if (text == "") 
      uri = "http://18.225.195.209:5001/driver";
    else if (dd=="id")
      uri = `http://18.225.195.209:5001/driver/${text}`;
    else
      uri = `http://18.225.195.209:5001/driver/plant/${text}`;

      fetch(uri)
        .then(response => response.json())  
        .then(data => setDriverData(data))
        .catch(error => console.error(error)); 
  }

  function handlePlantClick(text, dd) {
    let uri = "";
    if (text == "")
      uri = "http://18.225.195.209:5001/plant";
    else
      uri = `http://18.225.195.209:5001/driver/${text}`;

    fetch(uri)
      .then(response => response.json())  
      .then(data => setPlantData(data))
      .catch(error => console.error(error)); 
  }

  function handleOffenceClick(text, dd) {
    let uri = "";
    if (text == "")
      uri = "http://18.225.195.209:5001/offence";
    else if (dd=="id")
      uri = `http://18.225.195.209:5001/offence/${text}`;
    else if (dd=="did")
      uri = `http://18.225.195.209:5001/offence/driver/${text}`;
    else if (dd=="pid")
      uri = `http://18.225.195.209:5001/offence/plant/${text}`;

    fetch(uri)
      .then(response => response.json())  
      .then(data => setOffenceData(data))
      .catch(error => console.error(error)); 
  }

  return (
    <>
      <div>
        <input onChange={(e) => {setDriverText(e.target.value)}}></input>
        <select onChange={(e) => {setDriverDropdown(e.target.value)}}>
          <option value="pid">id</option>
          <option value="pid">pid</option>
        </select>
        <button onClick={() => handleDriverClick(driverText, driverDropdown)}>Search</button>
        <h1>Drivers</h1>
        {driverData.length>0 ? <TableSearchable data={driverData}/> : "Loading..."}
      </div>
      <div>
        <input onChange={(e) => {setPlantText(e.target.value)}}></input>
        <select onChange={(e) => {setPlantDropdown(e.target.value)}}>
          <option value="pid">id</option>
        </select>
        <button onClick={() => handlePlantClick(plantText, plantDropdown)}>Search</button>
        <h1>Plants</h1>
        {plantData.length>0 ? <TableSearchable data={plantData}/> : "Loading..."}      
      </div>
      <div>
        <input onChange={(e) => {setOffenceText(e.target.value)}}></input>
        <select onChange={(e) => {setOffenceDropdown(e.target.value)}}>
          <option value="pid">id</option>
          <option value="did">did</option>
          <option value="pid">pid</option>
        </select>
        <button onClick={() => handleOffenceClick(offenceText, offenceDropdown)}>Search</button>
        <h1>Offences</h1>
        {offenceData.length>0 ? <TableSearchable data={offenceData}/> : "Loading..."}      
      </div>
    </>
  );
}

