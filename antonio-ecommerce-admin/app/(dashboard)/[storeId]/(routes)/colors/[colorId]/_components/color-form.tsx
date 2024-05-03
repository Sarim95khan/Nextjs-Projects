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

import { Color, Size } from "@prisma/client";
import Heading from "@/components/ui/heading"
import { Trash } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { AlertModal } from "@/components/modals/alert-modal"
import useOrigin from "@/hooks/use-origin"



const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(4).max(9).regex(/^#/, {
        message: "Must be a valid hex value",
    }),
})


interface ColorFormProps {
    initialData: Color | null
}

type ColorFormValues = z.infer<typeof formSchema>

const ColorForm: React.FC<ColorFormProps> = ({ initialData }) => {
    const title = initialData ? 'Edit Color' : 'Create Color'
    const description = initialData ? 'Edit a Color' : 'Create a new Color'
    const toastMessage = initialData ? 'Color updated' : 'Color created'
    const action = initialData ? 'Save changes' : 'Create'

    const [open, setOpen] = useState(false)

    const params = useParams()
    const router = useRouter()
    const origin = useOrigin()

    const form = useForm<ColorFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            value: ''
        }
    });

    const { isSubmitting, isValid } = form.formState;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log(values)
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, values);
            } else {
                await axios.post(`/api/${params.storeId}/colors`, values);
            }
            toast.success(toastMessage)
            router.push(`/${params.storeId}/colors`);
            router.refresh()
            toast.success("Color updated successfully")
        } catch (error) {
            toast.error("Make sure you remove all product and categories first")
            console.log('Delete API', error)
        }
    }

    const onDelete = async () => {
        try {
            await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`)
            router.refresh()
            router.push(`/${params.storeId}/colors`);
            toast.success("Color deleted successfully")
        } catch (error) {
            console.log(error)
            toast.error("Make sure your remove all categories")
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
            <Heading title={title} description={description} />
            {initialData &&
                <Button variant='destructive' size='icon' onClick={() => setOpen(true)} >
                    <Trash className="h-4 w-4" />
                </Button>
            }
        </div>

        <Separator />

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-3 gap-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={isSubmitting} placeholder="Name  " {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="value"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Hex Value</FormLabel>
                                <FormControl>
                                    <div className="flex items-center gap-x-4">
                                        <Input disabled={isSubmitting} placeholder="Value  " {...field} />
                                        <div
                                            className="border p-4 rounded-full ml-auto"
                                            style={{ backgroundColor: field.value }}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button disabled={isSubmitting} type="submit">{action}</Button>
            </form>
        </Form>
    </>
    );
}

export default ColorForm;

