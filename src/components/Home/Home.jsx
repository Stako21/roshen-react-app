import { Card } from "../Card/Card";
import myLogo from "../../img/ST_Main.jpg";
import "./Home.scss";

export const Home = () => {
  return (
    <div className="home">
      <Card className="welcome-card">
      <div className="descriptionCompany">
        {/* <img src="../src/img/ST_Main.jpg" alt="ST_Main" /> */}
        <img src={myLogo} alt="ST_Main" />
        <div className="description">
          <h1>
            ТОВ<span className="line-break"> </span>«СВІТ ТРЕЙДІНГ»
          </h1>
          <p>
            Ваш надійний партнер у сфері&nbsp;
            <strong>
              оптових поставок кондитерських виробів, тортів та спецій.
            </strong>
          </p>
          <br />
          <p>
            Ми працюємо по всій території Запорізької та Дніпропетровської
            областей, доставляючи продукцію як у великі міста, так і в невеликі
            містечка та села. 
            </p>
            <p>Наш пріоритет –
            <strong> якість, стабільність і вигідні умови співпраці</strong>.</p>
        </div>
      </div>

      </Card>
    </div>
  );
};
