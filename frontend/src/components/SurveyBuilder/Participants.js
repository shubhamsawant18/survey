import React from 'react';
import '../../styles/participants.css';

const teamOptions = ['Frontend', 'Backend', 'DevOps', 'Mobile'];

const Participants = ({ participants, setParticipants }) => {
  const toggleTeam = (team) => {
    if (participants.includes(team)) {
      setParticipants(participants.filter((t) => t !== team));
    } else {
      setParticipants([...participants, team]);
    }
  };

  return (
    <div className="participants-container">
      <h2>Select Participants</h2>
      <p>Select which teams this survey will be sent to:</p>

      <div className="teams-list">
        {teamOptions.map((team) => (
          <div key={team} className="team-row">
            <label>{team} Team</label>
            <label className="switch">
              <input
                type="checkbox"
                checked={participants.includes(team)}
                onChange={() => toggleTeam(team)}
              />
              <span className="slider"></span>
            </label>
          </div>
        ))}
      </div>

      <div className="note">
        ⚠️ Only selected teams will receive this survey when published.
      </div>
    </div>
  );
};

export default Participants;