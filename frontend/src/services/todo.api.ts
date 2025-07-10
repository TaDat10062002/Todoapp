import toast from "react-hot-toast";
import authAxiosClient from "@/services/authAxiosClient";

export const getTasks = async (status: string) => {
    try {
        const res = await authAxiosClient.get(`/todo?status=${status}`);
        return res.data.tasks;
    } catch (e: any) {
        toast.error(e.response.data.message)
    }
}

export const getSummary = async () => {
    try {
        const res = await authAxiosClient.get('/todo/');
        return res.data.summary;
    } catch (e: any) {
        toast.error(e.response.data.message)
    }
}

export const softDelete = async (id: number) => {
    try {
        const res = await authAxiosClient.delete(`/todo/delete/${id}`);
        toast.success(res.data.message);
    } catch (e: any) {
        toast.error(e.response.data.message)
    }
}