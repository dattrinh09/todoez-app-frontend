import React from "react";
import {
  CardContainer,
  CardItem,
  CardPhoto,
  CardTitle,
} from "./card-list-styles";
import { Link } from "react-router-dom";

const CardList = ({ options }) => {
  return (
    <CardContainer>
      {options.map((option) => (
        <Link key={option.key} to={option.route}>
          <CardItem>
            <CardPhoto>
              <img
                src={option.image}
                alt="icon"
                style={{ height: "100%", width: "100%" }}
              />
            </CardPhoto>
            <CardTitle>{option.title}</CardTitle>
          </CardItem>
        </Link>
      ))}
    </CardContainer>
  );
};

export default CardList;
