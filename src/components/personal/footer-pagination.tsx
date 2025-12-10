import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Container } from "./container";
import { Row } from "./row";
import { useNavigate } from "react-router-dom";

interface FooterPaginationProps {
  isFirst?: boolean;
  isLast?: boolean;
  prevPath?: string;
  nextPath?: string;
}

export const FooterPagination: React.FC<FooterPaginationProps> = ({
  isFirst = false,
  isLast = false,
  prevPath,
  nextPath,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Container>
      <Row justify="center">
        {!isFirst && prevPath && (
          <Button onClick={() => navigate(prevPath)}>
            <ArrowLeft />
            {t("Previous")}
          </Button>
        )}
        {!isLast && nextPath && (
          <Button onClick={() => navigate(nextPath)}>
            {t("Next")}
            <ArrowRight />
          </Button>
        )}
      </Row>
    </Container>
  );
};
