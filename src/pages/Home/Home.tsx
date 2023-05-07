import { Container, Row, Col, Button } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
            descriptive text Le Lorem Ipsum est simplement du faux texte employé
            dans la composition et la mise en page avant impression. Le Lorem
            Ipsum est le faux texte standard de l'imprimerie depuis les années
            1500, quand un imprimeur anonyme ass embla ensemble des morceaux de
            texte pour réaliser un livre spécimen de polices de texte. Il n'a
            pas fait que.
          </p>
          <button>Inscrivez vous</button>
        </div>
        <div className={"wrapp"}>
          <img src="https://picsum.photos/id/429/300/300" alt="sample image" />
        </div>
      </div>
      <div className="block-2">
        <div className={"wrapp"}>
          <img src="https://picsum.photos/200/200" alt="sample image" />
          <div className={"inner-wrapp"}>
            <h2>Choissiez recettes</h2>
            <p>
              On sait depuis longtemps que travailler avec du texte lisible et
              contenant du sens est source de distractions, et empêche de se
              concentrer sur la mise en page elle-même. L'avantage du Lorem
              Ipsum sur un texte générique comme 'Du texte.{" "}
            </p>
          </div>
        </div>

        <div className={"wrapp"}>
          <img src="https://picsum.photos/200/200" alt="sample image" />
          <div className={"inner-wrapp"}>
            <h2>Suivez votre consumption</h2>
            <p>
              On sait depuis longtemps que travailler avec du texte lisible et
              contenant du sens est source de distractions, et empêche de se
              concentrer sur la mise en page elle-même. L'avantage du Lorem
              Ipsum sur un texte générique comme 'Du texte.{" "}
            </p>
          </div>
        </div>

        <div className={"wrapp"}>
          <img src="https://picsum.photos/200/200" alt="sample image" />
          <div className={"inner-wrapp"}>
            <h2>Diminuez votre empreinte carbone</h2>
            <p>
              On sait depuis longtemps que travailler avec du texte lisible et
              contenant du sens est source de distractions, et empêche de se
              concentrer sur la mise en page elle-même. L'avantage du Lorem
              Ipsum sur un texte générique comme 'Du texte.{" "}
            </p>
          </div>
        </div>

        <button>Inscrivez vous</button>
      </div>

      <div className="block-3">
        <div className="wrapp">
          <h1>Avantages</h1>
          <p>
            On sait depuis longtemps que travailler avec du texte lisible et
            contenant du sens est source de distractions, et empêche de se
            concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum
            sur un texte générique comme 'Du texte. Du texte
          </p>
        </div>

        <div className="wrapp-facts">
          <div className="inner-wrapp-facts">
            <h3>Fact 1</h3>
            <p>
              descriptive text Le Lorem Ipsum est simplement du faux texte
              employé dans la composition et la mise en page avant impression.
              Le Lorem Ipsum est le faux texte standard de.
            </p>
          </div>
          <div className="inner-wrapp-facts">
            <h3>Fact 2</h3>
            <p>
              descriptive text Le Lorem Ipsum est simplement du faux texte
              employé dans la composition et la mise en page avant impression.
              Le Lorem Ipsum est le faux texte standard de.
            </p>
          </div>
          <div className="inner-wrapp-facts">
            <h3>Fact 3</h3>
            <p>
              descriptive text Le Lorem Ipsum est simplement du faux texte
              employé dans la composition et la mise en page avant impression.
              Le Lorem Ipsum est le faux texte standard de.
            </p>
          </div>
        </div>
        <button>Inscrivez vous</button>
      </div>
    </Container>
  );
};

export default Home;
