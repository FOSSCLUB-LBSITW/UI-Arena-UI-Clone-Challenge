import { commonsImage } from '../utils/images';

export interface Offer {
  id: string;
  title: string;
  subtitle: string;
  code?: string;
  category: 'coupon' | 'restaurant' | 'bank';
  image?: string;
  icon: 'percent' | 'truck' | 'tag' | 'credit-card' | 'wallet';
  accent: string;
}

export const offers: Offer[] = [
  {
    id: 'off-1',
    title: '20% OFF on orders above ₹299',
    subtitle: 'Valid on selected restaurants, once per user',
    code: 'SWIGGY20',
    category: 'coupon',
    icon: 'percent',
    accent: 'bg-brand',
  },
  {
    id: 'off-2',
    title: 'Flat ₹125 OFF above ₹499',
    subtitle: 'Applicable on your first 3 orders',
    code: 'FIRST125',
    category: 'coupon',
    icon: 'tag',
    accent: 'bg-success',
  },
  {
    id: 'off-3',
    title: 'Free delivery on orders above ₹149',
    subtitle: 'No minimum order value for Swiggy One members',
    code: 'FREEDEL',
    category: 'coupon',
    icon: 'truck',
    accent: 'bg-help',
  },
  {
    id: 'off-4',
    title: '₹40 OFF above ₹499 at Zam Zam Dosa Hut',
    subtitle: 'Valid till stocks last · South Indian favourites',
    category: 'restaurant',
    image: commonsImage('Dosai Chutney Hotel Saravana Bhavan.jpg', 500),
    icon: 'tag',
    accent: 'bg-brand',
  },
  {
    id: 'off-5',
    title: "ITEMS AT ₹125 at Mother's Veg Plaza",
    subtitle: 'Combo meals starting at a flat price',
    category: 'restaurant',
    image: commonsImage('A Thali, famous South Indian meal served on a banana leaf.jpg', 500),
    icon: 'tag',
    accent: 'bg-success',
  },
  {
    id: 'off-6',
    title: '₹100 OFF above ₹399 at Paragon',
    subtitle: 'On the iconic Malabar biryani range',
    category: 'restaurant',
    image: commonsImage('Chicken Hyderabadi Biryani.JPG', 500),
    icon: 'tag',
    accent: 'bg-brand-dark',
  },
  {
    id: 'off-7',
    title: '10% instant discount with HDFC Bank cards',
    subtitle: 'Up to ₹75 off on credit and debit cards',
    code: 'HDFC10',
    category: 'bank',
    icon: 'credit-card',
    accent: 'bg-help',
  },
  {
    id: 'off-8',
    title: '5% cashback with Paytm UPI',
    subtitle: 'Cashback credited within 24 hours',
    code: 'PAYTM5',
    category: 'bank',
    icon: 'wallet',
    accent: 'bg-success',
  },
];
