import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import Auth from "../Auth";
import Button from "../ui/Button";

export default function Dashboard({ children }) {

    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(supabase.auth.session())

    useEffect(() => {
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    useEffect(() => {
        setLoading(false)
    }, [session])

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">Loading...</div>
        )
    }

    if (!session) {
        return (
            <Auth />
        )
    }

    return (
        <div className="flex flex-col space-y-5">
            <div className="flex flex-row items-center place-content-between border-b p-5">
                <div className="text-5xl font-bold">&#9660;</div>
                <div>
                    <Button onClick={() => {
                        supabase.auth.signOut()
                    }}>Sign Out</Button>
                </div>
            </div>
            <div className="container mx-auto px-5 sm:px-0">
                {children}
            </div>
        </div>
    )

}