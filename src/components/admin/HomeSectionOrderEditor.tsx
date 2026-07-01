'use client';

import { GripVertical } from 'lucide-react';
import { useMemo, useState } from 'react';
import { HOME_SECTION_ITEMS, type HomeSectionKey } from '@/lib/homeSections';

interface HomeSectionOrderEditorProps {
  name: string;
  value: HomeSectionKey[];
}

const sectionMap = new Map(HOME_SECTION_ITEMS.map((item) => [item.key, item]));

export function HomeSectionOrderEditor({ name, value }: HomeSectionOrderEditorProps) {
  const initial = useMemo(() => {
    const known = value.filter((key) => sectionMap.has(key));
    const missing = HOME_SECTION_ITEMS.map((item) => item.key).filter((key) => !known.includes(key));
    return [...known, ...missing];
  }, [value]);

  const [order, setOrder] = useState<HomeSectionKey[]>(initial);
  const [dragging, setDragging] = useState<HomeSectionKey | null>(null);

  const move = (from: number, to: number) => {
    if (to < 0 || to >= order.length || from === to) return;

    setOrder((current) => {
      const next = [...current];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  };

  return (
    <div className="admin-reorder-editor">
      <input type="hidden" name={name} value={order.join('\n')} />
      <div className="admin-reorder-head">
        <p>Drag sections to reorder the homepage flow, or use the up/down controls for precise moves.</p>
      </div>
      <div className="admin-reorder-list">
        {order.map((key, index) => {
          const item = sectionMap.get(key);
          if (!item) return null;

          return (
            <div
              key={key}
              className={`admin-reorder-card${dragging === key ? ' dragging' : ''}`}
              draggable
              onDragStart={() => setDragging(key)}
              onDragEnd={() => setDragging(null)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                if (!dragging || dragging === key) return;
                const from = order.indexOf(dragging);
                const to = order.indexOf(key);
                move(from, to);
                setDragging(null);
              }}
            >
              <div className="admin-reorder-card-main">
                <div className="admin-reorder-handle" aria-hidden="true">
                  <GripVertical size={16} strokeWidth={2} />
                </div>
                <div className="admin-reorder-copy">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{item.label}</strong>
                  <p>{item.description}</p>
                </div>
              </div>
              <div className="admin-reorder-actions">
                <button type="button" onClick={() => move(index, index - 1)} disabled={index === 0}>↑</button>
                <button type="button" onClick={() => move(index, index + 1)} disabled={index === order.length - 1}>↓</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
