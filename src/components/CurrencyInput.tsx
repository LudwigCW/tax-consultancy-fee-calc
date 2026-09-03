interface CurrencyInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  hint?: string;
}

export function CurrencyInput({ id, label, value, onChange, hint }: CurrencyInputProps) {
  return (
    <label className="field" htmlFor={id}>
      <span className="field-label">{label}</span>
      <div className="input-shell">
        <input
          id={id}
          type="number"
          min={0}
          step={1000}
          value={value || ''}
          onChange={(event) => onChange(Number(event.target.value) || 0)}
        />
        <span className="input-suffix">€</span>
      </div>
      {hint ? <span className="field-hint">{hint}</span> : null}
    </label>
  );
}
