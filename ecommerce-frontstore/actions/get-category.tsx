import { Category } from "@/types"

const URL = 'http://localhost:3000/api/1560b0fb-87ee-4452-ad37-0c73aa84bec9/categories'

const getCategory = async (): Promise<Category[]> => {
    const res = await fetch(URL)
    return res.json()
}

export default getCategory
