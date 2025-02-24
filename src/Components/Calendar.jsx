import React, { useState, useEffect } from 'react';
import './Calendar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = currentDate.getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const generateDays = () => {
    let days = [];
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<span key={`empty-${i}`} className="empty"></span>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <span 
          key={day} 
          className={day === today && new Date().getMonth() === month ? "day current-day" : "day"}>
          {day}
        </span>
      );
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="calendar">
      <div className="navigatedate">
        <h2 className="month">{monthNames[month]}</h2>
        <h2 className="year">{year}</h2>
        <div className="button">
          <i className='bx bx-chevron-left' onClick={handlePrevMonth}></i>
          <i className='bx bx-chevron-right' onClick={handleNextMonth}></i>
        </div>
      </div>
      
      <div className="weekdays">
        <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span>
        <span>Thu</span><span>Fri</span><span>Sat</span>
      </div>

      <div className="days">
        {generateDays()}
      </div>
    </div>
  );
};

export default Calendar;
