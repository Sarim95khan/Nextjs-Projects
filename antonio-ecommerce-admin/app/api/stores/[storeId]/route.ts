import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: { storeId: string } }) {
    try {
        const { name } = await request.json();
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        if (!name) {
            return new NextResponse("Name is required", { status: 400 })
        }

        const store = await prismadb.store.update({
            where: {
                id: params.storeId,
                userId
            },
            data: {
                name
            }
        })
        return NextResponse.json(store)
    } catch (error) {
        console.log("Setting Patch Error: ", error)
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { storeId: string } }) {
    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const store = await prismadb.store.delete({
            where: {
                id: params.storeId,
                userId
            },
        })

        return NextResponse.json(store)
    } catch (error) {
        console.log("Setting Patch Error: ", error)
    }
}