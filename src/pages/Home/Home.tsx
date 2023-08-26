import { Container, Row, Col, Button } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  return (
    <Container id={"homepage"} className={"home-container"}>
      <div className="block-1">
        <div className={"wrapp"}>
          <h1>
            Just Reduce, la solution pour réduire les émissions carbone de vos
            repas quotidiens.
          </h1>
          <p>
            Plongez dans un monde de choix alimentaires délicieux et durables
            avec Just Reduce ! Notre application est votre partenaire idéal pour
            réduire votre empreinte carbone quotidienne. Nous sommes déterminés
            à faire de chaque repas une opportunité de contribuer à un avenir
            plus propre et plus respectueux de la planète.
          </p>
          <button>
            {" "}
            <Link to="/register" className="btn-link">
              Inscrivez vous
            </Link>
          </button>
        </div>
        <div className={"wrapp"}>
          <img src="https://picsum.photos/id/429/300/300" alt="sample image" />
        </div>
      </div>
      <div className="block-2">
        <div className={"wrapp"}>
          <img src="/assets/step1.jpg" alt="image step 1" />
          <div className={"inner-wrapp"}>
            <h2>Choissiez recettes</h2>
            <p>
              Choisissez des recettes savoureuses tout en réduisant votre impact
              environnemental. Rejoignez-nous pour explorer des options
              délicieuses et durables.
            </p>
          </div>
        </div>

        <div className={"wrapp"}>
          <img src="/assets/step2.jpg" alt="image step 2" />
          <div className={"inner-wrapp"}>
            <h2>Suivez votre consumption</h2>
            <p>
              Suivez votre consommation alimentaire pour mieux comprendre son
              impact sur la planète. Connectez-vous pour commencer à enregistrer
              vos choix alimentaires.
            </p>
          </div>
        </div>

        <div className={"wrapp"}>
          <img src="/assets/step3.jpg" alt="image step 3" />
          <div className={"inner-wrapp"}>
            <h2>Diminuez votre empreinte carbone</h2>
            <p>
              Diminuez votre empreinte carbone en prenant des décisions
              éclairées sur vos repas. Inscrivez-vous aujourd'hui pour un mode
              de vie plus durable.
            </p>
          </div>
        </div>

        <button>
          <Link to="/register" className="btn-link">
            Inscrivez vous
          </Link>
        </button>
      </div>

      <div className="block-3">
        <div className="wrapp">
          <h1>Avantages</h1>
          <p>
            Vous gagnez une meilleure compréhension de l'impact de vos choix
            alimentaires sur la planète, ce qui vous permet de faire des
            décisions plus éclairées. En adoptant des pratiques alimentaires
            plus durables, vous pouvez réduire vos dépenses alimentaires à long
            terme. Ensemble, nous pouvons faire une différence positive pour la
            planète.
          </p>
        </div>

        <div className="wrapp-facts">
          <div className="inner-wrapp-facts">
            <h3>Fact 1</h3>
            <p>
              Saviez-vous que chaque repas compte dans la réduction des
              émissions de carbone ? Connectez-vous pour en apprendre davantage.
            </p>
          </div>
          <div className="inner-wrapp-facts">
            <h3>Fact 2</h3>
            <p>
              La planète vous remercie lorsque vous réduisez votre empreinte
              carbone. Inscrivez-vous et découvrez comment.
            </p>
          </div>
          <div className="inner-wrapp-facts">
            <h3>Fact 3</h3>
            <p>
              Chaque petit geste compte. Connectez-vous et explorez comment vos
              choix alimentaires peuvent avoir un impact positif sur
              l'environnement.
            </p>
          </div>
        </div>
        <button>
          <Link to="/register" className="btn-link">
            Inscrivez vous
          </Link>
        </button>
      </div>
    </Container>
  );
};

export default Home;
