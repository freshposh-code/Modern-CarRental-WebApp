import { MdDashboard } from "react-icons/md";
import { PiCarFill } from "react-icons/pi";

export const navbar = [
    {
        name: 'Home'
    },
    {
        name: 'About Us'
    },
    {
        name: 'Service'
    },
    {
        name: 'Pricing'
    },
]

export const links = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon:  <MdDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    
    },
    {
      label: "Car vault",
      href: "/admin/carvault",
      icon:  <PiCarFill className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    
    },
  ];