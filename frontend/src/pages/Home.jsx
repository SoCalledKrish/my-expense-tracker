import { useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";


const Home = () => {
  const [refresh, setRefresh] = useState(false);
  const toggleRefresh = () => setRefresh(!refresh);

  return (
    <div style={{ backgroundColor: "#1e1e1e", minHeight: "100vh", color: "#fff" }}>
      <div className="home" style={{ padding: "2rem" }}>
        <h1 style={{ color: "#fff", marginBottom: "2rem" }}>Expense Tracker</h1>
        <ExpenseForm onExpenseAdded={toggleRefresh} />
        <ExpenseList key={refresh} />
      </div>
    </div>
  );
};

export default Home;
