import React, { useRef, useEffect, useState, type HTMLAttributes } from "react";
import { select } from "d3-selection";
import { scaleLinear } from "d3-scale";

interface PolarChartProps extends HTMLAttributes<HTMLDivElement> {
  rho: number;
  theta: number;
  extraPoints?: { rho: number; theta: number }[];
  width?: number;
  height?: number;
}

export const PolarComplexChart: React.FC<PolarChartProps> = ({
  rho,
  theta,
  extraPoints,
  width = 400,
  height = 400,
  className,
  ...props
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: width, height: height });

  useEffect(() => {
    if (!wrapperRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;
      setSize({ width: rect.width, height: rect.height });
    });

    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    const { width, height } = size;
    const margin = 25;
    const svg = select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const allRhos = [rho, ...(extraPoints?.map((p) => p.rho) || [])];
    const maxRho = Math.max(1, ...allRhos);
    const radius = Math.min(width, height) / 2 - margin;
    const scale = scaleLinear().domain([0, maxRho]).range([0, radius]);

    // Default arrow
    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 0 12 12")
      .attr("refX", 11)
      .attr("refY", 6)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M 0 0 L 12 6 L 0 12 L 3 6 Z")
      .attr("fill", "#3f35e3");
    // Extra arrow
    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrowExtra")
      .attr("viewBox", "0 0 12 12")
      .attr("refX", 11)
      .attr("refY", 6)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M 0 0 L 12 6 L 0 12 L 3 6 Z")
      .attr("fill", "#ffa101");

    // Concentric circles
    const gridLevels = 5;
    for (let i = 1; i <= gridLevels; i++) {
      const scaledGrid = scale((i / gridLevels) * maxRho);
      g.append("circle")
        .attr("r", scaledGrid)
        .attr("fill", "none")
        .attr("stroke", "#e9eaed");
      g.append("text")
        .attr("x", 5)
        .attr("y", -scaledGrid + 12)
        .text(((i / gridLevels) * maxRho).toFixed(1))
        .attr("fill", "#626875")
        .attr("font-size", 10);
    }

    // Axis
    [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].forEach((angle) => {
      g.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", scale(maxRho) * Math.cos(angle))
        .attr("y2", scale(maxRho) * Math.sin(angle))
        .attr("stroke", "#e9eaed")
        .attr("stroke-width", 1);
    });

    const drawVector = (
      r: number,
      t: number,
      color: string,
      markerId: string
    ) => {
      const x = scale(r) * Math.cos(t);
      const y = -scale(r) * Math.sin(t);
      g.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", x)
        .attr("y2", y)
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .attr("marker-end", `url(#${markerId})`);
    };

    const threshold = maxRho * 0.05;
    if (rho > threshold) {
      drawVector(rho, theta, "#3f35e3", "arrow");
    } else {
      g.append("circle").attr("r", 2).attr("fill", "#3f35e3");
    }

    extraPoints?.forEach((p) => {
      if (p.rho > threshold) {
        drawVector(p.rho, p.theta, "#ffa101", "arrowExtra");
      } else {
        g.append("circle").attr("r", 2).attr("fill", "#ffa101");
      }
    });
  }, [rho, theta, extraPoints]);

  return (
    <div ref={wrapperRef} className={className} {...props}>
      <svg ref={svgRef} className="w-full h-full rounded-2xl shadow bg-white" />
    </div>
  );
};
