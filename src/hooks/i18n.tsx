import React, { useState, useRef, useEffect, useContext } from 'react'
import rosetta from 'rosetta'
import EN from '~/locales/en'
import JA from '~/locales/ja'

export const languages = ['ja', 'en'] as const
type Lang = typeof languages[number]
export const defaultLanguage: Lang = 'en'
export const contentLanguageMap: Record<Lang, string> = {
  ja: 'ja-JP',
  en: 'en-US'
}
const languageMap: Record<Lang, typeof EN> = {
  en: EN,
  ja: JA
}

const i18n = rosetta({
  en: EN
})

type I18nContext = {
  t: <K extends keyof typeof EN, V extends typeof EN[K]>(
    t: K,
    params?: V extends (...args: any) => any ? Parameters<V>[0] : undefined,
    lang?: string
  ) => string
  locale: (l: Lang, dict: any) => void
  activeLocale: Lang
  pageLocale?: Lang
}
export const I18nContext = React.createContext<I18nContext>(null as any)

// default language
i18n.locale(defaultLanguage)

export const I18n: React.FC<{ locale?: Lang }> = ({ children, locale }) => {
  const activeLocaleRef = useRef(locale || defaultLanguage)
  const [, setTick] = useState(0)
  const firstRender = useRef(true)

  const i18nWrapper = {
    activeLocale: activeLocaleRef.current,
    pageLocale: locale,
    // @ts-expect-error
    t: (...args: any) => i18n.t(...args),
    locale: (l: Lang, dict: any) => {
      i18n.locale(l)
      activeLocaleRef.current = l
      if (dict) {
        i18n.set(l, dict)
      }
      // force rerender to update view
      setTick((tick) => tick + 1)
    }
  }

  // for initial SSR render
  if (locale && firstRender.current === true) {
    firstRender.current = false
    i18nWrapper.locale(locale, languageMap[locale])
  }

  // when locale is updated
  useEffect(() => {
    if (locale) {
      i18nWrapper.locale(locale, languageMap[locale])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  return (
    <I18nContext.Provider value={i18nWrapper}>{children}</I18nContext.Provider>
  )
}

export function useI18n(): I18nContext {
  const ctx = useContext(I18nContext)
  useEffect(() => {
    if (
      !ctx.pageLocale &&
      typeof navigator !== 'undefined' &&
      navigator.languages
    ) {
      for (const lng of navigator.languages) {
        // @ts-expect-error
        let dic = languageMap[lng]
        if (dic) {
          ctx.locale(lng as Lang, dic)
          break
        }
        // fallback: en-US -> en
        const [_lng, ..._] = lng.split('-')
        // @ts-expect-error
        dic = languageMap[_lng]
        if (dic) {
          ctx.locale(_lng as Lang, dic)
          break
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return ctx
}
