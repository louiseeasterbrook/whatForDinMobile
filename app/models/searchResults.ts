export interface Recipe {
  Name: string;
  Category: string[];
  Ingredients: string[];
  Method: string[];
  Id: string;
  UserId: string;
  UserName: string;
  Comment: string;
  PhotoName: string;
}

export interface ListWithTitle {
  Title: string;
  List: string[];
}

export interface RecipeUser {
  Name: string;
  DateCreated: string;
  Favourites: string[];
  RecipeTags: RecipeTag[];
  Id: string;
}
export interface RecipeTag {
  Title: string;
  Colour: string;
  Icon: string;
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
