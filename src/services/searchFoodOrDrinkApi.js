const searchFoodOrDrinkApi = async (foodOrDrink, typeSearch, search) => {
  if (foodOrDrink === 'food') {
    if (typeSearch === 'Ingredient') {
      const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`);
      const data = await request.json();
      console.log(data);
      return data;
    }
    if (typeSearch === 'Name') {
      const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
      const data = await request.json();
      console.log(data);
      return data;
    }
    if (typeSearch === 'First letter') {
      const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`);
      const data = await request.json();
      console.log(data);
      return data;
    }
  } else if (foodOrDrink === 'drinks') {
    if (typeSearch === 'Ingredient') {
      const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`);
      const data = await request.json();
      console.log(data);
      return data;
    }
    if (typeSearch === 'Name') {
      const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`);
      const data = await request.json();
      console.log(data);
      return data;
    }
    if (typeSearch === 'First letter') {
      const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`);
      const data = await request.json();
      console.log(data);
      return data;
    }
  }
};

export default searchFoodOrDrinkApi;
