'use client'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
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

import { Store } from "@prisma/client";
import Heading from "@/components/ui/heading"
import { Trash } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { AlertModal } from "@/components/modals/alert-modal"
import { ApiAlert } from "@/components/ui/api-alert"
import useOrigin from "@/hooks/use-origin"



interface SettingFormProps {
    initialData: Store
}
const formSchema = z.object({
    name: z.string().min(2)
})

const SettingForm: React.FC<SettingFormProps> = ({ initialData }) => {
    const [open, setOpen] = useState(false)

    const params = useParams()
    const router = useRouter()
    const origin = useOrigin()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    })

    const { isSubmitting, isValid } = form.formState;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log(values)
            await axios.patch(`/api/stores/${params.storeId}`, values)
            router.refresh()
            toast.success("Store updated successfully")
        } catch (error) {
            toast.error("Make sure you remove all product and categories first")
            console.log('Delete API', error)
        }
    }

    const onDelete = async () => {
        try {
            await axios.delete(`/api/stores/${params.storeId}`)
            router.refresh()
            toast.success("Store deleted successfully")
        } catch (error) {
            console.log(error)
            toast.error("Error in deleting")
        } finally {
            setOpen(false)
        }
    }

    return (<>
        <AlertModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={onDelete}
            isLoading={isSubmitting || !isValid}
        />

        <div className="flex items-center justify-between">
            <Heading title="Store Settings" description="Manage store preferences" />
            <Button variant='destructive' size='icon' onClick={() => setOpen(true)} >
                <Trash className="h-4 w-4" />
            </Button>

        </div>


        <Separator />

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-3 space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={isSubmitting} placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button disabled={isSubmitting || !isValid} type="submit">Save Changes</Button>
            </form>
        </Form>
        <ApiAlert title='NEXT_PUBLIC_API_URL' description={`${origin}/api/${params.storeId}`} variant='public' />
    </>
    );
}

export default SettingForm;