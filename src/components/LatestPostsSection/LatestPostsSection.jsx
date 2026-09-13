import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Placeholder from "react-bootstrap/Placeholder";
import Row from "react-bootstrap/Row";
import { Link } from "react-router";

import MediaSidebar from "@components/MediaSidebar";
import SectionHeading from "@components/SectionHeading";
import useAsync from "@hooks/useAsync";
import { buildPath, PATHS } from "@routes/paths";
import { getPosts } from "@services/postService";
import { formatDate } from "@utils/format";

import "./LatestPostsSection.css";

function LatestPost({ post }) {
  const href = buildPath(PATHS.POST, { slug: post.slug });

  return (
    <article className="latest-post">
      <Link className="latest-post__media sf-media sf-media-zoom" to={href}>
        <img src={post.image.url} alt={post.image.alt} loading="lazy" />
        <span className="latest-post__comments">{post.commentCount}</span>
      </Link>
      <h3 className="latest-post__title">
        <Link to={href}>{post.title}</Link>
      </h3>
      <p className="latest-post__meta">
        <span className="latest-post__avatar">F</span>
        <span>
          by <strong>Fella</strong> in{" "}
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </span>
      </p>
      <p className="latest-post__excerpt">{post.excerpt}</p>
      <Link className="latest-post__read-more" to={href}>
        Read More
      </Link>
    </article>
  );
}

function LatestPostsSection() {
  const posts = useAsync(() => getPosts({ limit: 2 }), []);

  return (
    <section className="latest-posts-section">
      <Container>
        <Row className="g-5">
          <Col lg={8}>
            <SectionHeading highlight="Latest">Posts</SectionHeading>
            <Row className="g-4">
              {posts.isLoading
                ? Array.from({ length: 2 }, (_, index) => (
                    <Col key={index} md={6}>
                      <Placeholder as="div" animation="glow">
                        <Placeholder xs={12} className="latest-posts-section__placeholder" />
                        <Placeholder xs={10} className="mt-4" />
                        <Placeholder xs={7} />
                      </Placeholder>
                    </Col>
                  ))
                : posts.data?.data.map((post) => (
                    <Col key={post.id} md={6}>
                      <LatestPost post={post} />
                    </Col>
                  ))}
            </Row>
          </Col>
          <Col lg={4}>
            <MediaSidebar showScreenshots={false} />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default LatestPostsSection;
