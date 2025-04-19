import { useEffect, useState } from "react";
import { getExpenseSummary } from "../services/api";


const Summary = () => {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    const data = await getExpenseSummary();
    setSummary(data);
  };

  return (
    <div className="summary">
      <h2>Expense Summary</h2>
      <ul>
        {summary.map((item, index) => (
          <li key={index}>
            {item.category}: ${item.total_spent}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Summary;
