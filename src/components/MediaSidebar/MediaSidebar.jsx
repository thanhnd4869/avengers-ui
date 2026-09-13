import { Link } from "react-router";

import Icon from "@components/Icon";
import useAsync from "@hooks/useAsync";
import { PATHS } from "@routes/paths";
import { getHomeMedia } from "@services/homeMediaService";

import "./MediaSidebar.css";

const DEFAULT_SOCIALS = [
  "twitch",
  "instagram",
  "facebook",
  "google",
  "youtube",
  "twitter",
  "instagram",
  "rss",
].map((name, index) => ({ name, label: name, url: "#", id: `${name}-${index}` }));

const DEFAULT_VIDEO = {
  url: "https://www.youtube.com/watch?v=vXy8UBazlO8",
  image: { url: "https://img.youtube.com/vi/vXy8UBazlO8/maxresdefault.jpg", alt: "Latest video" },
};

function MediaSidebar({ showScreenshots = true }) {
  const { data, error } = useAsync(() => getHomeMedia(), []);
  const media = error ? null : data?.data;
  const socialLinks = media?.socialLinks?.length === 8 ? media.socialLinks : DEFAULT_SOCIALS;
  const latestVideo = media?.latestVideo ?? DEFAULT_VIDEO;

  return (
    <aside className="media-sidebar">
      <form className="media-sidebar__search" action={PATHS.BLOG}>
        <label className="visually-hidden" htmlFor="home-search">
          Search
        </label>
        <input id="home-search" name="q" type="search" placeholder="Search..." />
        <button type="submit" aria-label="Submit search">
          <Icon name="search" />
        </button>
      </form>

      {socialLinks.length ? (
        <section className="media-widget">
          <h3 className="media-widget__title">We Are Social</h3>
          <div className="media-widget__socials">
            {socialLinks.map((social) => (
              <a key={social.id ?? social.name} href={social.url} aria-label={social.label}>
                <Icon name={social.name} size={18} />
              </a>
            ))}
          </div>
        </section>
      ) : null}

      {latestVideo ? (
        <section className="media-widget">
          <h3 className="media-widget__title">Latest Video</h3>
          <a className="media-widget__video sf-media sf-media-zoom" href={latestVideo.url}>
            <img src={latestVideo.image.url} alt={latestVideo.image.alt} loading="lazy" />
            <span className="media-widget__play" aria-hidden="true" />
          </a>
        </section>
      ) : null}

      {showScreenshots && media?.screenshots?.length ? (
        <section className="media-widget">
          <h3 className="media-widget__title">Latest Screenshots</h3>
          <div className="media-widget__gallery">
            {media.screenshots.slice(0, 6).map((screenshot) => (
              <Link
                key={screenshot.id}
                to={screenshot.linkUrl ?? PATHS.GALLERY}
                className="sf-media sf-media-zoom"
              >
                <img src={screenshot.image.url} alt={screenshot.image.alt} loading="lazy" />
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </aside>
  );
}

export default MediaSidebar;
