import { Card } from "../Card/Card";
import "./Contacts.scss";

export const Contacts = () => {
  return (
    <section className="contacts">
      <div className="contacts__container">
        <Card className="">
          <div className="contacts__content">
            <h2 className="contacts__title">Контакти</h2>
            <span className="contacts__border"></span>
            <h3 className="contacts__company-name">ТОВ «СВІТ ТРЕЙДІНГ»</h3>
            <a href="#" class="contacts__item contacts__item--address">
              вул. Карпенка-карого 60, Запоріжжя, Запорізька область, 69014,
              Україна
            </a>

            <a
              href="tel:+38(067)1234567"
              class="contacts__item contacts__item--phone-number"
            >
              телефон: +38 (067) 123-45-67
            </a>

            <a
              href="mailto:principal@accc.zp.ua"
              className="contacts__item contacts__item--email"
            >
              e-mail: principal@accc.zp.ua
            </a>
            <span className="contacts__border"></span>
            <p className="contacts__description">
              Ми завжди раді відповісти на ваші запитання та обговорити
              можливості співпраці. Зв'яжіться з нами будь-яким зручним для вас
              способом!
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};
