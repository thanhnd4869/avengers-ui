import GalleryGrid from "@components/GalleryGrid";
import SectionHeading from "@components/SectionHeading";
import useAsync from "@hooks/useAsync";
import { getHomeMedia } from "@services/homeMediaService";

function GallerySection() {
  const { data, isLoading, error } = useAsync(() => getHomeMedia(), []);
  const screenshots = data?.data?.screenshots ?? [];

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
