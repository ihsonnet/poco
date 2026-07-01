'use client';

import { useState } from 'react';

interface ThemeColorInputProps {
  name: string;
  label: string;
  value: string;
  hint?: string;
}

export function ThemeColorInput({ name, label, value, hint }: ThemeColorInputProps) {
  const [current, setCurrent] = useState(value);
  const pickerValue = /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(current) ? current : '#000000';

  return (
    <label className="admin-color-field">
      <span>{label}</span>
      <div className="admin-color-inputs">
        <input
          className="admin-color-code"
          name={name}
          value={current}
          onChange={(event) => setCurrent(event.target.value)}
          placeholder="#000000"
          spellCheck={false}
          autoComplete="off"
        />
        <input
          className="admin-color-picker"
          type="color"
          value={pickerValue}
          onChange={(event) => setCurrent(event.target.value)}
          aria-label={`${label} color picker`}
        />
      </div>
      {hint ? <small>{hint}</small> : null}
    </label>
  );
}
