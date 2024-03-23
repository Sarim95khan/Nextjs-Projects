'use client'

import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { useStoreModal } from "@/hooks/use-store-modal"
import { UserButton } from "@clerk/nextjs"
import { stat } from "fs"
import { useEffect } from "react"

function SetupPage() {
    const onOpen = useStoreModal((state) => state.onOpen)
    const isOpen = useStoreModal((state) => state.isOpen)

    useEffect(() => {
        if (!isOpen) {
            onOpen()
        }
    }, [isOpen, onOpen])
    return (
        <div className="p-2">
            Root Page
        </div>
    )
}

export default SetupPage