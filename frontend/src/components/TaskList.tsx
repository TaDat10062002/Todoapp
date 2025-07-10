import {softDelete} from "@/services/todo.api";

export default function TaskList({tasks, activeTab}: { tasks: any, activeTab: string }) {
    return (
        <>
            <div className="task-list">
                {
                    tasks?.map((task: any, index: number) => (
                        <div key={index}
                             className="task-item group flex items-center p-4 rounded-xl border transition-all duration-200 hover:shadow-md bg-white/80 border-gray-200/50 hover:border-blue-200">
                            <button
                                className="w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 border-gray-300 hover:border-blue-500">
                                {/* Nếu task.completed thì hiển thị SVG này */}
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3}
                                          d="M5 13l4 4L19 7"/>
                                </svg>
                            </button>
                            <div className="ml-4 flex-1">
                                <h3 className="font-medium transition-colors text-gray-900 group-hover:text-gray-700">
                                    {task.desc}
                                </h3>
                                <div className="flex items-center space-x-3 mt-1">
                                      <span
                                          style={{
                                              color: task.priority.color,
                                              borderColor: task.priority.color,
                                          }}
                                          className={`px-2 py-1 text-xs font-medium rounded-full border`}>
                                         Priority: {task.priority.name}
                                      </span>
                                    <span className="text-xs text-gray-700 font-medium">{task.title}</span>
                                    <span
                                        className="text-xs text-gray-500">📅 {new Date(task.dueDate).toLocaleDateString("vi-VN")}</span>
                                </div>
                            </div>
                            <div
                                onClick={() => softDelete(task.id)}
                                className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all duration-200">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor"
                                         viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))
                }

            </div>

        </>
    )
}