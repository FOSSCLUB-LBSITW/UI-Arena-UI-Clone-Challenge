import React, { useState } from 'react';
import { MenuItem, SelectedOption } from '../types/swiggy';
import { useSwiggy } from '../context/SwiggyContext';
import { X, Check } from 'lucide-react';

interface CustomizationModalProps {
  item: MenuItem;
  restaurant: { id: string; name: string };
  onClose: () => void;
}

export const ItemCustomizationModal: React.FC<CustomizationModalProps> = ({
  item,
  restaurant,
  onClose
}) => {
  const { addToCart } = useSwiggy();

  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>(() => {
    // Select default options if available
    const initial: SelectedOption[] = [];
    if (item.optionGroups) {
      item.optionGroups.forEach(group => {
        if (group.options.length > 0) {
          initial.push({
            groupId: group.id,
            groupTitle: group.title,
            optionId: group.options[0].id,
            optionName: group.options[0].name,
            price: group.options[0].price
          });
        }
      });
    }
    return initial;
  });

  const [note, setNote] = useState('');

  const handleToggleOption = (
    groupId: string,
    groupTitle: string,
    optionId: string,
    optionName: string,
    price: number,
    maxSelect: number
  ) => {
    if (maxSelect === 1) {
      // Radio mode: replace existing in this group
      setSelectedOptions(prev => [
        ...prev.filter(o => o.groupId !== groupId),
        { groupId, groupTitle, optionId, optionName, price }
      ]);
    } else {
      // Checkbox mode: toggle
      setSelectedOptions(prev => {
        const exists = prev.some(o => o.groupId === groupId && o.optionId === optionId);
        if (exists) {
          return prev.filter(o => !(o.groupId === groupId && o.optionId === optionId));
        } else {
          return [...prev, { groupId, groupTitle, optionId, optionName, price }];
        }
      });
    }
  };

  const extraTotal = selectedOptions.reduce((sum, o) => sum + o.price, 0);
  const finalPrice = item.price + extraTotal;

  const handleConfirm = () => {
    addToCart(item, restaurant, selectedOptions, note);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 overflow-hidden relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center ${
                  item.type === 'veg' ? 'border-emerald-600' : 'border-red-600'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    item.type === 'veg' ? 'bg-emerald-600' : 'bg-red-600'
                  }`}
                />
              </span>
              <h3 className="font-extrabold text-slate-900 text-lg">{item.name}</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">Customise as per your taste</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Groups */}
        <div className="flex-1 overflow-y-auto py-4 space-y-6 pr-1">
          {item.optionGroups && item.optionGroups.length > 0 ? (
            item.optionGroups.map(group => (
              <div key={group.id} className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm flex items-center justify-between">
                  <span>{group.title}</span>
                  <span className="text-[11px] text-slate-400 font-normal">
                    {group.maxSelect === 1 ? 'Select 1 option' : 'Optional'}
                  </span>
                </h4>

                <div className="space-y-1.5">
                  {group.options.map(opt => {
                    const isSelected = selectedOptions.some(
                      o => o.groupId === group.id && o.optionId === opt.id
                    );
                    return (
                      <button
                        key={opt.id}
                        onClick={() =>
                          handleToggleOption(
                            group.id,
                            group.title,
                            opt.id,
                            opt.name,
                            opt.price,
                            group.maxSelect
                          )
                        }
                        className={`w-full flex items-center justify-between p-3 rounded-2xl border text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'border-orange-500 bg-orange-50/60 text-orange-900'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected
                                ? 'bg-orange-500 border-orange-500 text-white'
                                : 'border-slate-300'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                          <span>{opt.name}</span>
                        </div>
                        <span>{opt.price > 0 ? `+₹${opt.price}` : 'FREE'}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-500">Standard portion served.</p>
          )}

          {/* Cooking Instructions note */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Cooking Instructions (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Make it less spicy, no onions..."
              value={note}
              onChange={e => setNote(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-hidden focus:border-orange-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Footer Button */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Total Price</div>
            <div className="text-xl font-black text-slate-900">₹{finalPrice}</div>
          </div>

          <button
            onClick={handleConfirm}
            className="py-3.5 px-8 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-orange-500/25 transition-all cursor-pointer uppercase tracking-wider"
          >
            Add Item to Cart
          </button>
        </div>

      </div>
    </div>
  );
};
