import Image from "next/image";
import Link from "next/link";
import FooterNewsLetter from "./footer-newsletter";
import FooterCopyright from "./footer-copyright";

function FooterSection() {
  const companyLinks = [
    { label: "About Us", link: "/about" },
    { label: "Photo Gallery", link: "/gallery" },
    { label: "Experiences", link: "/experiences" },
    { label: "Services", link: "/services" },
    { label: "Plan Your Trip", link: "/plan-trip" },
  ];

  const supportLinks = [
    { label: "Contact", link: "#" },
    { label: "Legal Notice", link: "#" },
    { label: "Privacy Policy", link: "#" },
    { label: "Terms And Conditions", link: "#" },
    { label: "Sitemap", link: "#" },
  ];

  const otherServices = [
    { label: "Car Hire", link: "#" },
    { label: "Activity Finder", link: "#" },
    { label: "Tour List", link: "#" },
    { label: "Flight Finder", link: "#" },
    { label: "Cruise Ticket", link: "#" },
    { label: "Holiday Rental", link: "#" },
    { label: "Travel Agents", link: "#" },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300" id="footer">
      <FooterNewsLetter />
      
      <div className="container mx-auto px-4 max-w-7xl py-12 border-t border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Us */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Contact Us
            </h3>
            <div className="space-y-1">
              <p className="text-xs text-slate-400">Customer Support:</p>
              <Link href="tel:+250788000000" className="text-sm font-bold text-blue-400 hover:underline">
                +250 788 000 000
              </Link>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-400">Need live support?</p>
              <Link href="mailto:info@boundlesssoulstours.com" className="text-sm font-bold text-emerald-400 hover:underline">
                info@boundlesssoulstours.com
              </Link>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((company) => (
                <li key={company.label}>
                  <Link
                    href={company.link}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {company.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Support
            </h3>
            <ul className="space-y-2">
              {supportLinks.map((support) => (
                <li key={support.label}>
                  <Link
                    href={support.link}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {support.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Other Services */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Other Services
            </h3>
            <ul className="space-y-2">
              {otherServices.map((otherSer) => (
                <li key={otherSer.label}>
                  <Link
                    href={otherSer.link}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {otherSer.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <FooterCopyright />
    </footer>
  );
}

export default FooterSection;
