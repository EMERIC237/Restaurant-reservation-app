import React, { useState, useEffect } from "react";

function ReservationForm({ onSubmit, onCancel }) {
  const initialState = {
    "First name": "",
    "Last name": "",
    " Mobile number": "",
    "Date of reservation": "",
    "Time of reservation": "",
    "Number of people": 1,
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
              value={reservation["First name"]}
              required={true}
              placeholder="Deck Name"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              rows="4"
              required={true}
              placeholder="Brief description of the deck"
              value={deck.description}
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
