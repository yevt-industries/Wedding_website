const I18n = (() => {
  const STORAGE_KEY = 'lang';
  const DEFAULT_LANG = 'en';
  const SUPPORTED_LANGS = ['en', 'uk'];
  
  let currentLang = DEFAULT_LANG;
  let dictionaries = {};

  function getSavedLang() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_LANGS.includes(stored)) {
      return stored;
    }
    return null;
  }

  function setStoredLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
  }

  function getUrlLang() {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get('lang');
    if (lang && SUPPORTED_LANGS.includes(lang)) {
      return lang;
    }
    return null;
  }

  async function loadDictionary(lang) {
    if (dictionaries[lang]) {
      return dictionaries[lang];
    }

    try {
      const response = await fetch(`/assets/i18n/${lang}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load ${lang}.json`);
      }
      dictionaries[lang] = await response.json();
      return dictionaries[lang];
    } catch (error) {
      console.error(`Error loading dictionary for ${lang}:`, error);
      return null;
    }
  }

  async function preloadDictionaries() {
    await Promise.all(SUPPORTED_LANGS.map(loadDictionary));
  }

  function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : null;
    }, obj);
  }

  function applyTranslations(lang) {
    const dict = dictionaries[lang];
    if (!dict) {
      console.error(`Dictionary not loaded for ${lang}`);
      return;
    }

    document.documentElement.lang = lang;
    document.documentElement.dir = 'ltr';

    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const value = getNestedValue(dict, key);
      if (value !== null) {
        element.textContent = value;
      }
    });

    document.querySelectorAll('[data-i18n-html]').forEach(element => {
      const key = element.getAttribute('data-i18n-html');
      const value = getNestedValue(dict, key);
      if (value !== null) {
        element.innerHTML = value;
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      const value = getNestedValue(dict, key);
      if (value !== null) {
        element.placeholder = value;
      }
    });

    currentLang = lang;
    updateLangToggle(lang);
  }

  function updateLangToggle(lang) {
    document.querySelectorAll('.lang-toggle button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  async function setLang(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) {
      console.error(`Unsupported language: ${lang}`);
      return;
    }

    await loadDictionary(lang);
    applyTranslations(lang);
    setStoredLang(lang);
  }

  function getCurrentLang() {
    return currentLang;
  }

  async function init() {
    const urlLang = getUrlLang();
    if (urlLang) {
      setStoredLang(urlLang);
      await loadDictionary(urlLang);
      applyTranslations(urlLang);
      return { showModal: false, lang: urlLang };
    }

    const savedLang = getSavedLang();
    if (savedLang) {
      await loadDictionary(savedLang);
      applyTranslations(savedLang);
      return { showModal: false, lang: savedLang };
    }

    await preloadDictionaries();
    return { showModal: true, lang: null };
  }

  return {
    init,
    setLang,
    getCurrentLang,
    getSavedLang,
    applyTranslations,
    loadDictionary,
    preloadDictionaries,
    SUPPORTED_LANGS,
    DEFAULT_LANG
  };
})();

export default I18n;
