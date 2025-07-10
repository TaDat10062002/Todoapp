import axiosClient from "@/services/axiosClient";
import toast from "react-hot-toast";

export const login = async (data: any) => {
    try {
        const res = await axiosClient.post('/auth/login', data);
        toast.success('Login successfully');
        return res;
    } catch (e: any) {
        toast.error(e.response.data.message)
    }
}

export const register = async (data: any) => {
    try {
        const res = await axiosClient.post('/auth/register', data);
        toast.success(res.data.message);
    } catch (e: any) {
        toast.error(e.response.data.message)
    }
}