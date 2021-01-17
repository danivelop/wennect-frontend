/* External dependencies */
import _ from 'lodash'

type EventHandler<K extends keyof HTMLElementEventMap> = (
  event: HTMLElementEventMap[K],
) => any

export function listen<K extends keyof HTMLElementEventMap>(
  element: any,
  eventName: K,
  handler: EventHandler<K>,
) {
  if (!element) return _.noop

  element.addEventListener(eventName, handler)
  return function cleanup() {
    element.removeEventListener(eventName, handler)
  }
}
