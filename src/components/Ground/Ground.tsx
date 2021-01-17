/* External dependencies */
import React, { useEffect, useCallback, useRef } from 'react'
import classNames from 'classnames/bind'

/* Internal dependencies */
import MovementService from 'services/MovementService'
import { listen } from 'utils/eventUtils'
import styles from './Ground.module.scss'

const cx = classNames.bind(styles)

function Ground() {
  const target = useRef<HTMLDivElement>(null)
  const topRef = useRef(400)
  const leftRef = useRef(900)
  const MovementRef = useRef<MovementService>()

  const handleKeyDown = useCallback((event: HTMLElementEventMap['keydown']) => {
    MovementRef.current?.moveStart(event.key)
  }, [])

  const handleKeyUp = useCallback((event: HTMLElementEventMap['keyup']) => {
    MovementRef.current?.moveEnd(event.key)
  }, [])

  const handleMove = useCallback((offsetX: number, offsetY: number) => {
    if (target.current) {
      leftRef.current += offsetX
      topRef.current += offsetY
      target.current.style.top = `${topRef.current}px`
      target.current.style.left = `${leftRef.current}px`
    }
  }, [])

  useEffect(() => {
    const removeDocumentKeyDownListener = listen(
      document,
      'keydown',
      handleKeyDown,
    )
    const removeDocumentKeyUpListener = listen(document, 'keyup', handleKeyUp)

    return function cleanup() {
      removeDocumentKeyDownListener()
      removeDocumentKeyUpListener()
    }
  }, [handleKeyDown, handleKeyUp])

  useEffect(() => {
    MovementRef.current = new MovementService({
      handler: handleMove,
    })

    return function cleanup() {
      MovementRef.current = undefined
    }
  }, [handleMove])

  return (
    <div className={cx('container')}>
      <div className={cx('target', 'first')} />
      <div ref={target} className={cx('target', 'second')} />
    </div>
  )
}

export default Ground
