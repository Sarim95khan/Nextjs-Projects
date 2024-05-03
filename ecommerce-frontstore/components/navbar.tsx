import Link from "next/link";
import Cont from "./ui/container";
import MainNav from "./main-nav";
import getCategory from "@/actions/get-category";
import NavbarAction from "./navbar-actions";

export const revalidate = 0

const Navbar = async () => {
    const categories = await getCategory()
    console.log(categories)
    return (
        <div className="border-b">
            <Cont>
                <div className="relative flex h-16 items-center px-4 sm:px-6 lg:px-8">
                    <Link href='/' className="ml-4 lg:ml-0 flex gap-x-2">
                        <p className="font-bold text-xl">
                            Store
                        </p>
                    </Link>
                    <MainNav data={categories} />
                    <NavbarAction />
                </div>
            </Cont>
        </div>
    );
}

export default Navbar;