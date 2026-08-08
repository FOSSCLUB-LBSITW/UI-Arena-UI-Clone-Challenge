import { categories } from '../../data/categories';
import { restaurants } from '../../data/restaurants';
import FoodCategoryRow from '../../components/FoodCategory/FoodCategoryRow';
import RestaurantRow from '../../components/RestaurantGrid/RestaurantRow';
import RestaurantGrid from '../../components/RestaurantGrid/RestaurantGrid';

export default function Home() {
  return (
    <div className="pb-10">
      <FoodCategoryRow categories={categories} />
      <RestaurantRow title="Top restaurant chains in Thiruvananthapuram" restaurants={restaurants} />
      <RestaurantGrid title="Restaurants with online food delivery in Thiruvananthapuram" restaurants={restaurants} />
    </div>
  );
}
