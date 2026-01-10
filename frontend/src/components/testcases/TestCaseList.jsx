import { FixedSizeList as List } from "react-window";

import TestCaseRow from "./TestCaseRow";

export default function TestCaseList({
  data,
  selectedIds,
  toggleOne,
  toggleAll
}) {
  const allSelected =
    data.length > 0 && data.every(d => selectedIds.has(d.id));

  return (
    <div className="bg-white rounded border mt-4">
      {/* Header */}
      <div className="grid grid-cols-12 gap-2 px-4 py-2 border-b text-xs font-semibold text-gray-600">
        <div className="col-span-1">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={() => toggleAll(data.map(d => d.id))}
          />
        </div>
        <div className="col-span-3">Title</div>
        <div className="col-span-2">Priority</div>
        <div className="col-span-2">Type</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2">Actions</div>
      </div>

      {/* Virtual list */}
  <List
  height={400}
  itemCount={data.length}
  itemSize={50}
  width="100%"
>
  {({ index, style }) => {
    const item = data[index];
    return (
      <div style={style}>
        <TestCaseRow
          test={item}
          selected={selectedIds.has(item.id)}
          onToggle={toggleOne}
        />
      </div>
    );
  }}
</List>

    </div>
  );
}
