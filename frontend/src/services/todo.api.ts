import toast from "react-hot-toast";
import authAxiosClient from "@/services/authAxiosClient";
import { title } from "process";
import { Joan } from "next/font/google";

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

export const taskStatus = async (id: number, statusId: number) => {
    try {
        await authAxiosClient.put(`/todo/update/${id}`, { statusId });
    } catch (e: any) {
        toast.error(e.response.data.message)
    }
}

export const taskPriority = async (id: number, priorityId: number) => {
    try {
        await authAxiosClient.put(`/todo/update/${id}`, { priorityId });
    } catch (e: any) {
        toast.error(e.response.data.message)
    }
}

export const updateTask = async (id: any, updateData: any) => {
    try {
        await authAxiosClient.put(`/todo/update/${id}`, updateData);
    } catch (e: any) {
        toast.error(e.response.data.message)
    }
}

export const addTask = async (data: any) => {
    try {
        const res = await authAxiosClient.post(`/todo/create`, { desc: data });
        toast.success(res.data.message)
    } catch (e: any) {
        toast.error(e.response.data.message)
    }
}