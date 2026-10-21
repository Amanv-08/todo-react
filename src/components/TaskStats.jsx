
function TaskStats({ total, pending, completed }) {
  return (
    <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-400">
      <span>Total: {total}</span>
      <span>Pending: {pending}</span>
      <span>Completed: {completed}</span>
    </div>
  );
}

export default TaskStats;