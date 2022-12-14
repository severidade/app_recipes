import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import InProgressContext from '../context/InProgressContext/InProgressContext';
import inProgressHelper from '../helpers/inProgressHelper';
import { drinkDetails, foodDetails } from '../services/detailsRequestApi';

import '../CSS/in_progress.css';

const IN_PROGRESS_KEY = 'inProgressRecipes';

export default function InProgressCard({ type }) {
  const { scribbled, setScribbled,
    recipeData, setRecipeData } = useContext(InProgressContext);
  const progressStorage = JSON.parse(localStorage.getItem(IN_PROGRESS_KEY));
  const path = useLocation().pathname;
  const pathId = path.replace(`/${type}/`, '').replace('/in-progress', '');
  const keys = [...inProgressHelper(type)];
  const { strInstructions } = recipeData;
  const ingredients = Object.entries(recipeData)
    .filter((entry) => entry[0].match('strIngredient') && entry[1]) || [];

  // Funciona como didMount buscando a receita na API pelo seu "id"
  useEffect(() => {
    const apiRequest = async () => {
      const handleRequest = type === 'foods' ? foodDetails(pathId) : drinkDetails(pathId);
      const data = await handleRequest;
      setRecipeData(type === 'foods' ? data.meals[0] : data.drinks[0]);
    };
    apiRequest();
    const checkStorage = progressStorage
      && Object.keys(progressStorage).includes(type);
    const saveObject = {
      ...progressStorage,
      [type]: checkStorage
        ? {
          ...progressStorage[type],
          [pathId]: progressStorage[type][pathId] || scribbled,
        }
        : { [pathId]: [] },
    };
    localStorage.setItem(IN_PROGRESS_KEY, JSON.stringify(saveObject));
  }, [pathId, progressStorage, scribbled, setRecipeData, type]);

  const handleChange = ({ target: { id } }) => {
    const saveObject = (updatedList) => ({
      ...progressStorage,
      [type]: { ...progressStorage[type], [pathId]: updatedList },
    });
    if (scribbled.includes(id)) {
      const removeIngredient = scribbled.filter((ingredient) => ingredient !== id);
      setScribbled(removeIngredient);
      return localStorage
        .setItem(IN_PROGRESS_KEY, JSON.stringify(saveObject(removeIngredient)));
    } const addIngredient = [...scribbled, id];
    setScribbled(addIngredient);
    return localStorage
      .setItem(IN_PROGRESS_KEY, JSON.stringify(saveObject(addIngredient)));
  };

  return (
    <div>
      {
        recipeData && (
          <>
            <div className="container_img_progress">
              <img
                data-testid="recipe-photo"
                src={ recipeData[keys[0]] }
                alt={ `imagem do ${recipeData[keys[1]]}` }
                width="300px"
                className="img_progress_detail"
              />
            </div>
            <div className="container_recipe_title_progress">
              <h3
                data-testid="recipe-category"
                className="recipe_category"
              >
                { recipeData[keys[2]] }
              </h3>
              <h2
                data-testid="recipe-title"
                className="title_detail"
              >
                { recipeData[keys[1]] }
              </h2>
            </div>
            <section className="conteiner_ingredientes_progress">
              <h2>Ingredients</h2>
              <ol className="list_progress">
                {
                  ingredients
                    && ingredients
                      .map((ingredient, index) => (
                        <li
                          className="ingredient_name_progress"
                          key={ index }
                          data-testid={ `${index}-ingredient-step` }
                        >
                          <input
                            className="ingrediente"
                            type="checkbox"
                            id={ ingredient[1] }
                            onChange={ handleChange }
                            checked={ progressStorage[type][pathId]
                              .includes(ingredient[1]) }
                          />
                          <label
                            htmlFor={ ingredient[1] }
                            className="ingredient_progress"
                          >
                            { ingredient[1] }
                          </label>
                        </li>))
                }
              </ol>
            </section>

            <div className="container_instructions_progress">
              <h2>Instructions</h2>
              <p
                className="instructions_in_progress"
                data-testid="instructions"
              >
                { strInstructions }
              </p>
            </div>
          </>)
      }
    </div>
  );
}

InProgressCard.propTypes = {
  type: PropTypes.string.isRequired,
};
