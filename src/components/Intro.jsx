import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import gsap from "gsap";
import "./Intro.css";

export default function Intro({ onComplete }) {
  const introRef = useRef(null);
  const pathRef = useRef(null);

  const [pathData, setPathData] = useState("");
  const [viewBox, setViewBox] = useState("0 0 600 400");

  // Load the SVG signature
  useEffect(() => {
    fetch("/assets/signature.svg")
      .then((response) => response.text())
      .then((svgText) => {
        const parser = new DOMParser();

        const svgDocument = parser.parseFromString(
          svgText,
          "image/svg+xml"
        );

        const svg = svgDocument.querySelector("svg");
        const path = svgDocument.querySelector("path");

        if (svg && path) {
          setPathData(path.getAttribute("d"));
          setViewBox(svg.getAttribute("viewBox"));
        }
      })
      .catch((error) => {
        console.error("Failed to load signature:", error);
      });
  }, []);

  // Animate the signature
  useLayoutEffect(() => {
    if (!pathData || !pathRef.current || !introRef.current) {
      return;
    }

    const path = pathRef.current;
    const intro = introRef.current;
    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transformOrigin: "center center",
    });

    gsap.set(intro, {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    });

    const timeline = gsap.timeline({
      onComplete,
    });

    timeline
      // Signature draws
      .to(path, {
        strokeDashoffset: 0,
        duration: 4,
        ease: "power2.inOut",
      })

      // Small pause
      .to({}, {
        duration: 0.7,
      })

      // Signature dissolves
      .to(path, {
        opacity: 0,
        scale: 1.08,
        filter: "blur(12px)",
        duration: 1.2,
        ease: "power2.in",
      }, "+=0.2")

      // Intro screen disappears
      .to(intro, {
        opacity: 0,
        scale: 1.15,
        filter: "blur(20px)",
        duration: 1.1,
        ease: "power3.inOut",
      }, "-=0.65");

    return () => {
      timeline.kill();
    };
  }, [pathData, onComplete]);

  return (
    <div ref={introRef} className="intro">
      {pathData && (
        <svg viewBox={viewBox}>
          <path
            ref={pathRef}
            className="signature-path"
            d={pathData}
            fill="none"
            stroke="#73e4ff"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}