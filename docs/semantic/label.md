import { Sandpack } from '@site/src/components/MDX/Sandpack';
import { PageLinks } from '@site/src/components/MDX/PageLinks';

# useLabel

<PageLinks
  github="https://github.com/use-platform/use-platform/tree/master/src/semantic/label"
  storybook="https://use-platform.github.io/use-platform/?path=/story/semantic-label--default"
/>

React hook to create label component.

## API

Comming soon.

## Examples

### Simple label

Property `labelProps` should be spreaded on JSX label.<br/>
Property `fieldProps` should be spreaded on JSX input.

If no `id` attribute for input was provided, unique value will be generated automatically. `for` attribute will be generated on a label accordingly.

<Sandpack>

```tsx
import React from 'react'
import { useLabel } from 'web-platform-alpha'

export default function Label(props) {
    const { labelProps, fieldProps } = useLabel({
        ...props,
        behavior: 'label',
    })
    const { behavior: ElementTag } = props

    return (
        <div>
            <label {...labelProps}>
                Label
            </label>
            <input name="input" {...fieldProps} />
        </div>
    )
}
```

```css
label {
  margin-right: 1em;
}
```
</Sandpack>

### Element label

You may use arbitrary element as label. In this case do not set property `behavior`. All a11y attributes will be generated automatically.

<Sandpack>

```tsx
import React from 'react'
import { useLabel } from 'web-platform-alpha'

export default function Label(props) {
    const { labelProps, fieldProps } = useLabel(props)

    return (
        <div>
            <span {...labelProps}>
                Label
            </span>
            <input name="input" {...fieldProps} />
        </div>
    )
}
```

```css
label {
  margin-right: 1em;
}
```
</Sandpack>

