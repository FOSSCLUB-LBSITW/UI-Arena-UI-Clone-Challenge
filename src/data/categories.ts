import type { FoodCategory } from '../types';
import { commonsImage } from '../utils/images';

export const categories: FoodCategory[] = [
  { id: 'pothichoru', name: 'Pothichoru', image: commonsImage('A Thali, famous South Indian meal served on a banana leaf.jpg', 300) },
  { id: 'dosa', name: 'Dosa', image: commonsImage('Dosai Chutney Hotel Saravana Bhavan.jpg', 300) },
  { id: 'idli', name: 'Idli', image: commonsImage('Idli Sambar.JPG', 300) },
  { id: 'vada', name: 'Vada', image: commonsImage('Medu Vada.JPG', 300) },
  { id: 'poori', name: 'Poori', image: commonsImage('Poori or Puri.JPG', 300) },
  { id: 'appam', name: 'Appam', image: commonsImage('Appam with kadala curry from kerala.jpg', 300) },
  { id: 'biryani', name: 'Biryani', image: commonsImage('Chicken Biryani.jpg', 300) },
  { id: 'pizza', name: 'Pizza', image: commonsImage('Pizza quasi Margherita.jpg', 300) },
];
