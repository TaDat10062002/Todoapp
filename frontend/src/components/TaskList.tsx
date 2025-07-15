import { softDelete, taskPriority, taskStatus, updateTask } from "@/services/todo.api";
import { useState } from "react";
import { X } from "lucide-react";
export default function TaskList({ tasks, activeTab, setShouldFetch }: { tasks: any, activeTab: string, setShouldFetch: any }) {
    const [isOpen, setIsOpen] = useState(false)
    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    const handleTaskStatus = async (id: number) => {
        // khac status 2 thi luu vao status 2
        if (activeTab !== '2') {
            await taskStatus(id, 2)
            setShouldFetch(true)
        }
        else {
            await taskStatus(id, 1)
            setShouldFetch(true)
        }
    }

    const [priorities, setPriorities] = useState(1);
    const handlePriority = async (id: number) => {
        await taskPriority(id, priorities)
        setShouldFetch(true)
    }
    const [updateData, setUpdateData] = useState({
        title: '',
        desc: ''
    })


    const [taskId, setTaskId] = useState();
    const handleUpdateTask = async () => {
        updateTask(taskId, updateData);
        setShouldFetch(true)
        closeModal();
    }

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
                                <svg
                                    onClick={() => handleTaskStatus(task.id)}
                                    className="w-3 h-3 text-white" fill="none" stroke={activeTab === '2' ||
                                        (activeTab === '0' && task.statusId === 2)
                                        ? 'green' : 'currentColor'}
                                    viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3}
                                        d="M5 13l4 4L19 7" />
                                </svg>
                            </button>
                            <div className="ml-4 flex-1">
                                <h3 onClick={() => { openModal(), setUpdateData({ ...updateData, desc: task.desc, title: '' }), setTaskId(task.id) }} className="font-medium transition-colors text-gray-900 group-hover:text-gray-700">
                                    {task.desc}
                                </h3>
                                <div className="flex items-center space-x-3 mt-1">
                                    <span
                                        onClick={() => { handlePriority(task.id), priorities < 3 ? setPriorities(priorities + 1) : setPriorities(1) }}
                                        style={{
                                            color: task.priority.color,
                                            borderColor: task.priority.color,
                                        }}
                                        className={`px-2 py-1  text-xs font-medium rounded-full border cursor-pointer`}>
                                        Priority: {task.priority.name}
                                    </span>
                                    <span onClick={() => { openModal(), setUpdateData({ ...updateData, title: task.title, desc: '' }), setTaskId(task.id) }} className="text-xs text-gray-700 font-medium">{task.title}</span>
                                    <span
                                        className="text-xs text-gray-500">📅 {new Date(task.dueDate).toLocaleDateString("vi-VN")}</span>
                                </div>
                                {isOpen && (
                                    <div
                                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-50 backdrop-blur-sm"
                                        onClick={closeModal}
                                    >
                                        {/* Modal Content */}
                                        <div
                                            className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto transform transition-all duration-300 ease-out"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {/* Modal Header */}
                                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                                <h2 className="text-xl font-semibold text-gray-900">Update Task Info</h2>
                                                <button
                                                    onClick={closeModal}
                                                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full p-1"
                                                    aria-label="Close modal"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </div>

                                            {/* Modal Body */}
                                            <div className="p-6">
                                                {/* Example form content */}
                                                <div className="space-y-4">
                                                    <input
                                                        type="text"
                                                        onChange={(e) => {
                                                            updateData.title ?
                                                                setUpdateData(
                                                                    {
                                                                        ...updateData,
                                                                        title: e.target.value,
                                                                    }
                                                                )
                                                                :
                                                                setUpdateData(
                                                                    {
                                                                        ...updateData, desc: e.target.value,
                                                                    }
                                                                )
                                                        }
                                                        }
                                                        defaultValue={updateData?.title || updateData?.desc}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                </div>
                                            </div>

                                            {/* Modal Footer */}
                                            <div className="flex flex-col sm:flex-row gap-3 p-6 border-t border-gray-200">
                                                <button
                                                    onClick={closeModal}
                                                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={handleUpdateTask}
                                                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                                >
                                                    Save Changes
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}


                            </div>
                            <div
                                onClick={() => { softDelete(task.id), setShouldFetch(true) }}
                                className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all duration-200">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div >

        </>
    )
}