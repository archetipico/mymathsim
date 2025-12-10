import { Col } from "@/components/personal/col";
import { Container } from "@/components/personal/container";
import { Data } from "@/components/personal/data";
import LatexRenderer from "@/components/personal/latex-renderer";
import { Row } from "@/components/personal/row";
import { Text } from "@/components/personal/text";
import { Button } from "@/components/ui/button";
import { t } from "i18next";
import { Trash } from "lucide-react";
import { useState } from "react";
import { FourierEpicircle } from "./fourierWaveChart";
import { FooterPagination } from "@/components/personal/footer-pagination";
import { COMPLEX_NUMBERS } from "@/paths";

interface ComponentInput {
  rho: number;
  omega: number;
  color: string;
}

export const Fourier: React.FC = () => {
  const [components, setComponents] = useState<ComponentInput[]>([
    { rho: 3, omega: 5, color: "#ff4d4d" },
    { rho: 1, omega: -10, color: "#4d79ff" },
  ]);

  const handleChange = (
    index: number,
    field: "rho" | "omega" | "color",
    value: string
  ) => {
    setComponents((prev) =>
      prev.map((c, i) =>
        i === index
          ? { ...c, [field]: field === "color" ? value : parseFloat(value) }
          : c
      )
    );
  };

  const addComponent = () =>
    setComponents((prev) => [...prev, { rho: 1, omega: 1, color: "#000000" }]);

  const removeComponent = (index: number) => {
    setComponents((prev) => prev.filter((_, i) => i !== index));
  };

  const eulerForm = `\\[
    z(t) = A \\, e^{i \\omega t} = A(\\cos \\omega t + i \\sin \\omega t)
  \\]`;

  const fourierTransform = `\\[
    \\begin{aligned}
      s(t) &= \\sum_{k=0}^{N} A_k \\, e^{i \\omega_k t} \\\\
      S(\\omega) &= \\int_{-\\infty}^{\\infty} s(t) \\, e^{-i \\omega t} \\, dt
    \\end{aligned}
  \\]`;

  const fourierHelper = `\\[
    s(t) \\cdot e^{-i \\omega_0 t} = A e^{i \\omega_0 t} \\cdot e^{-i \\omega_0 t} = A
  \\]`;

  const fourierExample = `\\[
  \\begin{aligned}
    s(t) &= 3\\cos(-5t) + 0.5\\cos(12t) \\\\
    C(-5) &= \\int_{-\\infty}^{\\infty} s(t) \\, e^{i5t} \\, dt \\\\
    C(12) &= \\int_{-\\infty}^{\\infty} s(t) \\, e^{-i12t} \\, dt \\\\
    C(-5) &\\approx 3, \\quad C(12) \\approx 0.5, \\quad C(\\omega \\neq -5,12) \\approx 0
  \\end{aligned}
  \\]`;

  return (
    <Container>
      <Row justify="center">
        <Container gap={4} hasBackground className="xl:max-w-1/2">
          <Text isTitle>{t("The problem")}</Text>
          <Text lineHeight="loose">
            {t("complex-numbers-fourier-problem-1")}
          </Text>
          <Text lineHeight="loose">
            {t("complex-numbers-fourier-problem-2")}
          </Text>
          <LatexRenderer latex={eulerForm} />
          <Text lineHeight="loose">
            {t("complex-numbers-fourier-problem-3")}
          </Text>
          <LatexRenderer latex={fourierTransform} />
          <Text lineHeight="loose">
            {t("complex-numbers-fourier-problem-4")}
          </Text>
          <LatexRenderer latex={fourierHelper} />

          <Text isSubTitle>{t("Example")}</Text>
          <Text lineHeight="loose">
            {t("complex-numbers-fourier-problem-5")}
          </Text>
          <LatexRenderer latex={fourierExample} />
          <Text lineHeight="loose">
            {t("complex-numbers-fourier-problem-6")}
          </Text>
        </Container>
      </Row>
      <Row justify="center" className="px-6">
        <Text isTitle>{t("Playground")}</Text>
      </Row>

      <Col gap={2} align="middle">
        {components.map((c, i) => (
          <Container
            key={i}
            cols={3}
            hasBackground
            className="xl:max-w-1/2"
            justify="center"
            align="middle"
          >
            <Col>
              <Data
                id={`rho-${i}`}
                type="number"
                value={c.rho}
                onChange={(e) => handleChange(i, "rho", e.target.value)}
                label={t("rho")}
                min={0}
                max={100}
                step={0.1}
              />
            </Col>
            <Col>
              <Data
                id={`omega-${i}`}
                type="number"
                value={c.omega}
                onChange={(e) => handleChange(i, "omega", e.target.value)}
                label={t("omega")}
                max={100}
                step={0.1}
              />
            </Col>
            <Col>
              <div className="flex items-center space-x-2">
                <Data
                  id={`color-${i}`}
                  type="color"
                  value={c.color}
                  onChange={(e) => handleChange(i, "color", e.target.value)}
                />
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeComponent(i)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </Col>
          </Container>
        ))}

        <Button
          onClick={addComponent}
          disabled={components.length >= 5}
          className="xl:max-w-1/2"
        >
          {t("Add")}
        </Button>
      </Col>

      <FourierEpicircle components={components} className="w-full h-96" />

      <FooterPagination isLast prevPath={COMPLEX_NUMBERS} />
    </Container>
  );
};
