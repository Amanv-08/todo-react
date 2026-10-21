function TaskForm({ task, setTask, onSearch, onAdd }) {
    return (
        <div className="flex flex-col gap-3 sm:flex-row">
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') onAdd();
                }}
                placeholder="Enter or search your task..."
                className="flex-1 rounded-xl border border-gray-600 bg-transparent px-4 py-3 text-gray-300 outline-none focus:border-green-400"
            />

            <button
                onClick={onSearch}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500"
            >
                Search Task
            </button>

            <button
                onClick={onAdd}
                className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white hover:bg-emerald-400"
            >
                Add Task
            </button>
        </div>
    );
}

export default TaskForm;