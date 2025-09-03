import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";

// Type definitions
interface HoverImageListProps {
  items?: ListItem[];
}

interface ListItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  href?: string; // ✅ support link
}

interface MousePosition {
  x: number;
  y: number;
}

const HoverImageList: React.FC<HoverImageListProps> = ({ items }) => {
  const [hoveredItem, setHoveredItem] = useState<ListItem | null>(null);
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const listItems: ListItem[] = items || [
    {
      id: 1,
      title: "Website RT 14",
      subtitle: "Recap of documentation and real-time announcements",
      image: "/Project1.png",
      href: "https://rt14perumkorpri.vercel.app/",
    },
    {
      id: 2,
      title: "Website Posyandu RT 14",
      subtitle: "posyandu data recap and real-time announcements website",
      image: "/Project2.png",
      href: "https://posyanduperumkorpri.vercel.app/",
    },
    {
      id: 3,
      title: "Website Innovation Computer",
      subtitle: "Landing Page Innovation Computer",
      image: "/Project3.png",
      href: "https://incomp.vercel.app/",
    },
    {
      id: 4,
      title: "Website Zodiak",
      subtitle: "Find out your personality here (don't take it too seriously)",
      image: "/Project4.png",
      href: "https://andrejun1.github.io/Zodiak/",
    },
  ];

  // Clear timeout
  const clearHideTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Update mouse position
  const updateMousePosition = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: event.clientX,
          y: event.clientY,
        });
      }
    },
    []
  );

  const handleMouseEnter = useCallback(
    (item: ListItem, event: React.MouseEvent<HTMLDivElement>) => {
      clearHideTimeout();
      if (hoveredItem && hoveredItem.id !== item.id) {
        setIsVisible(false);
        setTimeout(() => {
          setHoveredItem(item);
          updateMousePosition(event);
          setIsVisible(true);
        }, 100);
      } else {
        setHoveredItem(item);
        updateMousePosition(event);
        setIsVisible(true);
      }
    },
    [hoveredItem, clearHideTimeout, updateMousePosition]
  );

  const handleMouseLeave = useCallback(() => {
    clearHideTimeout();
    setIsVisible(false);
    timeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
    }, 200);
  }, [clearHideTimeout]);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (hoveredItem && isVisible) {
        updateMousePosition(event);
      }
    },
    [hoveredItem, isVisible, updateMousePosition]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Floating image position
  const getImageStyle = () => {
    if (typeof window === "undefined") return {};

    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    let imageWidth = 320;
    let imageHeight = 240;
    let offsetX = 20;
    let offsetY = -150;

    if (isMobile) {
      imageWidth = 250;
      imageHeight = 187;
      offsetX = -imageWidth / 2;
      offsetY = -200;
    } else if (isTablet) {
      imageWidth = 280;
      imageHeight = 210;
      offsetX = 15;
      offsetY = -160;
    }

    let left = mousePosition.x + offsetX;
    let top = mousePosition.y + offsetY;

    if (left + imageWidth > window.innerWidth - 20) {
      left = mousePosition.x - imageWidth - Math.abs(offsetX);
    }
    if (top < 20) {
      top = mousePosition.y + 20;
    }

    return {
      left: `${Math.max(20, left)}px`,
      top: `${Math.max(20, top)}px`,
      width: `${imageWidth}px`,
      height: `${imageHeight}px`,
    };
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div
          ref={containerRef}
          className="space-y-0"
          onMouseMove={handleMouseMove}
        >
          {listItems.map((item, index) => (
            <div key={item.id}>
              {item.href ? (
                <Link
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  <div
                    className="group py-4 md:py-6 lg:py-8 transition-all duration-300 cursor-pointer"
                    onMouseEnter={(e) => handleMouseEnter(item, e)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 pr-4">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 border-gray-700">
                          {item.title}
                        </h2>
                        <p className="text-sm md:text-base border-gray-700">
                          {item.subtitle}
                        </p>
                      </div>
                      <div className="ml-4 md:ml-6 text-gray-600">
                        <svg
                          className="w-6 h-6 md:w-8 md:h-8 transform group-hover:translate-x-2 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div
                  className="group py-4 md:py-6 lg:py-8 transition-all duration-300 cursor-pointer"
                  onMouseEnter={(e) => handleMouseEnter(item, e)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-4">
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 border-gray-700">
                        {item.title}
                      </h2>
                      <p className="text-sm md:text-base border-gray-700">
                        {item.subtitle}
                      </p>
                    </div>
                    <div className="ml-4 md:ml-6 text-gray-600">
                      <svg
                        className="w-6 h-6 md:w-8 md:h-8 transform group-hover:translate-x-2 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {index < listItems.length - 1 && (
                <hr className="border-gray-700" />
              )}
            </div>
          ))}
        </div>

        {/* Floating preview */}
        {hoveredItem && (
          <div
            className="fixed pointer-events-none z-50 transition-opacity duration-200"
            style={{
              ...getImageStyle(),
              opacity: isVisible ? 1 : 0,
            }}
          >
            <div
              className={`transform transition-all duration-300 ease-out ${
                isVisible ? "scale-100 rotate-0" : "scale-75 rotate-3"
              }`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-black rounded-lg transform translate-x-1 translate-y-1 opacity-20"></div>
                <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-100">
                  <img
                    src={hoveredItem.image}
                    alt={hoveredItem.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 md:p-4">
                    <h3 className="text-white font-semibold text-sm md:text-base truncate">
                      {hoveredItem.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HoverImageList;
