import Layout from "@components/Layout";
import { APP_NAME } from "@constants/app";

import "./HomePage.css";

function HomePage() {
  return (
    <Layout>
      <h1 className="home-page__title">{APP_NAME}</h1>
    </Layout>
  );
}

export default HomePage;
