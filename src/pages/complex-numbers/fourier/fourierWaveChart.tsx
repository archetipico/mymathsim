import React, { useRef, useEffect, useState, type HTMLAttributes } from "react";
import { select } from "d3-selection";
import { Slider } from "@/components/ui/slider";
import { SliderRange, SliderThumb, SliderTrack } from "@radix-ui/react-slider";

interface Component {
  rho: number;
  omega: number;
  color?: string;
}

interface FourierEpicircleProps extends HTMLAttributes<HTMLDivElement> {
  components: Component[];
  width?: number;
  height?: number;
}

export const FourierEpicircle: React.FC<FourierEpicircleProps> = ({
  components,
  width = 600,
  height = 400,
  className,
  ...props
}) => {
  function pushCircular<T>(buffer: T[], item: T, max: number): T[] {
    if (buffer.length < max) {
      return [...buffer, item];
    }
    const next = buffer.slice(1);
    next.push(item);
    return next;
  }

  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState({ width, height });
  const [time, setTime] = useState(0);
  const [wavePoints, setWavePoints] = useState<{ x: number; y: number }[]>([]);
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const obs = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;
      setSize({ width: rect.width, height: rect.height });
    });
    obs.observe(wrapperRef.current);
    return () => obs.disconnect();
  }, []);

  const maxOmega = components.reduce(
    (max, c) => Math.max(max, Math.abs(c.omega)),
    0
  );
  const baseTimeStep = maxOmega > 0 ? 0.01 / maxOmega : 0.01;

  useEffect(() => {
    let animationFrame: number;
    const animate = () => {
      setTime((prev) => {
        const t = prev + baseTimeStep * speedMultiplier;
        let x = 0;
        let y = 0;
        components.forEach((c) => {
          x += c.rho * Math.cos(c.omega * t);
          y += c.rho * Math.sin(c.omega * t);
        });

        const MAX_POINTS = 2000;

        setWavePoints((prev) => pushCircular(prev, { x: t, y }, MAX_POINTS));

        setTrail((prev) => pushCircular(prev, { x, y }, MAX_POINTS));

        return t;
      });
      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [components, baseTimeStep, speedMultiplier]);

  useEffect(() => {
    if (!svgRef.current) return;

    const { width, height } = size;
    const leftWidth = width * 0.33;
    const rightWidth = width * 0.67;

    const svg = select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("width", width).attr("height", height);

    const defs = svg.append("defs");
    const filter = defs
      .append("filter")
      .attr("id", "shadow")
      .attr("x", "-50%")
      .attr("y", "-50%")
      .attr("width", "200%")
      .attr("height", "200%");
    filter
      .append("feDropShadow")
      .attr("dx", 2)
      .attr("dy", 2)
      .attr("stdDeviation", 2)
      .attr("flood-color", "#333")
      .attr("flood-opacity", 0.3);

    const centerX = leftWidth / 2;
    const centerY = height / 2;

    const maxR = Math.max(...components.map((c) => c.rho)); // cerchio più grande
    const totalRho = components.reduce((s, c) => s + c.rho, 0);

    const marginPercent = 0.05; // 5% di margine
    const usableWidth = leftWidth * (1 - 2 * marginPercent);
    const usableHeight = height * 0.9;

    const scaleLeft = Math.min(usableWidth, usableHeight) / (2 * totalRho);

    const scaleVertical = usableHeight / (2 * maxR);
    const finalScale = Math.min(scaleLeft, scaleVertical);
    const maxY = components.reduce((s, c) => s + Math.abs(c.rho), 0);
    const marginLeft = 50;
    const marginRight = 20;
    const marginTop = 20;
    const marginBottom = 20;
    const chartWidth = rightWidth - marginLeft - marginRight;
    const chartHeight = height - marginTop - marginBottom;
    const scaleRight = maxY > 0 ? chartHeight / 2 / maxY : 1;

    const gLeft = svg.append("g");
    const gRight = svg
      .append("g")
      .attr("transform", `translate(${leftWidth},0)`);

    let x = centerX;
    let y = centerY;
    components.forEach((c) => {
      const r = c.rho * finalScale;
      const newX = x + r * Math.cos(c.omega * time);
      const newY = y + r * Math.sin(c.omega * time);

      gLeft
        .append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", r)
        .attr("fill", "none")
        .attr("stroke", "#bbb");

      gLeft
        .append("line")
        .attr("x1", x)
        .attr("y1", y)
        .attr("x2", newX)
        .attr("y2", newY)
        .attr("stroke", (c.color ?? "#3f35e3").toString())
        .attr("stroke-width", 2);

      x = newX;
      y = newY;
    });

    gLeft
      .append("circle")
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", 4)
      .attr("fill", "#ff3333");

    gLeft
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "#0a0a0a")
      .attr("filter", "url(#shadow)")
      .attr("stroke-width", 1)
      .attr(
        "d",
        trail
          .map(
            (p, i) =>
              `${i === 0 ? "M" : "L"} ${centerX + p.x * finalScale} ${
                centerY + p.y * finalScale
              }`
          )
          .join(" ")
      );

    const xAxisY = marginTop + chartHeight / 2;
    const yAxisX = marginLeft;
    const xTicks = 6;
    const yTicks = 6;
    const xTickStep = chartWidth / xTicks;
    const yTickStep = chartHeight / yTicks;
    const axisColor = "#aaa";

    gRight
      .append("line")
      .attr("x1", marginLeft)
      .attr("y1", xAxisY)
      .attr("x2", marginLeft + chartWidth)
      .attr("y2", xAxisY)
      .attr("stroke", axisColor)
      .attr("stroke-width", 1);

    gRight
      .append("line")
      .attr("x1", yAxisX)
      .attr("y1", marginTop)
      .attr("x2", yAxisX)
      .attr("y2", marginTop + chartHeight)
      .attr("stroke", axisColor)
      .attr("stroke-width", 1);

    for (let i = 1; i <= xTicks; i++) {
      const x = marginLeft + i * xTickStep;
      gRight
        .append("line")
        .attr("x1", x)
        .attr("y1", xAxisY - 3)
        .attr("x2", x)
        .attr("y2", xAxisY + 3)
        .attr("stroke", axisColor)
        .attr("stroke-width", 1);
      gRight
        .append("text")
        .attr("x", x + 2)
        .attr("y", xAxisY + 12)
        .attr("font-size", 10)
        .attr("fill", axisColor)
        .text(i);
    }

    for (let i = 0; i <= yTicks; i++) {
      const y = marginTop + i * yTickStep;
      gRight
        .append("line")
        .attr("x1", yAxisX - 3)
        .attr("y1", y)
        .attr("x2", yAxisX + 3)
        .attr("y2", y)
        .attr("stroke", axisColor)
        .attr("stroke-width", 1);
      const val = ((chartHeight / 2 - (y - marginTop)) / scaleRight).toFixed(1);
      gRight
        .append("text")
        .attr("x", yAxisX + 6)
        .attr("y", y + 3)
        .attr("font-size", 10)
        .attr("fill", axisColor)
        .text(val);
    }

    const waveData = wavePoints.map((p, i) => ({
      x: marginLeft + (i / (wavePoints.length - 1 || 1)) * chartWidth,
      y: marginTop + chartHeight / 2 + p.y * scaleRight,
    }));

    gRight
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "#0a0a0a")
      .attr("stroke-width", 1)
      .attr("filter", "url(#shadow)")
      .attr(
        "d",
        waveData.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")
      );
  }, [size, time, wavePoints, trail, components, speedMultiplier]);

  return (
    <div className="flex flex-col space-y-4" {...props}>
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium">Velocità:</span>
        <Slider
          value={[speedMultiplier]}
          onValueChange={(val) => setSpeedMultiplier(val[0])}
          min={0.1}
          max={10}
          step={0.1}
          className="w-48"
        >
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <span className="text-sm">{speedMultiplier.toFixed(1)}x</span>
      </div>

      <div
        ref={wrapperRef}
        className={`w-full h-96 rounded-2xl shadow-lg overflow-hidden ${className}`}
      >
        <svg className="flex-1 bg-white" ref={svgRef} />
      </div>
    </div>
  );
};
