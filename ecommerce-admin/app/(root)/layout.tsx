import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";

export default async function ({ children }: { children: React.ReactNode }) {
    const { userId } = auth()
    if (!userId) redirect('/sign-in')

    const store = await db.store.findFirst({
        where: {
            userId: userId
        }
    })
    if (store) redirect(`/${store.id}`)

    return (
        <div >
            {children}
        </div>
    )
}