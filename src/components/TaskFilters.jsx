
function TaskFilters({ filter, setFilter, pendingCount, taskCount, onCompleteAll, onClearAll,}) {
    return (
        <div className="mt-4 mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
                {['All', 'Pending', 'Completed'].map((value) => (
                    <button
                        key={value}
                        onClick={() => setFilter(value)}
                        className={`rounded-xl border border-gray-600 px-4 py-2 text-sm transition ${filter === value
                                ? 'bg-emerald-500 text-white'
                                : 'bg-[#292e39] text-gray-300 hover:bg-[#353b48]'
                            }`}
                    >
                        {value}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-2 sm:flex">
                <button
                    onClick={onCompleteAll}
                    disabled={pendingCount === 0}
                    className="whitespace-nowrap rounded-xl bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-500 disabled:opacity-40"
                >
                    Complete All
                </button>
                <button
                    onClick={onClearAll}
                    disabled={taskCount === 0}
                    className="whitespace-nowrap rounded-xl bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-500 disabled:opacity-40"
                >
                    Clear All
                </button>
            </div>
        </div>
    );
}
export default TaskFilters;