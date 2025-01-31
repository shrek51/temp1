import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ShiftPage() {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [shift, setShift] = useState("S1");
  const [workers, setWorkers] = useState([]);
  const [assignments, setAssignments] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/teams")
      .then((res) =>
        setWorkers(
          res.data.filter((w) => w.Team == teamId && w.Shift === shift)
        )
      );
  }, [shift, teamId]);

  const handleSubmit = async () => {
    await axios.post("http://localhost:5000/api/assignments", {
      team: teamId,
      shift,
      assignments,
    });
    alert("Submitted successfully!");
    navigate("/");
  };

  return (
    <div style={{ padding: 20 }}>
      <div>
        <button onClick={() => setShift("S1")}>S1</button>
        <button onClick={() => setShift("S2")}>S2</button>
        <button onClick={() => setShift("S3")}>S3</button>
      </div>

      <h2>Workers in Shift {shift}</h2>
      <ul>
        {workers.map((worker) => (
          <li key={worker.Name}>{worker.Name}</li>
        ))}
      </ul>

      <h2>Assign Roles</h2>
      {["Role1", "Role2", "Role3", "Role4", "Role5", "Role6", "Role7"].map(
        (role) => (
          <div key={role} style={{ margin: "10px 0" }}>
            <label>{role}:</label>
            <select
              onChange={(e) =>
                setAssignments({ ...assignments, [role]: e.target.value })
              }
              style={{ marginLeft: 10 }}
            >
              <option value="">Select Worker</option>
              {workers.map((worker) => (
                <option key={worker.Name} value={worker.Name}>
                  {worker.Name}
                </option>
              ))}
            </select>
          </div>
        )
      )}

      <button onClick={handleSubmit} style={{ marginTop: 20, padding: 10 }}>
        Submit Assignments
      </button>
    </div>
  );
}
