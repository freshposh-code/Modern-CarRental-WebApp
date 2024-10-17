import Image from "next/image";
import { IoCarSportSharp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";

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
      icon:  <IoCarSportSharp className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    
    },
  ];

  export const displaylogo = [ 
    {
      logo: '/honda.png'
    },
    {
        logo: '/Audi-Logo.png'
    },
    {
        logo: '/toyota.png'
    },
    {
        logo: '/bently1.png'
    },
    {
      logo: '/Hyundai-Logo.png'
    },
    {
      logo: '/lexus.png'
    },
  ]

  export const fuelCapacities = [
    { id: 1, capacity: "90L", value: "90" },
    { id: 2, capacity: "85L", value: "85" },
    { id: 3, capacity: "75L", value: "75" },
    { id: 4, capacity: "70L", value: "70" },
    { id: 5, capacity: "65L", value: "65" },
    { id: 6, capacity: "60L", value: "60" },
    { id: 7, capacity: "55L", value: "55" },
    { id: 8, capacity: "50L", value: "50" },
    { id: 9, capacity: "45L", value: "45" },
    { id: 10, capacity: "40L", value: "40" }
  ];

  export const transmission = [
    {
      id:1,
      tran: 'Manual',
      value: 'manual'
    },
    {
      id:2,
      tran: 'Automatic',
      value: 'Automatic'
    }
  ]

  export const passengers = [
    {
      id:1,
      number: '2',
      value: '2'
    },
    {
      id:2,
      number: '4',
      value: '4'
    }
  ]

  export const CarTypes = [
    { id: 1, type: "compact", value: "compact" },
    { id: 2, type: "convertible", value: "convertible" },
    { id: 3, type: "coupe", value: "coupe" },
    { id: 4, type: "crossover", value: "crossover" },
    { id: 5, type: "electric vehicle", value: "electricvehicle" },
    { id: 6, type: "hatchback", value: "hatchback" },
    { id: 7, type: "hybrid", value: "hybrid" },
    { id: 8, type: "minivan", value: "minivan" },
    { id: 9, type: "pickup", value: "pickup" },
    { id: 10, type: "sedan", value: "sedan" },
    { id: 11, type: "sport", value: "sport" },
    { id: 12, type: "sports car", value: "sportscar" },
    { id: 13, type: "suv", value: "suv" },
    { id: 14, type: "supercar", value: "supercar" },
    { id: 15, type: "truck", value: "truck" }
  ];
  

  export const categories = [
    { id: 1, brand: "Popular", value: "popular" }, 
    { id: 2, brand: "Best", value: "best" }, 
    { id: 3, brand: "Reserved", value: "reserved" }, 
  ];
  export const manufacturers = [
    { id: 1, brand: "Aston Martin", value: "astonmartin" },
    { id: 2, brand: "Audi", value: "audi" },
    { id: 3, brand: "Best", value: "best" }, // Now correctly placed alphabetically under "B"
    { id: 4, brand: "Bentley", value: "bentley" },
    { id: 5, brand: "BMW", value: "bmw" },
    { id: 6, brand: "Buick", value: "buick" },
    { id: 7, brand: "Cadillac", value: "cadillac" },
    { id: 8, brand: "Chevrolet", value: "chevrolet" },
    { id: 9, brand: "Chrysler", value: "chrysler" },
    { id: 10, brand: "Citroen", value: "citroen" },
    { id: 11, brand: "Dodge", value: "dodge" },
    { id: 12, brand: "Ferrari", value: "ferrari" },
    { id: 13, brand: "Fiat", value: "fiat" },
    { id: 14, brand: "Ford", value: "ford" },
    { id: 15, brand: "GMC", value: "gmc" },
    { id: 16, brand: "Honda", value: "honda" },
    { id: 17, brand: "Hyundai", value: "hyundai" },
    { id: 18, brand: "Infiniti", value: "infiniti" },
    { id: 19, brand: "Jaguar", value: "jaguar" },
    { id: 20, brand: "Jeep", value: "jeep" },
    { id: 21, brand: "Kia", value: "kia" },
    { id: 22, brand: "Lamborghini", value: "lamborghini" },
    { id: 23, brand: "Land Rover", value: "landrover" },
    { id: 24, brand: "Lexus", value: "lexus" },
    { id: 25, brand: "Lincoln", value: "lincoln" },
    { id: 26, brand: "Maserati", value: "maserati" },
    { id: 27, brand: "Mazda", value: "mazda" },
    { id: 28, brand: "McLaren", value: "mclaren" },
    { id: 29, brand: "Mercedes-Benz", value: "mercedesbenz" },
    { id: 30, brand: "MINI", value: "mini" },
    { id: 31, brand: "Mitsubishi", value: "mitsubishi" },
    { id: 32, brand: "Nissan", value: "nissan" },
    { id: 33, brand: "Popular", value: "popular" }, // Now correctly placed alphabetically under "P"
    { id: 34, brand: "Porsche", value: "porsche" },
    { id: 35, brand: "Ram", value: "ram" },
    { id: 36, brand: "Rolls-Royce", value: "rollsroyce" },
    { id: 37, brand: "Subaru", value: "subaru" },
    { id: 38, brand: "Tesla", value: "tesla" },
    { id: 39, brand: "Toyota", value: "toyota" },
    { id: 40, brand: "Volkswagen", value: "volkswagen" },
    { id: 41, brand: "Volvo", value: "volvo" }
  ];
  