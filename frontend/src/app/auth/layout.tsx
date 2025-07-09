import ReduxProvider from "@/app/providers/ReduxProvider";
import '@/app/globals.css'

export default function AuthLayout({children}: { children: React.ReactNode }) {
    return (
        <ReduxProvider>
            {children}
        </ReduxProvider>
    );
}
