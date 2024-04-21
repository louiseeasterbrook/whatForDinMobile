export interface Recipe {
  Name: string;
  Category: number;
  Ingredients: string[];
  Method: string[];
  Id: string;
  UserId: string;
}

export interface ListWithTitle {
  Title: string;
  List: string[];
}

export interface RecipeUser {
  Name: string;
  DateCreated: string;
  Favourites: string[];
  Id: string;
}

export interface UserFavourites {
  Favourites: string[];
}

export interface SearchResultUser {
  Name: string;
  Id: string;
  RecipeCount: number;
}
