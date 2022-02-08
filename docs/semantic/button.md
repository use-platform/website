import { Sandpack } from '@site/src/components/MDX/Sandpack';
import { PageLinks } from '@site/src/components/MDX/PageLinks';

# useButton

<PageLinks
  github="https://github.com/use-platform/use-platform/tree/master/src/semantic/button"
  storybook="https://use-platform.github.io/use-platform/?path=/story/semantic-button--default"
/>

React-hook for create button component.

## API

Comming soon.

## Examples

### Simple button

Property `buttonProps` should spread to jsx button.

<Sandpack>

```tsx
import React from 'react'
import { useButton } from 'web-platform-alpha'

export default function Button(props) {
  const ref = React.useRef(null)
  const { isPressed, buttonProps } = useButton(props, ref)

  return (
    <button {...buttonProps} ref={ref} data-pressed={isPressed}>
      Button
    </button>
  )
}
```

```css
button {
  color: red;
}

button[data-pressed="true"] {
  color: green;
}
```

</Sandpack>

### Link button

As additional property need set `as: a` and replace `button` jsx to `a`.

<Sandpack>

```tsx
import React from 'react'
import { useButton } from 'web-platform-alpha'

export default function Button(props) {
  const ref = React.useRef(null)
  const { isPressed, buttonProps } = useButton({ ...props, as: 'a' }, ref)

  return (
    <a {...buttonProps} ref={ref} data-pressed={isPressed} href="#">
      Button
    </a>
  )
}
```

</Sandpack>

### Hoverable button

React-hook `useHover` uses only for cursor supports devices.

<Sandpack>

```tsx
import React from 'react'
import { useButton, useHover, mergeProps } from 'web-platform-alpha'

export default function Button(props) {
  const ref = React.useRef(null)
  const { isPressed, buttonProps } = useButton(props, ref)
  const { isHovered, hoverProps } = useHover(props)

  return (
    <button
      {...mergeProps(buttonProps, hoverProps)}
      ref={ref}
      data-pressed={isPressed}
      data-hovered={isHovered}
    >
      Button
    </button>
  )
}
```

```css
button {
  color: red;
}

button[data-pressed="true"] {
  color: green;
}

button[data-hovered="true"] {
  color: yellow;
}
```

</Sandpack>
