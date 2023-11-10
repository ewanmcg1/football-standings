import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState('5267');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api-football-v1.p.rapidapi.com/v2/leagueTable/${selectedLeague}`,
          {
            method: 'GET',
            headers: {
              'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
              'x-rapidapi-key': '723d248c53msh89a83d89d689239p1e586bjsn0fa5f2f53c56',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        setData(responseData.api.standings[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedLeague]);

  return (
    <div className="App">
      <div className="content-container">
        <div className="standings">
          <h2>Current Football Standings</h2>
          <div className="select-container">
            <select
              name="select-league"
              id="select-league"
              defaultValue={selectedLeague}
              onChange={(e) => setSelectedLeague(e.target.value)}
            >
              <option value="5267">English Premier League (England)</option>
              <option value="5367">Serie A (Italy)</option>
              <option value="5284">La Liga (Spain)</option>
              <option value="5348">Bundesliga (Germany)</option>
              <option value="5322">Ligue 1 (France)</option>

            </select>
          </div>
          <div className="standings-table">
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Team</th>
                  <th>GP</th>                 
                  <th>W</th>
                  <th>D</th>
                  <th>L</th>
                  <th>GF</th>
                  <th>GA</th>
                  <th>GD</th>
                  <th>Points</th>
                  {/* Add more table headers based on your data */}
                </tr>
              </thead>
              <tbody>
                {data.map((team) => (
                  <tr key={team.team_id}>
                    
                    <td>{team.rank}</td>
                    <td>{team.teamName}</td>
                    <td>{team.all.matchsPlayed}</td>
                    <td>{team.all.win}</td>
                    <td>{team.all.draw}</td>
                    <td>{team.all.lose}</td>
                    <td>{team.all.goalsFor}</td>
                    <td>{team.all.goalsAgainst}</td>
                    <td>{team.goalsDiff}</td>
                    <td>{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
