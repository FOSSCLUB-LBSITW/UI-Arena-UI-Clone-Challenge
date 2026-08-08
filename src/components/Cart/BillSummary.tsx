import { computeBill, formatRupees } from '../../utils/format';

export default function BillSummary({ itemTotal }: { itemTotal: number }) {
  const { deliveryFee, platformFee, taxes, total } = computeBill(itemTotal);

  const rows: [string, number][] = [
    ['Item Total', itemTotal],
    ['Delivery Fee | 2.4 kms', deliveryFee],
    ['Platform Fee', platformFee],
    ['GST & Other Charges', taxes],
  ];

  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-wide text-ink-light">Bill Details</h3>
      <div className="mt-3 space-y-2.5">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between text-sm text-ink-light">
            <span>{label}</span>
            <span className="text-ink">{formatRupees(value)}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-dashed border-line pt-3">
        <span className="text-base font-bold text-ink">TO PAY</span>
        <span className="text-base font-bold text-ink">{formatRupees(total)}</span>
      </div>
    </div>
  );
}
