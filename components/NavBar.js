import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
    const linkkiOFF = "flex gap-1 mb-4 p-4 hover:scale-110 hover:rotate-6 ease-in duration-100"
    const linkkiON = linkkiOFF+' underline underline-offset-8 ';
    const router = useRouter();
    const {data: session}=useSession();
    return(
        <aside className="text-themeYellow p-6 flex justify-between ">
            <div className="flex gap-6 mx-6">
                <a href="/" className="flex text-center items-center cursor-pointer text-2xl border-y-4 border-double border-themeYellow">   
                    Psykoterapiapalvelu Psykoutsi 
                </a>
                <nav className="flex justify-evenly items-center ">
                    <Link href={'/'} className={router.pathname==('/') ? linkkiON : linkkiOFF}>Etusivu</Link>
                    <Link href={'/asiakkaat'} className={router.pathname.includes('/asiakkaat') ? linkkiON : linkkiOFF }>Asiakkaat</Link>
                    <Link href={'/palvelut'} className={router.pathname.includes('/palvelut') ? linkkiON : linkkiOFF }>Palvelut</Link>
                    <Link href={'/ajanvaraus'} className={router.pathname.includes('/ajanvaraus') ? linkkiON : linkkiOFF  }>Ajan varaus</Link>
                    <Link href={'/yhteenvedot'} className={router.pathname.includes('/yhteenvedot') ? linkkiON : linkkiOFF  }>Laadi yhteenveto</Link>
                </nav>
            </div>
            <div className="flex items-center">
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <img className="rounded-full p-2" src={session?.user?.image}/>
                        <p className="text-sm">{session?.user?.name} <br/> {session?.user?.email}</p>
                    </div>
                    <div className="flex">
                    <button onClick={()=>signOut()} className="bg-themeSlate ml-auto outline p-2 rounded-md whitespace-nowrap hover:opacity-75">
                        Kirjaudu ulos  🔑
                    </button> 
                    </div>
                </div>
            </div>
                
           
        </aside>
    )
}