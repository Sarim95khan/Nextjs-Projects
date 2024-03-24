import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { name } = await req.json()
        const { userId } = auth()
        if (!userId) return NextResponse.json("Unauthorized", { status: 401 })

        if (!name) return NextResponse.json("Name is required", { status: 400 })
        const store = await db.store.create({
            data: {
                name,
                userId
            }
        })

        return NextResponse.json(store)

    } catch (error) {
        console.log('STORE POST', error)
        return NextResponse.json("Store POST Error API: ", { status: 500 })
    }


}