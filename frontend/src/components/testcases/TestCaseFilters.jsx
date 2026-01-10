export default function TestCaseFilters({
  search,
  setSearch,
  priority,
  setPriority,
}) {
  return (
    <div className="bg-white p-4 rounded border flex flex-col md:flex-row gap-4">
      <input
        type="text"
        placeholder="Search test cases..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded px-3 py-2 w-full md:w-1/3"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="border rounded px-3 py-2 w-full md:w-1/4"
      >
        <option value="">All Priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
        <option value="Critical">Critical</option>
      </select>
    </div>
  );
}
