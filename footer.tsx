import { Link } from "react-router-dom";
import { Github, Twitter, MessageCircle, Heart, Zap } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    anime: [
      { name: "Subbed Anime", href: "/subbed-anime" },
      { name: "Dubbed Anime", href: "/dubbed-anime" },
      { name: "Most Popular", href: "/most-popular" },
      { name: "Movies", href: "/movies" },
      { name: "TV Series", href: "/tv-series" },
    ],
    genres: [
      { name: "Action", href: "/genre/action" },
      { name: "Adventure", href: "/genre/adventure" },
      { name: "Comedy", href: "/genre/comedy" },
      { name: "Romance", href: "/genre/romance" },
      { name: "Fantasy", href: "/genre/fantasy" },
    ],
    community: [
      { name: "Discord", href: "#" },
      { name: "Reddit", href: "#" },
      { name: "News", href: "/news" },
      { name: "Community", href: "/community" },
      { name: "Contact", href: "/contact" },
    ]
  };

  return (
    <footer className="border-t border-border/40 bg-card/20 backdrop-blur">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg anime-gradient">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-anime-purple bg-clip-text text-transparent">
                HiAnime
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your ultimate destination for watching anime online. Stream thousands of episodes with high quality and no ads.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-secondary hover:bg-accent transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-secondary hover:bg-accent transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-secondary hover:bg-accent transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Anime Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Anime</h3>
            <ul className="space-y-2">
              {footerLinks.anime.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Genres */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Genres</h3>
            <ul className="space-y-2">
              {footerLinks.genres.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Community</h3>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/40 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © {currentYear} HiAnime. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 text-muted-foreground text-sm">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>for anime lovers worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
