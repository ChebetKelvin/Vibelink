import { useState, useEffect, useRef } from "react";
import {
  Globe,
  GraduationCap,
  Trophy,
  Music,
  Heart,
  Sparkles,
  Tag,
} from "lucide-react";
import { Link } from "react-router"; // <-- use Link for SPA navigation

let categories = [
  {
    name: "Student & Campus",
    icon: Globe,
    image:
      "https://images.unsplash.com/photo-1685539144681-5b1386d5fd9b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U3R1ZGVudCUyMCUyNiUyMENhbXB1c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    color: "text-blue-500",
  },
  {
    name: "Education & Skills",
    icon: GraduationCap,
    image:
      "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=600&fit=crop",
    color: "text-green-500",
  },
  {
    name: "Adventure & Travel",
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1709403108621-66fe97132946?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    color: "text-red-500",
  },
  {
    name: "Sports",
    icon: Trophy,
    image:
      "https://img.freepik.com/premium-vector/colorful-illustration-various-sports-equipment-including-balls-bat-basket_1302918-107529.jpg?semt=ais_hybrid&w=740&q=80",
    color: "text-yellow-500",
  },
  {
    name: "Concerts & Nightlife",
    icon: Music,
    image:
      "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?q=80&w=600&fit=crop",
    color: "text-purple-500",
  },
  {
    name: "Wellness & Fitness",
    icon: Heart,
    image:
      "https://assets.dmagstatic.com/wp-content/uploads/media/1712175/exercisingmorningnight.jpg",
    color: "text-indigo-500",
  },
  {
    name: "Charity & Community",
    icon: Heart,
    image:
      "https://www.giveintl.org/wp-content/uploads/sites/515/2020/12/give-international-global-impact-charity-1440x900.jpg",
    color: "text-pink-500",
  },
  {
    name: "Offers & Discounts",
    icon: Tag,
    image:
      "https://img.freepik.com/premium-vector/last-minute-limited-offer-special-offer-sale-promo-button-logo-banner-last-day-last-hour-last-minute-offer_849186-271.jpg?semt=ais_hybrid&w=740&q=80",
    color: "text-orange-500",
  },
];

let slugify = (name) =>
  name
    .toLowerCase()
    .replace(/ & /g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/\s+/g, "-");

export default function CategorySection() {
  let [visibleCards, setVisibleCards] = useState({});
  let cardRefs = useRef([]);
  let [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => setTitleVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let index = entry.target.getAttribute("data-index");
            let delay = parseInt(index) * 150;
            setTimeout(() => {
              setVisibleCards((prev) => ({ ...prev, [index]: true }));
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-white" aria-labelledby="category-heading">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2
          id="category-heading"
          className={`text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 transition-opacity duration-500 transform ${
            titleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          Discover Events by Vibe
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-xl mx-auto">
          Choose a category below to instantly find the perfect experience near
          you.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {categories.map((category, i) => {
            let Icon = category.icon;
            let slug = slugify(category.name);

            return (
              <Link
                to={`/categories/${slug}`} // SPA-friendly navigation
                key={i}
                ref={(el) => (cardRefs.current[i] = el)}
                data-index={i}
                className={`group relative rounded-xl overflow-hidden shadow-lg transform transition-all duration-700 delay-100 hover:shadow-2xl ${
                  visibleCards[i]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
              >
                <div
                  className="relative w-full h-40 md:h-52 bg-cover bg-center transition-transform duration-500 transform group-hover:scale-[1.02]"
                  style={{ backgroundImage: `url(${category.image})` }}
                >
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-300"></div>
                </div>

                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4">
                  <Icon
                    className={`w-10 h-10 ${category.color} mb-3 transition-transform duration-300 group-hover:scale-110`}
                    strokeWidth={1.5}
                  />
                  <h3 className="text-white text-lg font-semibold tracking-wide text-shadow-md">
                    {category.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
