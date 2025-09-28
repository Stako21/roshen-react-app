import { Card } from "../Card/Card";
import FinancialReports from "../FinancialReports/FinancialReports";

export const Documents = () => {
  return (
    <div className="documents-page">
      <Card className="align-center">
        <h2>Фінансова звітність</h2>
        <p>
          Фінансова звітність, яка складена відповідно до НП(С)БО, разом з
          аудиторським звітом (звітом незалежного аудитора).
        </p>
      </Card>
      <Card>
        <FinancialReports />
      </Card>
      {/* Додайте тут ваш компонент перегляду документів */}
    </div>
  );
};
