import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <h1>Select Team</h1>
      {[1, 2, 3, 4, 5].map((team) => (
        <button
          key={team}
          onClick={() => navigate(`/team/${team}`)}
          style={{ margin: 10, padding: 15 }}
        >
          Team {team}
        </button>
      ))}
    </div>
  );
}
