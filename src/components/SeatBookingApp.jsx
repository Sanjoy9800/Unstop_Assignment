import React, { useState } from 'react';
import './SeatBookingApp.css';

// Define the number of seats in each row and the total number of rows
const seatsPerRow = 7; // Number of seats in each row
const totalRows = 11; // Total number of rows

// Define initial seat availability
const initialSeats = Array(totalRows)
  .fill(null)
  .map((_, rowIndex) => {
    if (rowIndex === totalRows - 1) {
      return Array(3).fill(true); // Last row has only 3 seats
    }
    return Array(seatsPerRow).fill(true); // Other rows have 7 seats
  });

const SeatBookingApp = () => {
  const [seats, setSeats] = useState(initialSeats); // State for seat availability
  const [selectedSeats, setSelectedSeats] = useState([]); // State for selected seats

  // Handle seat selection
  const handleSeatSelection = (rowIndex, seatIndex) => {
    const updatedSeats = [...seats];
    updatedSeats[rowIndex][seatIndex] = !updatedSeats[rowIndex][seatIndex]; // Toggle seat availability
    setSeats(updatedSeats);

    const seatNumber = `${rowIndex + 1}${seatIndex + 1}`;
    const isSeatSelected = selectedSeats.includes(seatNumber);

    if (isSeatSelected) {
      const updatedSelectedSeats = selectedSeats.filter((seat) => seat !== seatNumber); // Remove the seat from selectedSeats
      setSelectedSeats(updatedSelectedSeats);
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]); // Add the seat to selectedSeats
    }
  };

  // Render the seats
  const renderSeats = () => {
    return seats.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((seat, seatIndex) => {
          const seatNumber = `${rowIndex + 1}${seatIndex + 1}`;
          const isSeatSelected = selectedSeats.includes(seatNumber);
          const seatClass = isSeatSelected ? 'selected' : seat ? 'available' : 'unavailable';

          return (
            <div
              key={seatIndex}
              className={`seat ${seatClass}`}
              onClick={() => handleSeatSelection(rowIndex, seatIndex)}
            >
              {seatNumber}
            </div>
          );
        })}
      </div>
    ));
  };

  return (
    <div>
      <h2 className="title">Seat Booking App</h2>
      <div className="seats-container">{renderSeats()}</div>
      <div className="selected-seats">
        <h3>Selected Seats:</h3>
        {selectedSeats.length > 0 ? (
          <ul>
            {selectedSeats.map((seat) => (
              <li key={seat}>
                {seat}{' '}
                <button
                  className="remove-button"
                  onClick={() => handleSeatSelection(parseInt(seat[0]) - 1, parseInt(seat[1]) - 1)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No seats selected.</p>
        )}
      </div>
    </div>
  );
};

export default SeatBookingApp;
