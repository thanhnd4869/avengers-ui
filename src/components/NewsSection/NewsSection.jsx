import Col from "react-bootstrap/Col";
import Placeholder from "react-bootstrap/Placeholder";
import Row from "react-bootstrap/Row";

import NewsBox from "@components/NewsBox";
import PostCard from "@components/PostCard";
import SectionHeading from "@components/SectionHeading";
import useAsync from "@hooks/useAsync";
import { getPosts } from "@services/postService";

import "./NewsSection.css";

const BOX_LIMIT = 5;
const GRID_LIMIT = 4;

function NewsSection() {
  const posts = useAsync(() => getPosts({ limit: BOX_LIMIT + GRID_LIMIT }), []);

  if (posts.error || (!posts.isLoading && !posts.data?.data.length)) {
    return null;
  }

  const items = posts.data?.data ?? [];
  const boxPosts = items.slice(0, BOX_LIMIT);
  const gridPosts = items.slice(BOX_LIMIT, BOX_LIMIT + GRID_LIMIT);

  return (
    <section className="news-section mb-5">
      <SectionHeading highlight="Latest">News</SectionHeading>

      {posts.isLoading ? (
        <>
          <Placeholder as="div" animation="glow" className="d-block">
            <Placeholder xs={12} className="news-section__placeholder" />
          </Placeholder>
          <Row className="g-4 mt-4">
            {Array.from({ length: GRID_LIMIT }, (_, index) => (
              <Col key={index} lg={3} sm={6}>
                <Placeholder as="div" animation="glow">
                  <Placeholder className="d-block w-100 sf-ratio-16x9 rounded" />
                  <Placeholder xs={9} className="mt-3" />
                  <Placeholder xs={6} />
                </Placeholder>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <>
          <NewsBox posts={boxPosts} />
          <Row className="g-4 mt-4">
            {gridPosts.map((post) => (
              <Col key={post.id} lg={3} sm={6}>
                <PostCard post={post} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </section>
  );
}

export default NewsSection;
