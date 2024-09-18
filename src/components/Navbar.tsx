import { navbar } from '@/utils/Data'
import Link from 'next/link'
import { MdAdminPanelSettings } from 'react-icons/md'

// THEME EXPORT
import { ModeToggle } from '@/Theme/ThemeButton'

export default function Navbar() {
    return (
        <section className='m-[1.2rem]'>
            <nav className='sm:flex hidden justify-between items-center'>
                <div className='flex items-center gap-2'>
                    <div className="border-4 border-blue-700 size-12 rounded-full" />
                    <h1 className='font-extrabold text-3xl'>Rivent</h1>
                </div>

                <div className='flex gap-14 items-center'>
                    {navbar.map((items) => (
                        <div key={items.name}>
                            <li className='font-bold text-lg cursor-pointer hover:border-b-[3px] border-blue-700 duration-200'>{items.name}</li>
                        </div>
                    ))}

                    <div className="flex gap-10 items-center">
                        <ModeToggle />

                        <span className='text-3xl cursor-pointer'><MdAdminPanelSettings /></span>
                    </div>


                    <Link href='/login'>
                        <button className='bg-black dark:bg-zinc-50 dark:text-black-100 text-white rounded-[33px] py-3 px-5 font-bold text-lg'>Get Started</button>
                    </Link>
                </div>
            </nav>
        </section>
    )
}
