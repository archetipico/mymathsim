import { AppCard } from "@/components/personal/app-card";
import { websiteItems } from "@/components/personal/app-sidebar";
import { Container } from "@/components/personal/container";
import { Motion } from "@/components/personal/motion";
import { Row } from "@/components/personal/row";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Text } from "../../components/personal/text";
import { HOME } from "@/paths";

export const Home: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Container display="flex" justify="center">
      <Motion as={Row} justify="center">
        <Text size="9xl">{t("MyMathSim")}</Text>
      </Motion>

      <Motion as={Row} justify="center" className="mt-4">
        <Text size="lg" color="light">
          {t("Interactive visualizations for mathematical concepts")}
        </Text>
      </Motion>

      <Container
        cols={Math.min(websiteItems.length - 1, 3) as 1 | 2 | 3 | 4 | 5 | 6}
        display="flex"
      >
        {websiteItems
          .filter((item) => item.url !== HOME)
          .map((item, i) => (
            <Motion
              as={AppCard}
              key={i}
              head={t(item.title)}
              children={<Text color="light">{t(item.description)}</Text>}
              onClick={() => navigate(item.url)}
            />
          ))}
      </Container>
    </Container>
  );
};
