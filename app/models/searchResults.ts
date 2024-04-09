export interface Recipe {
  Name: string;
  Category: number;
  Ingredients: ListWithTitle[];
  Method: ListWithTitle[];
  Id: string;
  UserId: string;
}

export interface ListWithTitle {
  Title: string;
  List: string[];
}

export interface RecipeUser {
  DateCreated: string;
  Favourites: string[];
}

export interface UserFavourites {
  Favourites: string[];
}
