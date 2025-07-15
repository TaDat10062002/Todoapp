import { addTask } from "@/services/todo.api";
import { useState } from "react"

export default function AddTask({ setShouldFetch }: { setShouldFetch: any }) {
    const [dataForm, setDataForm] = useState('');
    const handleAddTask = async () => {
        addTask(dataForm)
        setShouldFetch(true)
    }
    return (
        <>
            <div className={`flex items-center justify-between bg-white shadow-xl m-5 p-5 rounded-xl`}>
                <div className={`border-2 py-5 w-2xl rounded-xl`}>
                    <input
                        type="text"
                        onChange={(e) => setDataForm(e.target.value)}
                        placeholder={`Add a task`}
                        className={`border-none focus:outline-none w-full pl-5 `} />
                </div>
                <button
                    onClick={handleAddTask}
                    className="ml-5 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>
        </>
    )
}