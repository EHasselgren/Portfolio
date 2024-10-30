import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Animation } from "../shared/Animation";

interface SocialLink {
  icon: typeof faGithub | typeof faLinkedin | typeof faEnvelope;
  url: string;
  label: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: faGithub,
    url: "https://github.com/EHasselgren",
    label: "GitHub",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com/in/elias-hasselgren/",
    label: "LinkedIn",
  },
];

const SocialLinks = () => {
  const handleClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="flex gap-4 items-center justify-center w-full pt-3">
      {socialLinks.map((link, index) => (
        <Animation
          key={index}
          delay={0}
          oneByOne={{
            index,
            totalItems: socialLinks.length,
            delayBetween: 100,
          }}
        >
          <button
            onClick={() => handleClick(link.url)}
            className="animate-[spin_4s_linear_infinite] w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-cyan-600 hover:from-purple-500 hover:to-cyan-700 text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-md hover:shadow-lg"
            aria-label={link.label}
          >
            <FontAwesomeIcon icon={link.icon} className="h-5 w-5" />
          </button>
        </Animation>
      ))}
    </div>
  );
};

export default SocialLinks;
