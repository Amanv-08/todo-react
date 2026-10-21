
function TaskItem({ item, editingId, editText, setEditText, onToggle, onStartEdit, onSaveEdit, onCancelEdit, onDelete }) {

    const isEditing = editingId === item.id;

    return (
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-700 bg-[#222630] p-4 transition hover:border-gray-500">
            <input
                type="checkbox"
                checked={item.completed}
                disabled={isEditing}
                onChange={() => onToggle(item.id)}
                className="h-5 w-5 shrink-0 cursor-pointer accent-emerald-500"
            />

            {isEditing ? (
                <input
                    autoFocus
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') onSaveEdit(item.id);
                        if (e.key === 'Escape') onCancelEdit();
                    }}
                    className="min-w-0 flex-1 rounded-lg border border-gray-600 bg-[#111318] px-3 py-2 text-gray-200 outline-none focus:border-emerald-400"
                />
            ) : (
                <span
                    className={`min-w-0 flex-1 wrap-break text-sm sm:text-base ${item.completed
                            ? 'text-gray-500 line-through'
                            : 'text-gray-200'
                        }`}
                >
                    {item.task}
                </span>
            )}

            {isEditing ? (
                <>
                    <button
                        onClick={() => onSaveEdit(item.id)}
                        className="rounded-lg bg-emerald-600 px-3 py-2 text-sm text-white hover:bg-emerald-500"
                    >
                        Save
                    </button>

                    <button
                        onClick={onCancelEdit}
                        className="rounded-lg bg-gray-600 px-3 py-2 text-sm text-white hover:bg-gray-500"
                    >
                        Cancel
                    </button>
                </>
            ) : (
                <>
                    <button
                        onClick={() => onStartEdit(item)}
                        className="rounded-lg bg-blue-500/10 px-3 py-2 text-sm text-blue-400 hover:bg-blue-500 hover:text-white"
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(item.id)}
                        className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400 hover:bg-red-500 hover:text-white"
                    >
                        Delete
                    </button>
                </>
            )}
        </div>
    );
}

export default TaskItem;