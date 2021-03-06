import React from "react";
import { useParams, useHistory } from "react-router-dom";
import "./DetailsView.scss";
import formatPopulation from "../../utils/formatPopulation";

function Language({ language }) {
  return <>{language}</>;
}

function Border({ border }) {
  const history = useHistory();
  return (
    <li
      className="details__btn"
      onClick={(e) =>
        history.push(`/${e.currentTarget.innerText.toLowerCase()}`)
      }
    >
      {border}
    </li>
  );
}

function DetailsView({ countries }) {
  let { id } = useParams();
  let country = countries.find((country) => country.name.toLowerCase() === id);
  const history = useHistory();

  const displayBorders = (borders) => {
    return borders
      .map((border) =>
        countries.find((country) => country.alpha3Code === border)
      )
      .map((country, index) => <Border key={index} border={country.name} />);
  };

  const displayLanguages = (languages) => {
    return languages
      .map((language, index) => (
        <Language key={index} language={language.name} />
      ))
      .reduce((acc, x) => (acc === null ? [x] : [acc, ", ", x]), null);
  };

  const displayListItem = (lable, value) => {
    return (
      <li className="details__list-item">
        <span className="details__list-item--bold">{lable}</span>
        {value}
      </li>
    );
  };

  return (
    <>
      {country && (
        <div className="details">
          <button
            className="details__btn details__btn--back"
            onClick={(e) => history.goBack()}
          >
            <i className="details__btn-arrow fas fa-arrow-left"></i>Back
          </button>
          <div className="details__main-container">
            <img className="details__flag" src={country.flag} alt="flag" />
            <div className="details__text-container">
              <h3 className="details__title">{country.name}</h3>
              <div className="details__list-container">
                <ul className="details__list">
                  {displayListItem("Native Name:", country.nativeName)}
                  {displayListItem(
                    "Population:",
                    formatPopulation(country.population)
                  )}
                  {displayListItem("Region:", country.region)}
                  {displayListItem("Sub Region:", country.subregion)}
                  {displayListItem("Capital:", country.capital)}
                </ul>
                <ul className="details__list">
                  {displayListItem("Top Level Domain:", country.topLevelDomain)}
                  {displayListItem("Currencies:", country.currencies[0].name)}
                  {displayListItem(
                    "Languages:",
                    displayLanguages(country.languages)
                  )}
                </ul>
              </div>

              <ul className="details__list details__list--horizontal">
                <li className="details__list-item--bigger">
                  Borders countries:
                </li>
                {displayBorders(country.borders)}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailsView;
