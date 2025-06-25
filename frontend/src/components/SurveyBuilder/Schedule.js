import React from 'react';
import '../../styles/schedule.css';

const Schedule = ({ schedule, setSchedule }) => {
  const update = (field, value) => {
    setSchedule({ ...schedule, [field]: value });
  };

  return (
    <div className="schedule-container">
      <h2>Survey Schedule</h2>

      <label>Start Date & Time</label>
      <input
        type="datetime-local"
        value={schedule.start}
        onChange={(e) => update('start', e.target.value)}
      />

      <label>Duration (in hours)</label>
      <input
        type="number"
        value={schedule.duration}
        onChange={(e) => update('duration', e.target.value)}
        placeholder="e.g. 48"
        min="1"
      />

      <label>Send Reminders Every (in hours)</label>
      <input
        type="number"
        value={schedule.reminder}
        onChange={(e) => update('reminder', e.target.value)}
        placeholder="e.g. 12"
        min="0"
      />

      <div className="note">
        ⏰ You can adjust reminder intervals based on urgency. Reminders stop after the survey closes.
      </div>
    </div>
  );
};

export default Schedule;