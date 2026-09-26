import { useState } from "react";
import Placeholder from "react-bootstrap/Placeholder";

import PostCard from "@components/PostCard";
import SectionHeading from "@components/SectionHeading";
import TabFilter from "@components/TabFilter";
import useAsync from "@hooks/useAsync";
import { PATHS } from "@routes/paths";
import { getPostCategories, getPosts } from "@services/postService";

const ALL = "all";
const LIMIT = 3;

function TabbedNewsSection() {
  const [category, setCategory] = useState(ALL);
  const categories = useAsync(() => getPostCategories(), []);
  // Refetching per tab keeps the list in sync with the server ordering instead
  // of filtering a cached page that may not hold enough posts per category.
  const posts = useAsync(
    () => getPosts({ limit: LIMIT, category: category === ALL ? undefined : category }),
    [category],
  );

  const tabs = [
    { value: ALL, label: "All" },
    ...(categories.data?.data ?? []).map((item) => ({ value: item.slug, label: item.name })),
  ];

  // "View all" follows the selected tab, so it opens the full list for the
  // category the visitor is already looking at.
  const viewAllTo = category === ALL ? PATHS.BLOG : `${PATHS.BLOG}?category=${category}`;

  return (
    <section className="mb-5">
      <SectionHeading highlight="Tabbed" viewAllTo={viewAllTo}>
        News
      </SectionHeading>

      <TabFilter items={tabs} value={category} onChange={setCategory} className="mb-4" />

      {posts.isLoading ? (
        <Placeholder as="div" animation="glow">
          <Placeholder className="d-block w-100 sf-ratio-16x9 rounded" />
          <Placeholder xs={8} className="mt-3" />
          <Placeholder xs={5} />
        </Placeholder>
      ) : (
        (posts.data?.data ?? []).map((post, index) => (
          <PostCard key={post.id} post={post} variant="list" featured={index === 0} />
        ))
      )}

      {!posts.isLoading && !posts.data?.data.length ? (
        <p className="mb-0">No posts in this category yet.</p>
      ) : null}
    </section>
  );
}

export default TabbedNewsSection;
