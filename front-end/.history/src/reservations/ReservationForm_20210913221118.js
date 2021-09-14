import React, { useState } from "react";

function ReservationForm({ onSubmit, onCancel }) {
  const initialState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
  };
  const [reservation, setReservation] = useState(initialState);

  function changeHandler({ target: { name, value } }) {
    setReservation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  function submitHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    onSubmit(reservation);
  }
  return (
    <>
      <form onSubmit={submitHandler}>
        <fieldset>
          <div className="form-group">
            <label htmlFor="first_name">First name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              className="form-control"
              value={reservation.first_name}
              required={true}
              placeholder="First name of the client"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Last name</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              className="form-control"
              value={reservation.last_name}
              required={true}
              placeholder="Last name of the client"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile_number">Mobile number</label>
            <input
              type="tel"
              id="mobile_number"
              name="mobile_number"
              className="form-control"
              value={reservation.mobile_number}
              required={true}
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              placeholder="000-000-000"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservation_date">Date of reservation</label>
            <input
              type="date"
              id="reservation_date"
              name="reservation_date"
              className="form-control"
              value={reservation.reservation_date}
              required={true}
              placeholder="YYYY-MM-DD"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservation_time">Time of reservation</label>
            <input
              type="time"
              id="reservation_time"
              name="reservation_time"
              className="form-control"
              value={reservation.reservation_time}
              required={true}
              placeholder="HH:MM"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="people">Number of people</label>
            <input
              type="number"
              id="people"
              name="people"
              min
              className="form-control"
              value={reservation.people}
              required={true}
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="people">Number of people</label>
            <input
              type:""
              id="people"
              name="people"
              className="form-control"
              rows="4"
              required={true}
              placeholder="Brief description of the deck"
              value={reservation.people}
              onChange={changeHandler}
            />
          </div>
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </fieldset>
      </form>
    </>
  );
}

export default ReservationForm;
