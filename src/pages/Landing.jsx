// src/pages/Landing.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const cards = [
    {
        title: "VIEW TRAILER",
        subtitle: "Watch the thrilling trailer.",
        image: "/images/trailer.jpg",
        link: "/trailer",
        highlight: false
    },
    {
        title: "CONFIGURE THE MOTO",
        subtitle: "Start your customization here.",
        image: "/images/moto.jpg",
        link: "/configurator",
        highlight: true
    },
    {
        title: "VISIT BRAND",
        subtitle: "Explore the official website.",
        image: "/images/brand.jpg",
        link: "/brand",
        highlight: false
    },
    {
        title: "VIEW GALLERY",
        subtitle: "See stunning photos and videos.",
        image: "/images/gallery.jpg",
        link: "/gallery",
        highlight: false
    }
];

export default function Landing() {
    return (
        <div className="min-h-screen bg-gray-950 text-white font-sans flex flex-col">
            {/* Header */}
            <header className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-10">
                <div className="text-xl font-bold">PROJECT: MOTO</div>
                <div className="flex space-x-6">
                    <Link to="/about" className="hover:text-gray-400 transition-colors">
                        ABOUT
                    </Link>
                    <Link to="/contact" className="hover:text-gray-400 transition-colors">
                        CONTACT
                    </Link>
                </div>
            </header>

            {/* Main Content with Asymmetrical Grid */}
            <main className="flex-grow flex items-center justify-center p-8">
                <div className="grid grid-cols-4 grid-rows-2 gap-8 max-w-7xl w-full h-[600px]">
                    {cards.map((card, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.3 }}
                            className={`relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer
                                ${card.highlight ? "col-span-2 row-span-2" : "col-span-2"}`}
                        >
                            <Link to={card.link} className="absolute inset-0 z-10">
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 transition-colors duration-300 group-hover:bg-opacity-60 flex flex-col justify-end p-6">
                                    <h2 className="text-3xl font-extrabold mb-1">
                                        {card.title}
                                    </h2>
                                    <p className="text-gray-300">{card.subtitle}</p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="absolute bottom-0 left-0 right-0 p-4 text-center text-gray-500 text-sm">
                <p>
                     © 2025 | Made with
                    <span className="text-red-500"> ♥ </span>
                    in ...
                </p>
            </footer>
        </div>
    );
}