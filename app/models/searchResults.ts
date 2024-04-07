export interface Recipe {
  Name: string;
  Category: number;
  Ingredients: ListWithTitle[];
  Method: ListWithTitle[];
}

export interface ListWithTitle {
  Title: string;
  List: string[];
}

export interface RecipeUser {
  DateCreated: string;
  Favourites: number[];
}
