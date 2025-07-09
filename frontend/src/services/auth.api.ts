import axiosClient from "@/services/axiosClient";
import toast from "react-hot-toast";

export const login = async (data: any) => {
    return await axiosClient.post('/auth/login', data);
}

export const register = async (data: any) => {
    try {
        const res = await axiosClient.post('/auth/register', data);
        toast.success(res.data.message);
    } catch (e: any) {
        toast.error(e.response.data.message)
    }
}