import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCartShopping,
  faComment,
  faMagnifyingGlass,
  faRss,
  faRightToBracket,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import {
  faDiscord,
  faFacebook,
  faGooglePlus,
  faInstagram,
  faTwitter,
  faSteam,
  faTwitch,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const ICONS = {
  search: faMagnifyingGlass,
  login: faRightToBracket,
  cart: faCartShopping,
  calendar: faCalendar,
  comment: faComment,
  star: faStar,
  facebook: faFacebook,
  google: faGooglePlus,
  instagram: faInstagram,
  twitter: faTwitter,
  rss: faRss,
  discord: faDiscord,
  twitch: faTwitch,
  youtube: faYoutube,
  steam: faSteam,
};

function Icon({ name, size = 16, className = "", title }) {
  const icon = ICONS[name];

  if (!icon) {
    return null;
  }

  return (
    <FontAwesomeIcon
      icon={icon}
      className={className}
      title={title}
      style={{ width: size, height: size }}
    />
  );
}

export default Icon;
