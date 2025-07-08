// src/hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query"
import {login} from "@/services/auth.api";

export function useLogin() {
    return useMutation({
        mutationFn: login,
    })
}
