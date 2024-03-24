'use client'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import axios from 'axios'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "@/components/ui/modal"
import toast from "react-hot-toast"

const formSchema = z.object({
    name: z.string().min(2),
})



export const StoreModal = () => {
    const storeModal = useStoreModal()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    const { isSubmitting, isValid } = form.formState;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await axios.post('/api/stores', values)
            window.location.assign(`/${response.data.id}`)
            console.log(response.data)
        } catch (error) {
            toast.error("Error creating store")
        }
    }
    return (
        <Modal title="Create Store"
            description="Add a new store to manage products and categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}>
            <div>
                <div className="space-y-4  py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Store</FormLabel>
                                        <FormControl>
                                            <Input disabled={isSubmitting} placeholder="ecommerce store .." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="space-x-4 pt-6 flex items-center justify-end">
                                <Button onClick={storeModal.onClose} variant='outline'>Cancel</Button>
                                <Button disabled={isSubmitting || !isValid} type="submit">Submit</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )

}