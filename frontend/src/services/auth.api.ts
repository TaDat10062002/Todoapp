import axiosClient from "@/services/axiosClient";

export const login = async (data : any  ) => {
    const res = await axiosClient.post('/auth/login', data);
    return res.data;
}