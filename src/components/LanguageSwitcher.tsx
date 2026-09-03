interface LanguageSwitcherProps {
  language: 'de' | 'zh';
  onChange: (language: 'de' | 'zh') => void;
  label: string;
  deLabel: string;
  zhLabel: string;
}

export function LanguageSwitcher({
  language,
  onChange,
  label,
  deLabel,
  zhLabel,
}: LanguageSwitcherProps) {
  return (
    <div className="language-switcher" role="group" aria-label={label}>
      <button
        type="button"
        className={language === 'de' ? 'lang-button active' : 'lang-button'}
        onClick={() => onChange('de')}
        aria-pressed={language === 'de'}
      >
        {deLabel}
      </button>
      <button
        type="button"
        className={language === 'zh' ? 'lang-button active' : 'lang-button'}
        onClick={() => onChange('zh')}
        aria-pressed={language === 'zh'}
      >
        {zhLabel}
      </button>
    </div>
  );
}
