import "./Layout.css";

function Layout({ children }) {
  return (
    <div className="layout">
      <main className="layout__content">{children}</main>
    </div>
  );
}

export default Layout;
