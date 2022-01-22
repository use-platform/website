import React, { VFC, useRef, useState, useEffect } from 'react'
import { useSandpack, LoadingOverlay } from '@codesandbox/sandpack-react'

import { Error } from './Error'
import { computeViewportSize, generateRandomId } from './utils'
import styles from './Preview.module.css'

interface CustomPreviewProps {
  customStyle: Record<string, unknown>
  isExpanded: boolean
}

export const Preview: VFC<CustomPreviewProps> = (props) => {
  const { customStyle, isExpanded } = props
  const { sandpack, listen } = useSandpack()
  const [isReady, setIsReady] = useState(false)
  const [iframeComputedHeight, setComputedAutoHeight] = useState<number | null>(null)

  let {
    error: rawError,
    registerBundler,
    unregisterBundler,
    errorScreenRegisteredRef,
    openInCSBRegisteredRef,
    loadingScreenRegisteredRef,
  } = sandpack

  if (rawError && rawError.message === '_csbRefreshUtils.prelude is not a function') {
    rawError = null
  }
  const error = useDebounced(rawError)

  const clientId = useRef<string>(generateRandomId())
  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  openInCSBRegisteredRef.current = true
  errorScreenRegisteredRef.current = true
  loadingScreenRegisteredRef.current = true

  useEffect(() => {
    const iframeElement = iframeRef.current!
    registerBundler(iframeElement, clientId.current)

    const unsub = listen((message: any) => {
      if (message.type === 'resize') {
        setComputedAutoHeight(message.height)
      } else if (message.type === 'start') {
        if (message.firstLoad) {
          setIsReady(false)
        }
      } else if (message.type === 'test') {
        setIsReady(true)
      }
    }, clientId.current)

    return () => {
      unsub()
      unregisterBundler(clientId.current)
    }
  }, [])

  const viewportStyle = computeViewportSize('auto', 'portrait')
  const overrideStyle = error ? { maxHeight: undefined } : null
  const hideContent = !isReady || error

  return (
    <div
      className="sp-stack"
      style={{
        ...customStyle,
        ...viewportStyle,
        ...overrideStyle,
      }}
    >
      <div className={styles.Container}>
        <iframe
          ref={iframeRef}
          className={styles.Iframe}
          data-hidden={Boolean(hideContent)}
          title="Sandbox Preview"
          style={{
            height: iframeComputedHeight || '100%',
            zIndex: isExpanded ? 'initial' : -1,
          }}
        />
        {error && <Error error={error} />}
        <LoadingOverlay clientId={clientId.current} />
      </div>
    </div>
  )
}

function useDebounced(value: any) {
  const ref = useRef(null)
  const [saved, setSaved] = useState(value)

  useEffect(() => {
    clearTimeout(ref.current)
    ref.current = setTimeout(() => {
      setSaved(value)
    }, 300)
  }, [value])

  return saved
}
