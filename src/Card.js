import React from "react";
import "./Card.scss";

function Card({ country }) {
  return (
    <div className="card">
      <img className="card__flag" src={country.flag} alt="flag" />
      <div className="card__container">
        <h3 className="card__title">{country.name}</h3>
        <ul className="card__list">
          <li className="card__list-item">
            {" "}
            <span className="card__list-item--bold">Population:</span>{" "}
            {country.population
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </li>
          <li className="card__list-item">
            <span className="card__list-item--bold">Region:</span>{" "}
            {country.region}
          </li>
          <li className="card__list-item">
            <span className="card__list-item--bold">Capital:</span>{" "}
            {country.capital}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Card;
