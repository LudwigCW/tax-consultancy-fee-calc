import type { ChangeEvent } from 'react';

interface CurrencyInputProps {
  id: string;
  label: string;
  value: number;
  locale: string;
  onChange: (value: number) => void;
  hint?: string;
}

export function CurrencyInput({ id, label, value, locale, onChange, hint }: CurrencyInputProps) {
  const displayValue = value === 0 ? '' : new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const digits = event.target.value.replace(/\D/g, '');
    onChange(digits === '' ? 0 : Number(digits));
  };

  return (
    <label className="field" htmlFor={id}>
      <span className="field-label">{label}</span>
      <div className="input-shell">
        <input
          id={id}
          type="text"
          inputMode="numeric"
          value={displayValue}
          onChange={handleChange}
        />
        <span className="input-suffix">€</span>
      </div>
      {hint ? <span className="field-hint">{hint}</span> : null}
    </label>
  );
}
