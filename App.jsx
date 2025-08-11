import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { css, styled } from "@pandacss/dev";

const GlobalStyle = css({
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
    fontFamily:
      "sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue'",
  },
  "*, *::before, *::after": {
    boxSizing: "border-box",
  },
  a: {
    WebkitTapHighlightColor: "transparent",
  },
  html: {
    scrollBehavior: "smooth",
    scrollbarWidth: "thin",
    scrollbarColor: "transparent transparent",
  },
  body: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    overflow: "hidden",
  },
});

const Section = styled("section", {
  base: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexWrap: "wrap",
  },
});

const Item = styled("div", {
  base: {
    width: "10%",
    height: "10vh",
    flexGrow: 1,
    position: "relative",
    transformStyle: "preserve-3d",
    backgroundImage: "url('assets/z2.avif')",
    backgroundAttachment: "fixed",
    backgroundPosition: "top",
    backgroundSize: "cover",
    pointerEvents: "none",
    "&::before": {
      content: '""',
      position: "absolute",
      width: "100%",
      height: "100%",
      inset: 0,
      backgroundImage: "url('assets/z1.avif')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      transition: "transform 0.4s ease",
    },
    "&.flip::before": {
      transform: "perspective(1000px) rotateX(90deg) translateY(-50%)",
    },
  },
});

function App() {
  useEffect(() => {
    const onMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      const el = document.elementFromPoint(x, y);
      if (el?.classList?.contains("item")) {
        el.classList.add("flip");
      }
    };

    const onTouchStart = () => {
      const handleMove = (e) => {
        document.addEventListener("touchend", handleEnd);
        const { clientX: x, clientY: y } = e.touches[0];
        const el = document.elementFromPoint(x, y);
        if (el?.classList?.contains("item")) {
          el.classList.add("flip");
        }
      };
      const handleEnd = () => {
        document.removeEventListener("touchmove", handleMove);
        document.removeEventListener("touchend", handleEnd);
      };
      document.addEventListener("touchmove", handleMove);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("touchstart", onTouchStart);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("touchstart", onTouchStart);
    };
  }, []);

  return (
    <>
      <style>{GlobalStyle}</style>
      <Section>
        {Array.from({ length: 90 }).map((_, i) => (
          <Item key={i} className="item" />
        ))}
      </Section>
    </>
  );
}

const rootId = "root-react-panda";

if (!document.getElementById(rootId)) {
  const rootDiv = document.createElement("div");
  rootDiv.id = rootId;
  document.body.appendChild(rootDiv);
}

const root = createRoot(document.getElementById(rootId));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
