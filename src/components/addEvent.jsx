import React from "react";
import { useState } from "react";
import "./addEvent.css";

function AddEvent() {
  var gapi = window.gapi;
  var CLIENT_ID =
    "248630370114-l1s223trgd26cikhotopcq1ltgeu32ac.apps.googleusercontent.com";
  var API_KEY = "AIzaSyACBXSj69RlcGUxBBqOVV1cW4l1htcuvs0";
  var DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  var SCOPES = "https://www.googleapis.com/auth/calendar.events";

  const [name, setName] = useState("");
  const [startDate, setStart] = useState("");
  const [endDate, setEnd] = useState("");

  const handleClick = () => {
    gapi.load("client:auth2", () => {
      console.log("loaded client");

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });

      gapi.client.load("calendar", "v3", () => console.log("bam!"));

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          var event = {
            summary: this.state.name,
            location: "Zagreb",
            description: "Really great refreshments",
            start: {
              dateTime: this.state.startDate,
              timeZone: "Europe/London",
            },
            end: {
              dateTime: this.state.endDate,
              timeZone: "Europe/London",
            },
          };
          console.log(event.summary);
          var request = gapi.client.calendar.events.insert({
            calendarId: "primary",
            resource: event,
          });

          request.execute((event) => {
            console.log(event);
            window.open(event.htmlLink);
          });
        });
    });
  };

  return (
    <div className="Add">
      <a href="/week">
        <button style={{ width: 100, height: 50 }} className="btn backCalendar">
          Back to the Calendar
        </button>
      </a>
      <header className="App-header">
        <p>Type in the information for the event</p>
        <form>
          <label>
            Enter the name of the event
            <input
              placeholder="meeting with Marko"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            Enter the start time of the event
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStart(e.target.value)}
            />
            <br />
            Enter the end time of the event
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEnd(e.target.value)}
            />
          </label>
          <br />
          <button
            type="submit"
            style={{ width: 100, height: 50 }}
            onClick={handleClick}
            className="btn m-2"
          >
            Add Event
          </button>
        </form>
        <br />
      </header>
    </div>
  );
}

export default AddEvent;
