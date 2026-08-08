import type { MenuItem, MenuCategory } from '../types';
import { commonsImage } from '../utils/images';

export const menuItems: MenuItem[] = [
  // Zam Zam Dosa Hut
  { id: 'zz-1', restaurantId: 'zam-zam-dosa-hut', name: 'Chicken Biryani', description: 'Fragrant basmati rice layered with spiced chicken, served with raita and pickle.', price: 220, image: commonsImage('Chicken Biryani.jpg', 300), isVeg: false, rating: 4.5, ratingCount: '2.3K', isBestseller: true },
  { id: 'zz-2', restaurantId: 'zam-zam-dosa-hut', name: 'Masala Dosa', description: 'Crisp rice crepe filled with spiced potato masala, served with sambar and chutney.', price: 90, image: commonsImage('Dosai Chutney Hotel Saravana Bhavan.jpg', 300), isVeg: true, rating: 4.6, ratingCount: '1.8K', isBestseller: true },
  { id: 'zz-3', restaurantId: 'zam-zam-dosa-hut', name: 'Chicken 65', description: 'Deep-fried spicy chicken bites tossed in curry leaves and red chillies.', price: 180, image: commonsImage('Chicken 65.jpg', 300), isVeg: false, rating: 4.4, ratingCount: '980', isCustomisable: true },
  { id: 'zz-4', restaurantId: 'zam-zam-dosa-hut', name: 'Chicken Fried Rice', description: 'Wok-tossed rice with shredded chicken, egg and spring onion.', price: 170, image: commonsImage('Chicken Fried Rice.JPG', 300), isVeg: false, rating: 4.3, ratingCount: '760' },
  { id: 'zz-5', restaurantId: 'zam-zam-dosa-hut', name: 'Butter Naan', description: 'Soft leavened bread brushed with butter, baked in the tandoor.', price: 45, image: commonsImage('Butter Naan 2.jpg', 300), isVeg: true, rating: 4.5, ratingCount: '1.1K' },
  { id: 'zz-6', restaurantId: 'zam-zam-dosa-hut', name: 'Idli (2 pcs)', description: 'Steamed rice cakes served with sambar and coconut chutney.', price: 60, image: commonsImage('Idli Sambar.JPG', 300), isVeg: true, rating: 4.4, ratingCount: '640' },
  { id: 'zz-7', restaurantId: 'zam-zam-dosa-hut', name: 'Medu Vada (2 pcs)', description: 'Crisp, golden lentil doughnuts served with sambar and coconut chutney.', price: 50, image: commonsImage('Medu Vada.JPG', 300), isVeg: true, rating: 4.3, ratingCount: '410' },

  // Hotel Chinnus
  { id: 'hc-1', restaurantId: 'hotel-chinnus', name: 'Chicken Fried Rice', description: 'Classic wok-fried rice with chicken, carrots and spring onion.', price: 160, image: commonsImage('Chicken Fried Rice.JPG', 300), isVeg: false, rating: 4.3, ratingCount: '1.4K', isBestseller: true },
  { id: 'hc-2', restaurantId: 'hotel-chinnus', name: 'Veg Meals', description: 'Full traditional meal with rice, sambar, rasam, curries and papadam.', price: 130, image: commonsImage('A Thali, famous South Indian meal served on a banana leaf.jpg', 300), isVeg: true, rating: 4.5, ratingCount: '1.9K', isBestseller: true },
  { id: 'hc-3', restaurantId: 'hotel-chinnus', name: 'Paneer Butter Masala', description: 'Cottage cheese cubes simmered in a creamy tomato-butter gravy.', price: 190, image: commonsImage('Paneer Butter Masala.jpg', 300), isVeg: true, rating: 4.4, ratingCount: '820', isCustomisable: true },
  { id: 'hc-4', restaurantId: 'hotel-chinnus', name: 'Chicken 65', description: 'Spicy deep-fried chicken tossed with curry leaves and chilli.', price: 175, image: commonsImage('Chicken 65.jpg', 300), isVeg: false, rating: 4.2, ratingCount: '590' },
  { id: 'hc-5', restaurantId: 'hotel-chinnus', name: 'Masala Dosa', description: 'Crisp golden dosa with spiced potato filling.', price: 85, image: commonsImage('Dosai Chutney Hotel Saravana Bhavan.jpg', 300), isVeg: true, rating: 4.5, ratingCount: '1.2K' },

  // Mother's Veg Plaza
  { id: 'mv-1', restaurantId: 'mothers-veg-plaza', name: '3 Appam With Green Peas Masala (combo)', description: 'Soft lacy appams served with a comforting green peas masala curry.', price: 155, image: commonsImage('Appam with kadala curry from kerala.jpg', 300), isVeg: true, rating: 4.3, ratingCount: '23', isCustomisable: true, isBestseller: true },
  { id: 'mv-2', restaurantId: 'mothers-veg-plaza', name: '3 Appam With Paneer Butter Masala (combo)', description: 'Soft appams paired with rich paneer butter masala.', price: 165, image: commonsImage('Appam with kadala curry from kerala.jpg', 300), isVeg: true, rating: 4.6, ratingCount: '43', isCustomisable: true },
  { id: 'mv-3', restaurantId: 'mothers-veg-plaza', name: '3 Appam With Paneer Kadhai (combo)', description: 'Appams with a spiced kadhai-style paneer and bell pepper curry.', price: 185, image: commonsImage('Appam with kadala curry from kerala.jpg', 300), isVeg: true, rating: 3.9, ratingCount: '88', isCustomisable: true },
  { id: 'mv-4', restaurantId: 'mothers-veg-plaza', name: 'Veg Meals', description: 'Traditional Kerala vegetarian meal with rice, curries and payasam.', price: 140, image: commonsImage('A traditional veg thali at Karnataka.jpg', 300), isVeg: true, rating: 4.5, ratingCount: '3.1K', isBestseller: true },
  { id: 'mv-5', restaurantId: 'mothers-veg-plaza', name: 'Masala Dosa', description: 'Crisp dosa with spiced potato masala and chutneys.', price: 80, image: commonsImage('Dosai Chutney Hotel Saravana Bhavan.jpg', 300), isVeg: true, rating: 4.5, ratingCount: '2.2K' },
  { id: 'mv-6', restaurantId: 'mothers-veg-plaza', name: 'Butter Naan', description: 'Soft tandoor-baked naan brushed with butter.', price: 40, image: commonsImage('Butter Naan 2.jpg', 300), isVeg: true, rating: 4.4, ratingCount: '540' },

  // Hotel Aryaas
  { id: 'ha-1', restaurantId: 'hotel-aryaas', name: 'Veg Meals', description: 'Sadya-style meal with rice, avial, sambar, rasam and payasam.', price: 150, image: commonsImage('Meal BananaLeaf.JPG', 300), isVeg: true, rating: 4.6, ratingCount: '4.2K', isBestseller: true },
  { id: 'ha-2', restaurantId: 'hotel-aryaas', name: 'Masala Dosa', description: 'Golden crisp dosa with a spiced potato filling.', price: 85, image: commonsImage('Dosai Chutney Hotel Saravana Bhavan.jpg', 300), isVeg: true, rating: 4.5, ratingCount: '1.7K' },
  { id: 'ha-3', restaurantId: 'hotel-aryaas', name: 'Paneer Butter Masala', description: 'Paneer in a velvety butter and cashew tomato gravy.', price: 195, image: commonsImage('Paneer Butter Masala.jpg', 300), isVeg: true, rating: 4.4, ratingCount: '690', isCustomisable: true },
  { id: 'ha-4', restaurantId: 'hotel-aryaas', name: 'Payasam', description: "Traditional Kerala dessert of rice or vermicelli slow-cooked in milk and jaggery.", price: 70, image: commonsImage('Kheer.jpg', 300), isVeg: true, rating: 4.7, ratingCount: '1.3K', isBestseller: true },
  { id: 'ha-5', restaurantId: 'hotel-aryaas', name: 'Idli (2 pcs)', description: 'Soft steamed idlis with sambar and chutney.', price: 55, image: commonsImage('Idli Sambar.JPG', 300), isVeg: true, rating: 4.3, ratingCount: '810' },
  { id: 'ha-6', restaurantId: 'hotel-aryaas', name: 'Poori (2 pcs)', description: 'Fluffy deep-fried bread served with a mildly spiced potato curry.', price: 60, image: commonsImage('Poori or Puri.JPG', 300), isVeg: true, rating: 4.4, ratingCount: '520' },

  // Paragon
  { id: 'pg-1', restaurantId: 'paragon', name: 'Chicken Biryani', description: "Paragon's signature Malabar-style biryani with tender chicken and fried onions.", price: 260, image: commonsImage('Chicken Hyderabadi Biryani.JPG', 300), isVeg: false, rating: 4.7, ratingCount: '9.4K', isBestseller: true },
  { id: 'pg-2', restaurantId: 'paragon', name: 'Chicken 65', description: 'Crisp, tangy deep-fried chicken tossed with curry leaves.', price: 200, image: commonsImage('Chicken 65.jpg', 300), isVeg: false, rating: 4.5, ratingCount: '2.1K', isCustomisable: true },
  { id: 'pg-3', restaurantId: 'paragon', name: 'Butter Naan', description: 'Fluffy tandoor naan finished with a brush of butter.', price: 50, image: commonsImage('Butter Naan 2.jpg', 300), isVeg: true, rating: 4.5, ratingCount: '1.5K' },
  { id: 'pg-4', restaurantId: 'paragon', name: 'Chicken Fried Rice', description: 'Malabar-style fried rice tossed with chicken and spices.', price: 210, image: commonsImage('Chicken Fried Rice.JPG', 300), isVeg: false, rating: 4.4, ratingCount: '1.2K' },
  { id: 'pg-5', restaurantId: 'paragon', name: 'Masala Dosa', description: 'Crisp dosa served with a spiced potato masala filling.', price: 95, image: commonsImage('Dosai Chutney Hotel Saravana Bhavan.jpg', 300), isVeg: true, rating: 4.3, ratingCount: '760' },

  // Kerala Bhavan
  { id: 'kb-1', restaurantId: 'kerala-bhavan', name: 'Veg Meals', description: 'Home-style Kerala thali with rice, curries, pickle and papadam.', price: 130, image: commonsImage('A traditional veg thali at Karnataka.jpg', 300), isVeg: true, rating: 4.4, ratingCount: '1.6K', isBestseller: true },
  { id: 'kb-2', restaurantId: 'kerala-bhavan', name: 'Chicken Biryani', description: 'Home-style biryani with tender chicken and aromatic spices.', price: 200, image: commonsImage('Chicken Hyderabadi Biryani.JPG', 300), isVeg: false, rating: 4.3, ratingCount: '1.1K' },
  { id: 'kb-3', restaurantId: 'kerala-bhavan', name: 'Masala Dosa', description: 'Crisp dosa with classic spiced potato filling.', price: 75, image: commonsImage('Dosai Chutney Hotel Saravana Bhavan.jpg', 300), isVeg: true, rating: 4.4, ratingCount: '890' },
  { id: 'kb-4', restaurantId: 'kerala-bhavan', name: 'Idli (2 pcs)', description: 'Soft steamed rice cakes with sambar and chutney.', price: 50, image: commonsImage('Idli Sambar.JPG', 300), isVeg: true, rating: 4.3, ratingCount: '620' },
  { id: 'kb-5', restaurantId: 'kerala-bhavan', name: 'Butter Naan', description: 'Soft tandoor naan brushed with ghee.', price: 40, image: commonsImage('Butter Naan 2.jpg', 300), isVeg: true, rating: 4.2, ratingCount: '410' },
  { id: 'kb-6', restaurantId: 'kerala-bhavan', name: 'Pothichoru', description: 'Rice, curries and pickle packed banana-leaf style, just like the homemade original.', price: 120, image: commonsImage('A Thali, famous South Indian meal served on a banana leaf.jpg', 300), isVeg: true, rating: 4.5, ratingCount: '990', isBestseller: true },
];

export const menuCategories: Record<string, MenuCategory[]> = {
  'zam-zam-dosa-hut': [
    { id: 'meals-under-199', name: 'Meals Under 199', itemIds: ['zz-2', 'zz-5', 'zz-6', 'zz-7'] },
    { id: 'bestsellers', name: 'Bestsellers', itemIds: ['zz-1', 'zz-3', 'zz-4'] },
  ],
  'hotel-chinnus': [
    { id: 'bestsellers', name: 'Bestsellers', itemIds: ['hc-1', 'hc-2'] },
    { id: 'mains', name: 'Mains', itemIds: ['hc-3', 'hc-4', 'hc-5'] },
  ],
  'mothers-veg-plaza': [
    { id: 'meals-under-199', name: 'Meals Under 199', itemIds: ['mv-1', 'mv-2', 'mv-3'] },
    { id: 'appam-combos', name: 'Appam Combos', itemIds: ['mv-4', 'mv-5', 'mv-6'] },
  ],
  'hotel-aryaas': [
    { id: 'bestsellers', name: 'Bestsellers', itemIds: ['ha-1', 'ha-4'] },
    { id: 'mains', name: 'Mains', itemIds: ['ha-2', 'ha-3', 'ha-5', 'ha-6'] },
  ],
  paragon: [
    { id: 'bestsellers', name: 'Bestsellers', itemIds: ['pg-1', 'pg-2'] },
    { id: 'mains', name: 'Mains', itemIds: ['pg-3', 'pg-4', 'pg-5'] },
  ],
  'kerala-bhavan': [
    { id: 'bestsellers', name: 'Bestsellers', itemIds: ['kb-1', 'kb-6'] },
    { id: 'mains', name: 'Mains', itemIds: ['kb-2', 'kb-3', 'kb-4', 'kb-5'] },
  ],
};
