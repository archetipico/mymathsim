import React, { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface LatexRendererProps {
  latex: string;
  displayMode?: boolean;
}

const renderBlock = (
  latex: string,
  container: HTMLElement,
  displayMode: boolean = true
) => {
  try {
    katex.render(latex, container, {
      throwOnError: false,
      displayMode: displayMode,
    });
  } catch (err: any) {
    container.innerHTML = `<span style="color:red;">${err.message}</span>`;
  }
};

const LatexRenderer: React.FC<LatexRendererProps> = ({
  latex,
  displayMode = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && latex) {
      const blocks = latex
        .split(/\n\s*\n/)
        .map((b) => b.trim())
        .filter((b) => b);

      containerRef.current.innerHTML = "";

      blocks.forEach((block) => {
        const el = document.createElement("div");
        el.className =
          "text-[0.85rem] sm:text-base md:text-lg overflow-x-auto max-w-full";
        containerRef.current!.appendChild(el);

        const isMathBlock =
          block.startsWith("\\[") ||
          block.startsWith("\\(") ||
          block.startsWith("\\begin") ||
          block.includes("&=") ||
          block.includes("^") ||
          displayMode;

        const cleanBlock = block.replace(/^\\\[|\\\]$/g, "");

        renderBlock(cleanBlock, el, isMathBlock);

        const katexEl = el.querySelector(".katex") as HTMLElement | null;
        if (katexEl) {
          katexEl.style.fontSize = "1em";
        }
      });
    }
  }, [latex, displayMode]);

  return <div ref={containerRef} className="overflow-x-auto max-w-full" />;
};

export default LatexRenderer;
