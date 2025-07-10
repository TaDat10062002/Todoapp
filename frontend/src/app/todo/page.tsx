'use client';
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";
import {getSummary, getTasks} from "@/services/todo.api";
import TaskList from "@/components/TaskList";
import AddTask from "@/components/AddTask";

interface Summary {
    all: number;
    pending: number;
    completed: number;
}

interface SummaryResponse {
    summary: Summary;
}

type Task = {
    id: number;
    title: string;
    status: string;
};

export default function HomePage() {
    const loggedUser = useSelector((state: any) => (state.auth.loggedUser));
    const [isClient, setIsClient] = useState(false);
    const [activeTab, setActiveTab] = useState<'0' | '1' | '2'>('0');
    const [tasks, setTasks] = useState([]);
    const [summary, setSummary] = useState(
        {
            all: 0,
            pending: 0,
            completed: 0,
        }
    );

    useEffect(() => {
        setIsClient(true);
        if (loggedUser === undefined) {
            toast.error('Please login first');
        }
    }, [loggedUser]);

    useEffect(() => {
        fetchTasks();
    }, [tasks, activeTab]);

    const fetchTasks = async () => {
        setTasks(await getTasks(activeTab));
        setSummary(await getSummary());
    }

    if (!isClient) return <Spinner/>

    return (
        <>
            <main className="w-3/5 mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className={`Greeting text-center text-2xl font-bold text-gray-900 mb-5`}>
                    <div className={`Greeting-content`}>Goodmorning {loggedUser?.fullName || ''}</div>
                    <span className={`block`}>You have {summary?.all} tasks left today</span>
                </div>

                {/*// Add task*/}
                <AddTask/>

                {/*tab status */}
                <div
                    className={`task-status flex justify-between bg-gray-50 shadow-xl m-5 p-2 rounded-xl cursor-pointer`}>
                    <button onClick={() => setActiveTab('0')}
                            className={` ${activeTab === '0' ? 'text-blue-600 flex-1 bg-white py-2 rounded' : 'flex-1 py-2'}`}
                    >All tasks ({summary?.all})
                    </button>
                    <button onClick={() => setActiveTab('1')}
                            className={` ${activeTab === '1' ? 'text-blue-600 flex-1 bg-white py-2 rounded' : 'flex-1 py-2'}`}
                    >Pending ({summary?.pending})
                    </button>
                    <button onClick={() => setActiveTab('2')}
                            className={` ${activeTab === '2' ? 'text-blue-600 flex-1 bg-white py-2 rounded' : 'flex-1 py-2'}`}
                    >Completed ({summary?.completed})
                    </button>
                </div>

                {/*List of tasks */}
                <div className="tasks-section m-5 bg-white shadow-xl rounded-xl p-5">
                    {
                        tasks.length > 0
                            ?
                            <TaskList tasks={tasks} activeTab={activeTab}/>
                            : <div className="text-center text-gray-500">No tasks found</div>
                    }
                </div>

                {/*summary */}
                {/*<div className={`task-summary`}>*/}
                {/*    <div className="mt-8 m-5 grid grid-cols-1 sm:grid-cols-3 gap-4">*/}
                {/*        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/20">*/}
                {/*            <div className="text-2xl font-bold text-blue-600">{22}</div>*/}
                {/*            <div className="text-sm text-gray-600">Tổng số việc</div>*/}
                {/*        </div>*/}
                {/*        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/20">*/}
                {/*            <div*/}
                {/*                className="text-2xl font-bold text-green-600">{3}</div>*/}
                {/*            <div className="text-sm text-gray-600">Đã hoàn thành</div>*/}
                {/*        </div>*/}
                {/*        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/20">*/}
                {/*            <div*/}
                {/*                className="text-2xl font-bold text-orange-600">{3}</div>*/}
                {/*            <div className="text-sm text-gray-600">Còn lại</div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </main>
        </>
    )
}