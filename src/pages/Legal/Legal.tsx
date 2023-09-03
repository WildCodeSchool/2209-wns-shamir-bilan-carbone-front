import React from "react";
import { Container, Typography } from "@mui/material";

export default function Legal() {
  return (
    <Container maxWidth="sm" id={"legalPage"} className={"left-align-text"}>
      <Typography
        className={"legal-title"}
        variant="h4"
        component="h1"
        gutterBottom
      >
        Mentions légales
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        Bienvenue sur le site www.bilan-carbon.com
      </Typography>
      <Typography
        className={"legal-title"}
        variant="h5"
        component="h2"
        gutterBottom
      >
        Propriétaire
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        Ce site est la propriété de "Jest Reduce" Entreprise Unipersonnelle
        responsabilité limitée EURL Numéro de TVA de Just Reduce : FR999999999
        Téléphone : 06 99 99 99 99 Email: ailzena@bilan-carbon.com Siège social:
        17 Rue Delandine 69002 Lyon Le montant de capital social: 5000 €
        Responsable de publication : Agnija Ilzena
      </Typography>
      <Typography
        className={"legal-title"}
        variant="h5"
        component="h2"
        gutterBottom
      >
        Hébergeur
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        Ce site est hébergé par OVH. SAS au capital de 10 069 020 € RCS Lille
        Métropole 424 761 419 00045 Code APE 2620Z N° TVA : FR 22 424 761 419
        Siège social : 2 rue Kellermann – 59100 Roubaix – France
      </Typography>
      <Typography
        className={"legal-title"}
        variant="h5"
        component="h2"
        gutterBottom
      >
        Liens
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        Les sites reliés directement ou indirectement au site Just Reduce ne
        sont pas sous son contrôle. En conséquence, nous n'assumons aucune
        responsabilité quant aux informations publiées sur ces sites. Les liens
        avec des sites extérieurs ne sont fournis qu'à titre de commodité et
        n'impliquent aucune caution quant à leur contenu.
      </Typography>
      <Typography
        className={"legal-title"}
        variant="h5"
        component="h2"
        gutterBottom
      >
        Crédits photos
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        Les photos présentes sur ce site sont la propriété exclusive de leur
        auteur. Elles sont protégées par le Code de la Propriété Intellectuelle
        et, plus généralement, les traités et accords internationaux comportant
        des dispositions relatives à la protection des droits d’auteurs. Ces
        textes interdisent, quel que soit le procédé utilisé, intégralement ou
        partiellement, la représentation, la reproduction, pour un usage autre
        que privé ou la modification sans l’autorisation expresse de l’auteur ou
        de ses ayants cause.
      </Typography>
      <Typography
        className={"legal-title"}
        variant="h5"
        component="h2"
        gutterBottom
      >
        Politique de confidentialité
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        Les données personnelles collectées dans le cadre de notre activité sont
        les suivantes : votre nom et prenom, votre adresse e-mail, ville, code
        postal, nom de societé. La collecte et le traitement de ces données
        répond aux finalités suivantes : Vous contacter par e-mail, envoi de
        newsletter.<br></br>
        <br></br>
        Lorsque vous remplisez la formulaire de contact, sont automatiquement
        collectées les données suivantes : votre nom et prenom, votre adresse
        e-mail, ville, code postal, nom de societé. Elles sont conservées par le
        responsable du traitement dans des conditions raisonnables de sécurité,
        pour une durée de : 12 mois. La société est susceptible de conserver
        certaines données à caractère personnel au-delà des délais annoncés
        ci-dessus afin de remplir ses obligations légales ou réglementaires.
        <br></br> <br></br>
        Nous ne vendons, n’échangeons et ne transférons pas vos informations
        personnelles identifiables à des tiers.
      </Typography>
    </Container>
  );
}
