import { useState, useEffect } from "react";

export default function AutomaticBreadcrumbs() {
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  // Fungsi untuk mengambil path dan membuat breadcrumbs
  useEffect(() => {
    const getPathSegments = () => {
      // Ambil path dari URL saat ini (tanpa domain dan query string)
      const path = window.location.pathname;

      // Split path menjadi segmen-segmen
      const pathSegments = path.split("/").filter((segment) => segment !== ""); // Hapus elemen kosong

      // Buat array breadcrumbs dengan path yang relevan untuk setiap segmen
      const segments = pathSegments.map((segment, index) => {
        // Buat path untuk segmen ini
        const url = "/" + pathSegments.slice(0, index + 1).join("/");

        // Format segment menjadi teks yang lebih rapi
        const text = segment
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join("/ ");

        return { text, url };
      });

      setBreadcrumbs(segments);
    };

    getPathSegments();
  }, []);

  return (
    <nav className="flex items-center text-sm bg-gray-50 px-4 py-2 rounded-md">
      <a
        href="/"
        className="text-blue-600 hover:text-blue-800 flex items-center"
      >
        Beranda
      </a>

      {breadcrumbs.map((breadcrumb, index) => (
        <div key={index} className="flex items-center">
          {/* <ChevronRight size={16} className="mx-2 text-gray-400" /> */}
          {index === breadcrumbs.length - 1 ? (
            <span className="font-medium text-gray-700">{breadcrumb.text}</span>
          ) : (
            <a
              href={breadcrumb.url}
              className="text-blue-600 hover:text-blue-800"
            >
              {breadcrumb.text}
            </a>
          )}
        </div>
      ))}
    </nav>
  );
}
