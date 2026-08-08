export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  ratingCount: string;
  deliveryTime: string;
  cuisines: string[];
  location: string;
  discount?: string;
  costForTwo: string;
  description: string;
  isOpen: boolean;
  closesAt: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  itemIds: string[];
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isVeg: boolean;
  rating?: number;
  ratingCount?: string;
  isBestseller?: boolean;
  isCustomisable?: boolean;
}

export interface FoodCategory {
  id: string;
  name: string;
  image: string;
}

export interface CartLine {
  item: MenuItem;
  quantity: number;
}

export interface HelpCategory {
  id: string;
  name: string;
}

export interface HelpQuestion {
  id: string;
  categoryId: string;
  question: string;
  answer: string;
}
