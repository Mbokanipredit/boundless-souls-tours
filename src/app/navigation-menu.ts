export interface NavigationItem {
  label: string;
  link: string;
  subnav?: SubNavigationItem[];
  isSubnavActive?: boolean;
}

export interface SubNavigationItem {
  label: string;
  link?: string;
  isActive?: boolean;
  tabDetails?: TabDetail[];
  tabCard?: TabCard;
}

export interface TabDetail {
  title: string;
  list: { label: string; link: string }[];
}

export interface TabCard {
  imgSrc: string;
  heading: string;
  btnText: string;
}

export const navigationMenu: NavigationItem[] = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "Experiences",
    link: "/experiences",
    subnav: [
      {
        label: "Kinigi & Musanze",
        link: "/experiences#kinigi",
      },
      {
        label: "Akagera Safari",
        link: "/experiences#akagera",
      },
      {
        label: "Bigogwe Countryside",
        link: "/experiences#bigogwe",
      },
      {
        label: "Lakes & Rivers",
        link: "/experiences#lakes",
      },
      {
        label: "Kigali City Tour",
        link: "/experiences#kigali",
      },
    ],
  },
  {
    label: "Services",
    link: "/services",
    subnav: [
      {
        label: "Apartment Booking",
        link: "/services#apartments",
      },
      {
        label: "Private Chef",
        link: "/services#private-chef",
      },
      {
        label: "Private Driver",
        link: "/services#private-driver",
      },
      {
        label: "Pick-Up & Drop-Off",
        link: "/services#transfers",
      },
    ],
  },
  {
    label: "About Us",
    link: "/about",
  },
  {
    label: "Plan Your Trip",
    link: "/plan-trip",
  },
  {
    label: "Contact",
    link: "/contact",
  },
];
