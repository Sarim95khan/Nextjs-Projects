'use client'
import { Modal } from "@/components/ui/modal";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading: boolean
}

export const AlertModal: React.FC<AlertModalProps> = ({ isOpen, onClose, onConfirm, isLoading }) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null;
    return (
        <Modal
            title="Are you sure"
            description="This action cannot be undone"
            isOpen={isOpen} onClose={onClose} >
            <div className="pt-6 space-x-4 w-full flex items-start justify-end">
                <Button disabled={isLoading} variant='outline' onClick={onClose}>
                    Cancel
                </Button>
                <Button disabled={isLoading} variant='destructive' onClick={onConfirm}>
                    Continue
                </Button>
            </div>
        </Modal>
    )
}