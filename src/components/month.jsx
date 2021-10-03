/* eslint-disable jsx-a11y/anchor-is-valid */
import "../App.css";
import moment from "moment";
import React, { Component } from "react";
import { GOOGLE_API_KEY, CALENDAR_ID } from "../config.js";

var gapi = window.gapi;

export default class Month extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: moment().format("dd, Do MMMM, h:mm A"),
      events: [],
      isBusy: false,
      isEmpty: true,
      isLoading: true,
    };
  }
  componentDidMount = () => {
    this.getEvents();
    setInterval(() => {
      this.tick();
    }, 1);
    setInterval(() => {
      this.getEvents();
    }, 60000);
  };
  //getting events
  getEvents() {
    let that = this;
    function start() {
      gapi.client
        .init({
          apiKey: GOOGLE_API_KEY,
        })
        .then(function () {
          return gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?maxResults=11&orderBy=updated&timeMin=${moment().toISOString()}&timeMax=${moment()
              .endOf("month")
              .toISOString()}`,
          });
        })
        .then(
          (response) => {
            let events = response.result.items;
            console.log(events);
            let sortedEvents = events.sort(function (a, b) {
              return (
                moment(a.start.date).format("YYYYMMDD") -
                moment(b.start.date).format("YYYYMMDD")
              );
            });
            if (events.length > 0) {
              that.setState(
                {
                  events: sortedEvents,
                  isLoading: false,
                  isEmpty: false,
                },
                () => {
                  that.setStatus();
                }
              );
            } /*else {
              that.setState({
                isBusy: true,
                isEmpty: true,
                isLoading: false,
              });
            }*/
          },
          function (reason) {
            console.log(reason);
          }
        );
    }
    gapi.load("client", start);
  }

  tick = () => {
    let time = moment().format("dddd, Do MMMM, h:mm A");
    this.setState({
      time: time,
    });
  };

  setStatus = () => {
    let now = moment();
    let events = this.state.events;
    for (var e = 0; e < events.length; e++) {
      var eventItem = events[e];
      if (
        moment(now).isBetween(
          moment(eventItem.start.dateTime),
          moment(eventItem.end.dateTime)
        )
      ) {
        this.setState({
          isBusy: true,
        });
        return false;
      } else {
        this.setState({
          isBusy: false,
        });
      }
    }
  };

  render() {
    const { time, events } = this.state;
    let eventsList = events.map(function (event) {
      return (
        <div className="events">
          {/* single event html */}
          <a className="list-group-item" href="" key={event.id}>
            <div className="info">
              <span className="desc">{event.summary} </span>
              <br />
              <span>
                {/* Start and end time of the event */}
                {moment(event.start.dateTime).format("h:mm a")}-
                {moment(event.end.dateTime).format("h:mm a")},{"     "}
              </span>
              <br />
              {/* Date of the event */}
              <span>{moment(event.end.date).format("MMMM Do")} </span>
              <br />
            </div>
            {/*delete buttons */}
            <div className="buttons-add-delete">
              <button className="delete">Delete event</button>
            </div>
          </a>
        </div>
      );
    });

    return (
      <div>
        <div className="container">
          <div className="upcoming-events">
            <div className="top-text">
              <h1>Upcoming Events</h1>
              <div className="current-time">{time}</div>
            </div>
            {/* Listing events */}
            <div className="list-group">{events.length > 0 && eventsList}</div>
          </div>
        </div>
      </div>
    );
  }
}
