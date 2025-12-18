// Form Kit - Dynamic Fields Hook
// 동적 필드 관리 hook

import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface DynamicFieldItem {
  id: string;
  [key: string]: unknown;
}

interface UseDynamicFieldsOptions<T extends DynamicFieldItem> {
  initialItems?: T[];
  maxItems?: number;
  minItems?: number;
  createItem?: () => Omit<T, 'id'>;
}

interface UseDynamicFieldsReturn<T extends DynamicFieldItem> {
  items: T[];
  addItem: (item?: Omit<T, 'id'>) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<Omit<T, 'id'>>) => void;
  moveItem: (fromIndex: number, toIndex: number) => void;
  clearItems: () => void;
  canAdd: boolean;
  canRemove: boolean;
}

export function useDynamicFields<T extends DynamicFieldItem>({
  initialItems = [],
  maxItems = Infinity,
  minItems = 0,
  createItem = () => ({}) as Omit<T, 'id'>,
}: UseDynamicFieldsOptions<T> = {}): UseDynamicFieldsReturn<T> {
  const [items, setItems] = useState<T[]>(
    initialItems.length > 0
      ? initialItems
      : minItems > 0
        ? Array.from(
            { length: minItems },
            () =>
              ({
                id: uuidv4(),
                ...createItem(),
              }) as T
          )
        : []
  );

  const canAdd = items.length < maxItems;
  const canRemove = items.length > minItems;

  const addItem = useCallback(
    (item?: Omit<T, 'id'>) => {
      if (!canAdd) return;

      setItems((prev) => [
        ...prev,
        {
          id: uuidv4(),
          ...(item ?? createItem()),
        } as T,
      ]);
    },
    [canAdd, createItem]
  );

  const removeItem = useCallback(
    (id: string) => {
      if (!canRemove) return;

      setItems((prev) => prev.filter((item) => item.id !== id));
    },
    [canRemove]
  );

  const updateItem = useCallback(
    (id: string, updates: Partial<Omit<T, 'id'>>) => {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
      );
    },
    []
  );

  const moveItem = useCallback((fromIndex: number, toIndex: number) => {
    setItems((prev) => {
      const newItems = [...prev];
      const [removed] = newItems.splice(fromIndex, 1);
      newItems.splice(toIndex, 0, removed);
      return newItems;
    });
  }, []);

  const clearItems = useCallback(() => {
    setItems(
      minItems > 0
        ? Array.from(
            { length: minItems },
            () =>
              ({
                id: uuidv4(),
                ...createItem(),
              }) as T
          )
        : []
    );
  }, [minItems, createItem]);

  return {
    items,
    addItem,
    removeItem,
    updateItem,
    moveItem,
    clearItems,
    canAdd,
    canRemove,
  };
}
