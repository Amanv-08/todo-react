
import TaskItem from './TaskItem';

function TaskList({ filteredTasks, tasks, filter, isSearching, searchText, editingId, editText, setEditText, onToggle, onStartEdit, onSaveEdit, onCancelEdit, onDelete }) {
    return (
        <div className="space-y-3">
            {filteredTasks.length === 0 ? (
                <div className="py-12 text-center">
                    <div className="mb-3 text-4xl">📝</div>

                    <p className="font-medium text-gray-300">
                        {tasks.length === 0
                            ? 'No tasks yet'
                            : isSearching && searchText
                                ? 'No matching tasks found'
                                : `No ${filter.toLowerCase()} tasks`}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        {tasks.length === 0
                            ? 'Add your first task to get started!'
                            : 'Try another search or filter.'}
                    </p>
                </div>
            ) : (
                filteredTasks.map((item) => (
                    <TaskItem key={item.id} item={item} editingId={editingId} editText={editText} setEditText={setEditText} onToggle={onToggle} onStartEdit={onStartEdit} onSaveEdit={onSaveEdit} onCancelEdit={onCancelEdit} onDelete={onDelete}
                    />
                ))
            )}
        </div>
    );
}

export default TaskList;