interface ZehntelSliderProps {
  id: string;
  label: string;
  hint: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

export function ZehntelSlider({
  id,
  label,
  hint,
  min,
  max,
  value,
  onChange,
}: ZehntelSliderProps) {
  return (
    <div className="zehntel-field">
      <div className="zehntel-header">
        <label htmlFor={id}>{label}</label>
        <strong>{value % 1 === 0 ? `${value}/10` : `${value.toLocaleString('de-DE')}/10`}</strong>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={0.5}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <div className="zehntel-scale">
        <span>{min}/10</span>
        <span>{max}/10</span>
      </div>
      <p className="field-hint">{hint}</p>
    </div>
  );
}
