import { Card } from "../Card/Card";
import FinancialReports from "../FinancialReports/FinancialReports";
import "./About.scss";

export const About = () => {
  return (
    <section className="about-us">
      <div className="about-us__container">
        <Card className="about-us__content no-margin-top">
          <h2 className="about-us__title">Про нас</h2>
          <p>
            <span className="highlight">ТОВ «СВІТ ТРЕЙДІНГ»</span> – компанія,
            що спеціалізується на оптових поставках кондитерських виробів,
            тортів та спецій.
          </p>
          <br />
          <p>
            Ми працюємо безпосередньо з провідним виробником в Україні –
            <span className="highlight">
              Кондитерською корпорацією «Roshen»
            </span>
            , щоб гарантувати свіжість, якість і широкий асортимент для наших
            клієнтів.
          </p>
          <br />
          <p>
            Наша діяльність охоплює територію
            <span className="highlight region">Запорізької</span> та
            <span className="highlight region">Дніпропетровської областей</span> – ми
            забезпечуємо стабільні поставки як у великі міста, так і в менші
            населені пункти та села.
          </p>
          <br />
          <p>
            Наші клієнти – це{" "}
            <span className="highlight">
              магазини, кав’ярні, ресторани та торговельні мережі
            </span>
            , для яких ми пропонуємо вигідні умови та професійний сервіс.
          </p>
          <br />
          <p>
            Ми цінуємо довготривалі відносини та завжди відкриті до нових
            співпраць.
          </p>
          <br />
          
          <p className="about-us__final">
            Обираючи нас, ви отримуєте надійність, вигідні умови та солодкий
            смак успіху.
          </p>
        </Card>
      </div>

      {/* Декоровані кола */}
      <div className="decor decor--left"></div>
      <div className="decor decor--right"></div>

      
    </section>
  );
};
