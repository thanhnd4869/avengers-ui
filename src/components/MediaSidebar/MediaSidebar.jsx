import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Placeholder from "react-bootstrap/Placeholder";

import GalleryGrid from "@components/GalleryGrid";
import Icon from "@components/Icon";
import PostCard from "@components/PostCard";
import ProductCard from "@components/ProductCard";
import Widget from "@components/Widget";
import useAsync from "@hooks/useAsync";
import { PATHS } from "@routes/paths";
import { getHomeMedia } from "@services/homeMediaService";
import { getPosts } from "@services/postService";
import { getProducts } from "@services/productService";

import "./MediaSidebar.css";

const RECENT_LIMIT = 3;
const POPULAR_LIMIT = 3;

/**
 * Sidebar that accompanies the home page content column.
 *
 * Every block is a `Widget`, so adding or reordering one is a matter of
 * composition rather than new styling.
 */
function MediaSidebar() {
  const media = useAsync(() => getHomeMedia(), []);
  const recentPosts = useAsync(() => getPosts({ limit: RECENT_LIMIT }), []);
  // The API sorts products by `-sales` or `-rating`. Using the rating here keeps
  // this widget from repeating the best sellers listed in the content column.
  const popularProducts = useAsync(
    () => getProducts({ sort: "-rating", limit: POPULAR_LIMIT }),
    [],
  );

  const content = media.error ? null : media.data?.data;
  const socialLinks = content?.socialLinks ?? [];
  const latestVideo = content?.latestVideo;
  const screenshots = content?.screenshots ?? [];
  const posts = recentPosts.error ? [] : (recentPosts.data?.data ?? []);
  const products = popularProducts.error ? [] : (popularProducts.data?.data ?? []);

  return (
    <aside className="media-sidebar d-grid gap-4">
      <Widget>
        <Form action={PATHS.BLOG}>
          <Form.Label htmlFor="home-search" className="visually-hidden">
            Search
          </Form.Label>
          <InputGroup>
            <Form.Control id="home-search" name="q" type="search" placeholder="Search..." />
            <Button type="submit" variant="primary" aria-label="Submit search">
              <Icon name="search" />
            </Button>
          </InputGroup>
        </Form>
      </Widget>

      {socialLinks.length ? (
        <Widget title="We Are Social" bodyClassName="p-0">
          <ul className="media-sidebar__socials list-unstyled mb-0">
            {socialLinks.map((social) => (
              <li key={social.id ?? social.name}>
                <a href={social.url} aria-label={social.label} data-social={social.name}>
                  <Icon name={social.name} size={18} />
                </a>
              </li>
            ))}
          </ul>
        </Widget>
      ) : null}

      {latestVideo ? (
        <Widget title="Latest Video">
          <a
            className="d-block sf-media sf-media-zoom sf-ratio-16x9 rounded position-relative"
            href={latestVideo.url}
          >
            <img src={latestVideo.image.url} alt={latestVideo.image.alt} loading="lazy" />
            <span className="media-sidebar__play" aria-hidden="true" />
          </a>
        </Widget>
      ) : null}

      {recentPosts.isLoading || posts.length ? (
        <Widget title={`Top ${RECENT_LIMIT} Recent`}>
          {recentPosts.isLoading ? (
            <Placeholder as="div" animation="glow">
              <Placeholder xs={12} />
              <Placeholder xs={8} />
            </Placeholder>
          ) : (
            posts.map((post) => <PostCard key={post.id} post={post} variant="compact" />)
          )}
        </Widget>
      ) : null}

      {screenshots.length ? (
        <Widget title="Latest Screenshots">
          <GalleryGrid items={screenshots} count={6} span={6} gutter="g-2" />
        </Widget>
      ) : null}

      {popularProducts.isLoading || products.length ? (
        <Widget title="Most Popular">
          {popularProducts.isLoading ? (
            <Placeholder as="div" animation="glow">
              <Placeholder xs={12} />
              <Placeholder xs={8} />
            </Placeholder>
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} variant="list" />
            ))
          )}
        </Widget>
      ) : null}
    </aside>
  );
}

export default MediaSidebar;
