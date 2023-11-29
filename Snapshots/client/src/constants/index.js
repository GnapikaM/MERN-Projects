import { DIY, pottery, recipe } from "../assets/images";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact Us" },
  { href: "/all-posts", label: "All Posts" },
  { href: "/new-post", label: "New Post" },
];

export const categoryOptions = [
  { value: "all", label: "All" },
  { value: "popular", label: "Popular" },
  { value: "recent", label: "Recent" }
]

export const categories = [
  {
    imageSrc: recipe,
    imageWidth: "70",
    imageWidthsm: "50",
    imageAlt: "recipe.png",
    title: "Recipe",
    desc: "Explore our community's diverse recipes. From savory meals to sweet treats, find something for every food enthusiast to enjoy and share.",
    descsm: "Explore diverse shared recipes.",
  },
  {
    imageSrc: DIY,
    imageWidth: "70",
    imageWidthsm: "50",
    imageAlt: "DIY.png",
    title: "DIY",
    desc: "Explore creative DIY projects, from home decor to handmade gifts. Unleash your crafty side, bring ideas to life, and innovate.",
    descsm: "Explore DIY creativity at home.",
  },
  {
    imageSrc: DIY,
    imageWidth: "70",
    imageWidthsm: "50",
    imageAlt: "DIY.png",
    title: "ART",
    desc: "Art tells stories, evokes feelings, connects people, and sparks creativity. It's diverse, emotional, and uniquely human expression in various mediums.",
    descsm: "Explore DIY creativity at home.",
  },
  {
    imageSrc: pottery,
    imageWidth: "65",
    imageWidthsm: "50",
    imageAlt: "pottery.png",
    title: "Pottery",
    desc: "Immerse yourself in the art of pottery. Explore unique and handcrafted pottery items created by talented artisans in our community.",
    descsm: "Explore handcrafted pottery art.",
  },
];
