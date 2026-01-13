const I18n = (() => {
  const STORAGE_KEY = 'lang';
  const DEFAULT_LANG = 'en';
  const SUPPORTED_LANGS = ['en', 'uk'];
  
  let currentLang = DEFAULT_LANG;
  let dictionaries = {};

  function getStoredLang() {
    return localStorage.getItem(STORAGE_KEY);
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

  function detectLang() {
    const urlLang = getUrlLang();
    if (urlLang) {
      setStoredLang(urlLang);
      return urlLang;
    }
    
    const storedLang = getStoredLang();
    if (storedLang && SUPPORTED_LANGS.includes(storedLang)) {
      return storedLang;
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

  function needsLangModal() {
    return !getStoredLang();
  }

  async function init() {
    const detectedLang = detectLang();
    
    if (detectedLang) {
      await loadDictionary(detectedLang);
      applyTranslations(detectedLang);
      return { showModal: false, lang: detectedLang };
    }

    await Promise.all(SUPPORTED_LANGS.map(loadDictionary));
    return { showModal: true, lang: null };
  }

  return {
    init,
    setLang,
    getCurrentLang,
    needsLangModal,
    applyTranslations,
    loadDictionary,
    SUPPORTED_LANGS,
    DEFAULT_LANG
  };
})();

export default I18n;

