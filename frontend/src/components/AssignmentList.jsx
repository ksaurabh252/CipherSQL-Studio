function AssignmentList(props) {
  const assignments = [
    {
      id: 1,
      title: "Select All Users",
      difficulty: "Easy",
      desc: "Get all data from users table.",
    },
    {
      id: 2,
      title: "Find Active Orders",
      difficulty: "Medium",
      desc: "Select orders where status is active.",
    },
    {
      id: 3,
      title: "Join Tables",
      difficulty: "Hard",
      desc: "Inner join practice.",
    },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: "20px", color: "#1e1b4b" }}>
        Practice Modules
      </h2>

      <div className="assignment-list">
        {assignments.map((item) => (
          <div key={item.id} className="assignment-card">
            <div className="assignment-card__title">{item.title}</div>
            <div className={`assignment-card__difficulty ${item.difficulty.toLowerCase()}`}>{item.difficulty}</div>

            <p>{item.desc}</p>
            <button onClick={() => props.onSelect(item)}>Attempt</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AssignmentList;
