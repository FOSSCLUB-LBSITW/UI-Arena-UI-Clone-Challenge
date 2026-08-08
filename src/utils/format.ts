export function formatRupees(amount: number): string {
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}

/** Extracts the first number found in a delivery time string like "30-35 mins" -> 30 */
export function parseDeliveryMinutes(deliveryTime: string): number {
  const match = deliveryTime.match(/\d+/);
  return match ? parseInt(match[0], 10) : Number.MAX_SAFE_INTEGER;
}

/** Extracts the numeric cost from a string like "₹250 for two" -> 250 */
export function parseCostForTwo(costForTwo: string): number {
  const match = costForTwo.replace(/,/g, '').match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

export interface BillBreakdown {
  itemTotal: number;
  deliveryFee: number;
  platformFee: number;
  taxes: number;
  total: number;
}

/** Shared bill math so the cart, checkout, and confirmation screens always agree on the total. */
export function computeBill(itemTotal: number): BillBreakdown {
  const deliveryFee = itemTotal > 0 ? 23 : 0;
  const platformFee = itemTotal > 0 ? 6 : 0;
  const taxes = Math.round(itemTotal * 0.05);
  return { itemTotal, deliveryFee, platformFee, taxes, total: itemTotal + deliveryFee + platformFee + taxes };
}
