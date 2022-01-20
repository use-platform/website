# useButton

[GitHub](#) • [Storybook](#) • [Issues](#)

Хук для создания компонента кнопки.

## API

???

## Пример использования

> В данных примерах не используется хук `useHover`, так как данное поведение является опциональным.

### Простая кнопка

```tsx
const ref = useRef(null)
const { isPressed, buttonProps } = useButton(props, ref)

return (
  <button {...buttonProps} ref={ref} data-pressed={isPressed}>
    Button
  </button>
)
```

### Кнопка ссылка

В качестве дополнительной опции необходимо указать `as` с необходимым html-элементом.

```tsx
const ref = useRef(null)
const { isPressed, buttonProps } = useButton({ ...props, as: 'a' }, ref)

return (
  <a {...buttonProps} ref={ref} data-pressed={isPressed} href="#">
    Button
  </a>
)
```
