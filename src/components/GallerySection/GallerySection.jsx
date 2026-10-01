import GalleryGrid from "@components/GalleryGrid";
import SectionHeading from "@components/SectionHeading";
import useAsync from "@hooks/useAsync";
import { getMedia } from "@services/mediaService";

function GallerySection() {
  // Same request as the sidebar widget, so both share one response.
  const { data, isLoading, error } = useAsync(() => getMedia({ type: "screenshot", limit: 6 }), []);
  const screenshots = data?.data ?? [];

  if (error || (!isLoading && !screenshots.length)) {
    return null;
  }

  return (
    <section className="mb-5">
      <SectionHeading highlight="Latest">Pictures</SectionHeading>
      <GalleryGrid items={screenshots} isLoading={isLoading} count={6} span={4} gutter="g-3" />
    </section>
  );
}

export default GallerySection;
