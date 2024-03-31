import { UserButton, auth } from "@clerk/nextjs";
import MainNav from "@/components/main-nav";
import { redirect, useParams, usePathname } from "next/navigation";
import StoreSwitcher from "./store-switcher";
import prismadb from "@/lib/prismadb";

const Navbar = async () => {
    const { userId } = auth()
    if (!userId) redirect('/sign-in')

    const stores = await prismadb.store.findMany({
        where: {
            userId
        }
    })


    return (<div className="border-b">
        <div className="flex items-center h-16 px-4">
            <StoreSwitcher items={stores} />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center">
                <UserButton afterSignOutUrl="/" />
            </div>

        </div>
    </div>);
}

export default Navbar;