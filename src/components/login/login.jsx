import React from "react";
import "./login.css";
import { useHistory } from "react-router-dom";
import { GOOGLE_API_KEY } from "../../config.js";

function App() {
  const history = useHistory();
  var gapi = window.gapi;
  var CLIENT_ID =
    "";
  var DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];

  var SCOPES = "https://www.googleapis.com/auth/calendar.events";
  var startDate = new Date();
  var endDate = startDate;
  console.log(endDate);
  const handleClick = () => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        apiKey: GOOGLE_API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });
      gapi.client.load("calendar", "v3", () => console.log("done"));
      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          var request = gapi.client.calendar.events.insert({
            calendarId: "primary",
          });
          request.execute((event) => {
            window.open(event.htmlLink);
          });
          //get events
          gapi.client.calendar.events
            .list({
              calendarId: "primary",
              timeMin: new Date().toISOString(),
              showDeleted: false,
              singleEvents: true,
              maxResults: 10,
              orderBy: "startTime",
            })
            .then((response) => {
              const events = response.result.items;
              history.push("/week");
              this.props.parentCallback(events);
            });
        });
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Login with Google to view the calendar</p>
        <button
          style={{ width: 100, height: 50 }}
          onClick={handleClick}
          className="btn m-2"
        >
          LOGIN
        </button>
      </header>
    </div>
  );
}

export default App;
