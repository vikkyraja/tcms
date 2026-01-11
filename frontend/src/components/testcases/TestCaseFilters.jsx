export default function TestCaseFilters({
  search,
  setSearch,
  priority,
  setPriority,
}) {
  return (
    <div className="bg-white p-4 rounded border flex gap-4">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search test cases..."
        className="border px-3 py-2 rounded w-1/2"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="border px-3 py-2 rounded w-1/4"
      >
        <option value="">All Priorities</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
        <option>Critical</option>
      </select>
    </div>
  );
}
