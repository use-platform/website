import React, { VFC } from 'react'

import { GitHub } from './GitHub'
import { Storybook } from './Storybook'
import styles from './PageLinks.module.css'

interface PageLinksProps {
  github?: string
  storybook?: string
  issues?: string
}

export const PageLinks: VFC<PageLinksProps> = (props) => {
  const { github, storybook, issues } = props

  return (
    <div className={styles.Container}>
      {github && <PageLink type="github" href={github} />}
      {storybook && <PageLink type="storybook" href={storybook} />}
      {issues && <PageLink type="issues" href={issues} />}
    </div>
  )
}

interface PageLinkProps {
  type: string
  href: string
}

const PageLink: VFC<PageLinkProps> = (props) => {
  const { href, type } = props
  const Icon = icons[type]
  const { text, description } = texts[type]

  return (
    <a className={styles.Link} href={href} target="_blank">
      <Icon />
      <div className={styles.LinkInner}>
        <span className={styles.LinkText}>{text}</span>
        <span className={styles.LinkDescription}>{description}</span>
      </div>
    </a>
  )
}

const icons: Record<string, any> = {
  github: GitHub,
  storybook: Storybook,
}

const texts: Record<string, { text: string; description: string }> = {
  github: { text: 'View repository', description: 'GitHub' },
  storybook: { text: 'View examples', description: 'Storybook' },
}
