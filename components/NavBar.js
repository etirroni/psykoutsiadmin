import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
    const inActiveLink = "flex gap-1 mb-4 p-4 hover:scale-110 hover:rotate-6 ease-in duration-100"
    const activeLink = inActiveLink+' underline underline-offset-8 ';
    const router = useRouter();
    return(
        <aside className="text-themeYellow p-6 flex justify-between ">
            <a className="flex items-center  cursor-pointer mx-6 text-xl">   
                Psykoterapiapalvelu Psykoutsi 
            </a>
            <nav className="flex flex-row gap-4 mx-6 p-2">
                <Link href={'/'} className={router.pathname==('/') ? activeLink : inActiveLink}>Etusivu</Link>
                <Link href={'/asiakkaat'} className={router.pathname.includes('/asiakkaat') ? activeLink : inActiveLink}>Asiakkaat</Link>
                <Link href={'/palvelut'} className={router.pathname.includes('/palvelut') ? activeLink : inActiveLink}>Palvelut</Link>
                <Link href={'/yhteenvedot'} className={router.pathname.includes('/yhteenvedot') ? activeLink : inActiveLink}>Yhteenvedot</Link>
            </nav>
        </aside>
    )
}