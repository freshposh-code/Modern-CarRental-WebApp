import { IoCarSportSharp } from "react-icons/io5";
import { IoBookSharp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { AiFillAliwangwang } from "react-icons/ai";
import { AiFillAlipayCircle } from "react-icons/ai";
import { AiFillAmazonCircle } from "react-icons/ai";
import { AiFillQuestionCircle } from "react-icons/ai";
import { RiMessage2Fill } from "react-icons/ri";
import { MdWork } from "react-icons/md";
import {  BsWalletFill } from "react-icons/bs";
import {  PiEngineFill } from "react-icons/pi";
import { GiOilPump } from "react-icons/gi";
import { GiAbstract002 } from "react-icons/gi";
import { SiTransmission } from "react-icons/si";
import { GiCarWheel } from "react-icons/gi";

export const navbar = [
    {
        name: 'Home',
        link: '/'
    },
    {
        name: 'About Us',
        link: '/aboutUs'
    },
    {
        name: 'Service',
        link: '/service'
    },
    {
        name: 'Pricing',
        link: '/pricing'
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
    {
      label: "Bookings",
      href: "/admin/bookings",
      icon:  <IoBookSharp className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    
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
    { id: 3, capacity: "80L", value: "80" },
    { id: 4, capacity: "75L", value: "75" },
    { id: 5, capacity: "70L", value: "70" },
    { id: 6, capacity: "65L", value: "65" },
    { id: 7, capacity: "60L", value: "60" },
    { id: 8, capacity: "55L", value: "55" },
    { id: 9, capacity: "50L", value: "50" },
    { id: 10, capacity: "45L", value: "45" },
    { id: 11, capacity: "40L", value: "40" }
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
    { id: 9, type: "pickup truck", value: "pickup truck" },
    { id: 10, type: "sedan", value: "sedan" },
    { id: 11, type: "sport", value: "sport" },
    { id: 12, type: "suv", value: "suv" },
    { id: 13, type: "supercar", value: "supercar" },
    { id: 14, type: "Luxury Sedan", value: "Luxury Sedan" },
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
  
  export const journey = [
    {
      img: '/porsche1.jpeg',
      date: 'June 8, 2024',
      desc: 'Unveiling the Latest Automotive Marvel',
      text: 'Enjoy exclusive deals at the best price',
      link: 'Learn more',
    },

    {
      img: '/porsche2.jpeg',
      date: 'August 16, 2024',
      desc: 'A Symphony of Style and innovation',
      text: 'Enjoy exclusive deals at the best price',
      link: 'Learn more',
    },
    
    {
      img: '/porsche3.jpeg',
      date: 'May 30, 2024',
      desc: 'The Art and Science of Contemporary',
      text: 'Enjoy exclusive deals at the best price',
      link: 'Learn more',
    },
  ]

  export const footerLinks = [
    {
      link: 'Funds & Benefit',
    },
    {
      link: 'Digital Transformation',
    },
    {
      link: 'Life at Fintech',
    },
    {
      link: 'Web Development',
    },
    {
      link: 'Values',
    },
    {
      link: 'Smart Contract',
    },
    {
      link: 'Design',
    },
    {
      link: 'Branding',
    },
    {
      link: 'Growth',
    },
    {
      link: 'Apps',
    },
    {
      link: 'Android',
    },
    {
      link: 'Web3',
    },
    {
      link: 'IOS',
    },
    {
      link: 'Defi',
    },
  ]

  export const footerIcons = [
    {
      icon: <AiFillAliwangwang />      
    },
    {
      icon: <AiFillAlipayCircle />      
    },
    {
      icon: <AiFillAmazonCircle />      
    },
    {
      icon: <AiFillQuestionCircle />      
    },
  ]

  export const abousUs = [
    {
      icon: <IoCarSportSharp />,
      head: 'ALL BRANDS',
      desc: `These brands collectively emphasize free support, dealerships to provide easy access to genuine parts, and affordable options`,
    },
    {
      icon: <RiMessage2Fill />,
      head: 'FREE SUPPORT',
      desc:`This brand offer extensive warranties, complimentary maintenance services, and 24/7 roadside assistance for added peace of mind.`,
    },
    {
      icon: <MdWork />,
      head: 'DEALERSHIP',
      desc: `Enjoy wide dealership networks offering easy access to certified vehicles, genuine parts, and professional service centers.`
    },
    {
      icon: <BsWalletFill />,
      head: 'AFFORDABLE',
      desc: `With a range of models across budgets, these brands provide vehicles that balance cost, efficiency, and performance for everyone.`,
    },
  ]

  export const projects = [
    {
      icon: <GiOilPump />,
      title: "Oil changes",
      description: `This service is essential for maintaining the engine's performance and longevity, as engine oil lubricates moving parts, and prevents overheating by dissipating heat. Over time, oil degrades and collects debris, reducing its effectiveness.`,
    },
    {
      icon: <IoCarSportSharp />,
      title: "Wash & Clean",
      description: `A comprehensive car cleaning service enhances appearance and protects the vehicle, removing dirt, grime, and contaminants using specialized cleaners, providing a protective layer to the paintwork, enhancing the car's shine.`,
    },
    {
      icon: <GiAbstract002 />,
      title: "ABS Breaks",
      description: `Anti-lock braking system (ABS) maintenance focuses on safety by preventing wheel lock during hard braking. These services aim to keep your vehicle in top condition, ensuring safety, reliability, and longevity.`,
    },
    {
      icon: <SiTransmission />,
      title: "Transmission",
      description: `Transmission maintenance focusing on ensuring smooth gear shifting and preventing costly repairs, replacing degraded fluid to ensure proper lubrication, removing debris and contaminants from the transmission system.`,
    },
    {
      icon: <GiCarWheel />,
      title: "Tires & Wheels",
      description: `This service includes inspection, rotation, alignment, and replacement of tires and wheels. Proper tire and wheel maintenance ensures safety, improves handling, and extends the lifespan of tires.`,
    },
    {
      icon: <PiEngineFill />,
      title: "Engine Tuning",
      description: `Engine tuning optimizes performance by adjusting the engine's parameters. Reprogramming the car's electronic control unit for better fuel efficiency and performance, ensures efficient ignition.`,
    },
  ];

  export const packages = [
    {
      title: 'Starter',
      price: '$25',
      installations: [
        {pkg: 'Wiper Blade Installation'},
        {pkg: 'Check Engine Light'},
        {pkg: 'Air Filter Replacement'},
        {pkg: 'Starting and charging'},
        {pkg: 'Engine Flash service'},
        {pkg: 'Transmission Fluid Service'},
        {pkg: 'Brake Fluid Exchange'},
        {pkg: 'Cool Oil Drain amd Fill'},
        {pkg: 'Headlight Restoration'},
        {pkg: 'Small Bulb Installation'},
        {pkg: 'cabin Air Filter Install'},
        {pkg: 'Spring Maintenance'},
      ],
    },
    {
      title: 'Advance',
      price: '$50',
      installations: [
        {pkg: 'Spring Maintenance'},
        {pkg: 'Summer Maintenance'},
        {pkg: 'Winter Maintenance'},
        {pkg: 'Smoke test Diagnostics Service'},
        {pkg: 'A/C System Leak Evaluation'},
        {pkg: 'Steering and Suspension System Evaluation'},
        {pkg: 'Cranks No Start Diagnostics Service'},
        {pkg: '2nd A/C System Repair Evaluation'},
        {pkg: 'Small Bulb Installation'},
        {pkg: 'Cranks No Start Diagnostics Service'},
        {pkg: 'Engine Cooling System Check'},
        {pkg: 'Headlight restoration'},
      ],
    },
    {
      title: 'Premium',
      price: '$100',
      installations: [
        {pkg: 'Spring Maintenance'},
        {pkg: 'Summer Maintenance'},
        {pkg: 'Winter Maintenance'},
        {pkg: 'Smoke test Diagnostics Service'},
        {pkg: 'A/C System Leak Evaluation'},
        {pkg: 'Steering and Suspension System Evaluation'},
        {pkg: 'Cranks No Start Diagnostics Service'},
        {pkg: '2nd A/C System Repair Evaluation'},
        {pkg: 'Small Bulb Installation'},
        {pkg: 'Cranks No Start Diagnostics Service'},
        {pkg: 'Engine Cooling System Check'},
        {pkg: 'Headlight restoration'},
      ],
    },
  ]

  export const period = [
    {
      select: 'Select your type',
      booking: 'Location',
    },
    {
      select: 'Select your type',
      booking: 'Date',
    },
    {
      select: 'Select your type',
      booking: 'Time',
    },
  ]

  export const periodII = [
    {
      select: 'Select your type',
      booking: 'Location',
    },
    {
      select: 'Select your type',
      booking: 'Date',
    },
    {
      select: 'Select your type',
      booking: 'Time',
    },
  ]