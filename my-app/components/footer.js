import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
         <div>
          <div className="flex items-center space-x-3 mb-4">
            <Image
              src="/logo-vanexa.png"
              alt="Vanexa Logo"
              width={240}
              height={40}
            />
          </div>
          <p className="text-gray-400">
            Delivering innovative and reliable technology solutions 
            for modern businesses.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>News</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p>Email: info@vanexa.com</p>
          <p>Phone: +91 9108931479</p>
        </div>
      </div>

      <div className="text-center py-4 bg-gray-800 text-sm">
        © 2026 Vanexa. All rights reserved.
      </div>
    </footer>
  );
}