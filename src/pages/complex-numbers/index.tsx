import { complex } from "mathjs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Col } from "../../components/personal/col";
import { Container } from "../../components/personal/container";
import { Data } from "../../components/personal/data";
import { Row } from "../../components/personal/row";
import { Selector } from "../../components/personal/selector";
import { Text } from "../../components/personal/text";
import { clamp, round } from "../../utils";
import { PolarComplexChart } from "./argandGaussChart";

type RectForm = { re: string; im: string };
type PolarForm = { rho: string; theta: string };
type Operation = "pow" | "sqrt";

export const ComplexNumberSolver: React.FC = () => {
  const { t } = useTranslation();
  const [lastEdited, setLastEdited] = useState<"rect" | "polar">("rect");
  const [rect, setRect] = useState<RectForm>({ re: "", im: "" });
  const [polar, setPolar] = useState<PolarForm>({ rho: "", theta: "" });
  const [applyOperation, setApplyOperation] = useState(false);
  const [operation, setOperation] = useState<Operation>("pow");
  const [nValue, setNValue] = useState<string>("2");
  const [resultPoints, setResultPoints] = useState<
    { rho: number; theta: number }[]
  >([]);

  const [rectEq, setRectEq] = useState<string>();
  const [polarEq, setPolarEq] = useState<string>();

  const handleInputChange = (
    value: string,
    setter: (val: string) => void,
    min?: number,
    max?: number
  ) => {
    if (value === "") {
      setter("");
      return;
    }
    const num = Number(value);
    if (!isNaN(num)) {
      setter(clamp(num, min ?? -Infinity, max ?? Infinity).toString());
    }
  };

  useEffect(() => {
    if (lastEdited !== "rect") return;
    const re = rect.re === "" ? 0 : clamp(Number(rect.re), -1e6, 1e6);
    const im = rect.im === "" ? 0 : clamp(Number(rect.im), -1e6, 1e6);
    const c = complex(re, im);
    const { r, phi } = c.toPolar();
    setPolar({ rho: r.toString(), theta: phi.toString() });
  }, [rect, lastEdited]);

  useEffect(() => {
    if (lastEdited !== "polar") return;
    const rho = polar.rho === "" ? 0 : clamp(Number(polar.rho), 0, 1e6);
    const theta =
      polar.theta === ""
        ? 0
        : clamp(Number(polar.theta), -10 * Math.PI, 10 * Math.PI);
    const c = complex({ r: rho, phi: theta });
    setRect({ re: c.re.toString(), im: c.im.toString() });
  }, [polar, lastEdited]);

  // Calcolo potenze/radici
  useEffect(() => {
    if (!applyOperation) {
      setResultPoints([]);
      return;
    }
    const rhoNum = polar.rho === "" ? 0 : Number(polar.rho);
    const thetaNum = polar.theta === "" ? 0 : Number(polar.theta);
    const n = nValue === "" ? 1 : Math.max(1, Number(nValue));

    if (operation === "pow") {
      setResultPoints([{ rho: Math.pow(rhoNum, n), theta: thetaNum * n }]);
    } else {
      const rRes = Math.pow(rhoNum, 1 / n);
      const points = Array.from({ length: n }, (_, k) => ({
        rho: rRes,
        theta: (thetaNum + 2 * Math.PI * k) / n,
      }));
      setResultPoints(points);
    }
  }, [polar, operation, nValue, applyOperation]);

  useEffect(() => {
    const re: string | undefined = rect.re ? round(rect.re) : undefined;
    const im: string | undefined = rect.im
      ? round(Math.abs(Number(rect.im)))
      : undefined;
    const imSign: string = Number(rect.im) < 0 ? "-" : "+";
    const equalSign: string = rect.re === re && rect.im === im ? "=" : "≈";

    let c: string = "c = a + bi";
    if (re && Number(re) !== 0) {
      if (im && Number(im) !== 0) {
        c = `c ${equalSign} ${re} ${imSign} ${im}i`;
      } else {
        c = `c ${equalSign} ${re}`;
      }
    } else {
      if (im && Number(im) !== 0) {
        c =
          Number(rect.im) < 0 ? `c ${equalSign} ${imSign}${im}i` : `c = ${im}i`;
      }
    }

    setRectEq(c);
  }, [rect]);

  useEffect(() => {
    const rho: string | undefined = polar.rho ? round(polar.rho) : undefined;
    const theta: string | undefined = polar.theta
      ? round(polar.theta)
      : undefined;
    const imSign: string = Number(rect.im) < 0 ? "-" : "+";
    const equalSign: string =
      polar.rho === rho && polar.theta === theta ? "=" : "≈";
    const cos: string = round(Math.cos(Number(theta)));
    const sinN: number = Math.sin(Number(theta));
    const sin: string = round(sinN);

    let c: string = "c = ρ(cosθ + i sinθ)";
    if (rho && Number(rho) !== 0 && theta) {
      if (sinN < 0) {
        c = `c ${equalSign} ${rho}(${cos} ${imSign} ${round(Math.abs(sinN))}i)`;
      } else {
        c = `c ${equalSign} ${rho}(${cos} ${imSign} ${sin}i)`;
      }
    }

    setPolarEq(c);
  }, [polar]);

  return (
    <Row justify="center" className="px-6">
      <Col className="min-w-1/6">
        <Container cols={2} hasBackground>
          <Col span={2} gap={1}>
            <Text size="xl" variant="semibold">
              {t("Rectangular Form")}
            </Text>
            <Text variant="italic">{rectEq}</Text>
          </Col>

          <Data
            id={"re"}
            type={"number"}
            value={rect.re}
            onChange={(e) => {
              setLastEdited("rect");
              handleInputChange(
                e.target.value,
                (val) => setRect((prev) => ({ ...prev, re: val })),
                -1e6,
                1e6
              );
            }}
            label={t("Re")}
            min={-1e6}
            max={1e6}
          />

          <Data
            id={"im"}
            type={"number"}
            value={rect.im}
            onChange={(e) => {
              setLastEdited("rect");
              handleInputChange(
                e.target.value,
                (val) => setRect((prev) => ({ ...prev, im: val })),
                -1e6,
                1e6
              );
            }}
            label={t("Im")}
            min={-1e6}
            max={1e6}
          />
        </Container>

        <Container cols={2} hasBackground>
          <Col span={2} gap={1}>
            <Text size="xl" variant="semibold">
              {t("Polar Form")}
            </Text>
            <Text variant="italic">{polarEq}</Text>
          </Col>

          <Data
            id={"rho"}
            type={"number"}
            value={polar.rho}
            onChange={(e) => {
              setLastEdited("polar");
              handleInputChange(
                e.target.value,
                (val) => setPolar((prev) => ({ ...prev, rho: val })),
                0,
                1e6
              );
            }}
            label={t("rho")}
            min={0}
            max={1e6}
          />

          <Data
            id={"theta"}
            type={"number"}
            value={polar.theta}
            onChange={(e) => {
              setLastEdited("polar");
              handleInputChange(
                e.target.value,
                (val) => setPolar((prev) => ({ ...prev, theta: val })),
                -1e6,
                1e6
              );
            }}
            label={t("Theta")}
            min={-1e6}
            max={1e6}
          />
        </Container>

        <Container hasBackground>
          <Data
            id={"apply-operation"}
            type={"checkbox"}
            value={applyOperation}
            onCheckedChange={(val) => setApplyOperation(!!val)}
            label={t("Apply Operation")}
          />

          <Selector
            label={t("Operation")}
            value={operation}
            placeholder={t("Select Operation")}
            onValueChange={(val) => setOperation(val as Operation)}
            items={[
              {
                value: "pow",
                label: t("Power"),
              },
              {
                value: "sqrt",
                label: t("Nth Root"),
              },
            ]}
          />

          <Data
            id={"n"}
            type={"number"}
            value={nValue}
            onChange={(e) =>
              handleInputChange(e.target.value, setNValue, 1, 20)
            }
            label={"n"}
            min={1}
            max={20}
          />
        </Container>
      </Col>

      <PolarComplexChart
        rho={polar.rho === "" ? 0 : Number(polar.rho)}
        theta={polar.theta === "" ? 0 : Number(polar.theta)}
        extraPoints={resultPoints}
        className="w-xs sm:w-2xl"
      />
    </Row>
  );
};
