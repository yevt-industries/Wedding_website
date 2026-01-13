# Cursor Build Spec — Content (EN/UA copy + placeholders)

This document contains the **content architecture** and **copy** (English + Ukrainian) that Cursor should implement using i18n keys.

Rules:
- Keep the site friendly but formal.
- Keep RSVP and Schedule as **placeholder** (details to come later).
- Do **not** mention on-site sleeping capacity or rooms.
- Include venue, dates, transport, and transfer providers.
- Include placeholders for color palette, dress code, menu options.
- Include a “placeholder schedule.”
- Provide a fully worded RSVP questionnaire (for later Google Form creation).

---

## 1) Global facts (source of truth)

- Couple names: **Oleh & Inna**
- Location: **Budva, Montenegro**
- Venue: **Villa Mona Lisa** (near Budva)
- Dates: **May 24–26, 2026**
- Likely guest arrival: **May 23, 2026**
- Airports:
  - Primary: **Podgorica Airport (TGD)**
- Transport recommendation:
  - Private transfer is the easiest
  - Bus is cheapest (Airport → Podgorica bus station → Budva) + taxi
- Transfers (publishable providers):
  - Go Montenegro (private transfers; route Podgorica airport → Budva) — include as provider
  - Red Taxi (Podgorica) — include as provider
  - Montenegro Travel Service — include as provider
  (Implement as “suggested providers”; guests can choose any.)

---

## 2) Page IA (what each page contains)

Pages to build:
- Home (`index.html`)
- Schedule (`schedule.html`)
- RSVP (`rsvp.html`)
- Event FAQ (`faq.html`)
- Travel & Stay (`travel.html`)
- Contact (`contact.html`)

Navigation label must exist in EN and UA.

---

## 3) Copy style guide (for Cursor)

- **Short paragraphs**. Prefer 1–3 lines.
- Use **clear headings**, not walls of text.
- Place important facts as **bullets** where appropriate.
- Keep placeholders clearly labeled “Details coming soon”.

---

## 4) i18n key map (what keys must exist)

At minimum, create:
- `nav.home`, `nav.schedule`, `nav.rsvp`, `nav.faq`, `nav.travel`, `nav.contact`
- `common.language`, `common.chooseLanguageTitle`, `common.english`, `common.ukrainian`
- `common.cta.rsvp`, `common.cta.schedule`, `common.cta.travel`
- Page groups:
  - `home.*`
  - `schedule.*`
  - `rsvp.*`
  - `faq.*`
  - `travel.*`
  - `contact.*`

Cursor should implement all strings below into `en.json` and `uk.json`.

---

## 5) English + Ukrainian copy (by page)

### 5.1 Home page (index.html)

**Hero**
- `home.heroTitle`: “Oleh & Inna”
- `home.heroSubtitle`: “May 24–26, 2026 • Budva, Montenegro”
- `home.heroTagline`: “Mediterranean, romantic, intimate, and fun.”

**Primary CTAs**
- `home.ctaPrimary`: “View Schedule”
- `home.ctaSecondary`: “RSVP (Details Coming Soon)”
- `home.ctaTertiary`: “Travel & Stay”

**Intro section**
- `home.introTitle`: “We can’t wait to celebrate with you”
- `home.introBody` (short):
  - “We’re inviting our closest people to spend a long weekend with us in Montenegro.”
  - “This site will be updated as we get closer — please check back for details.”

**Venue highlight**
- `home.venueTitle`: “Venue”
- `home.venueBody`:
  - “Villa Mona Lisa, near Budva”
  - “A private villa in the hills above Budva with views of the Adriatic.”

**Dates highlight**
- `home.datesTitle`: “Dates”
- `home.datesBody`: “May 24–26, 2026 (arrivals likely May 23)”

**Quick notes**
- `home.quickNotesTitle`: “Quick Notes”
- bullets:
  - `home.quickNotes.b1`: “Language: English / Ukrainian”
  - `home.quickNotes.b2`: “Schedule & RSVP details will be added soon”
  - `home.quickNotes.b3`: “Most guests will arrive via Podgorica Airport (TGD)”

**Photo placeholders**
- `home.galleryTitle`: “Photos”
- `home.galleryBody`: “A few moments and Montenegro inspiration.”

---

### 5.2 Schedule page (schedule.html) — placeholder schedule

**Page header**
- `schedule.title`: “Schedule”
- `schedule.subtitle`: “A long weekend together • Details coming soon”

**Placeholder schedule block**
- `schedule.placeholderTitle`: “Placeholder Weekend Outline”
- `schedule.placeholderNote`: “Exact timings and locations will be confirmed closer to the date.”

Three cards (each with title + bullets):
- May 24 (Sunday)
  - `schedule.day1.title`: “May 24 — Welcome”
  - `schedule.day1.b1`: “Evening welcome drinks & light bites”
  - `schedule.day1.b2`: “Dress code: TBD”
- May 25 (Monday)
  - `schedule.day2.title`: “May 25 — Wedding Day”
  - `schedule.day2.b1`: “Ceremony + dinner + celebration”
  - `schedule.day2.b2`: “Dress code: TBD”
- May 26 (Tuesday)
  - `schedule.day3.title`: “May 26 — After Party”
  - `schedule.day3.b1`: “Relaxed daytime gathering / brunch”
  - `schedule.day3.b2`: “Dress code: TBD”

**Callout**
- `schedule.callout`: “Please plan to arrive by May 23 if you can.”

---

### 5.3 RSVP page (rsvp.html) — placeholder + full questionnaire text

**Page header**
- `rsvp.title`: “RSVP”
- `rsvp.subtitle`: “We’ll publish the RSVP link closer to the date.”

**Primary CTA button**
- `rsvp.button`: “RSVP Link (Coming Soon)”
(Implement as a button with placeholder href.)

**Short explanation**
- `rsvp.body1`: “We’re keeping RSVP simple. You’ll receive a link to a short form to confirm attendance.”
- `rsvp.body2`: “Most guests are couples; we’ll collect details per person so we can plan comfortably.”

**RSVP deadline placeholder**
- `rsvp.deadlineTitle`: “RSVP Deadline”
- `rsvp.deadlineBody`: “TBD (we will update this page)”

#### RSVP Questionnaire (fully worded)
Cursor should render this as a clean list on the RSVP page (this is content only; later you will convert it into Google Forms).

Section A — About you
- `rsvp.q.titleA`: “A) About you”
- `rsvp.q.a1`: “Full name”
- `rsvp.q.a2`: “Email (optional, for updates)”
- `rsvp.q.a3`: “Phone (optional, for day‑of logistics)”

Section B — Attendance
- `rsvp.q.titleB`: “B) Attendance”
- `rsvp.q.b1`: “Will you attend the wedding weekend?”
  - answers: “Yes” / “No”
- `rsvp.q.b2`: “Who will be attending?”
  - options:
    - “Me”
    - “My partner (please write their name)”
    - “Other (please specify)”
- `rsvp.q.b3`: “Which events will you attend?” (check all that apply)
  - “May 24 — Welcome”
  - “May 25 — Wedding Day”
  - “May 26 — After Party”

Section C — Food
- `rsvp.q.titleC`: “C) Food”
- `rsvp.q.c1`: “Do you have any allergies or dietary restrictions?”
- `rsvp.q.c2`: “Menu choice (placeholder — details coming soon)”
  - options placeholder:
    - “Option 1 (TBD)”
    - “Option 2 (TBD)”
    - “Option 3 (TBD)”

Section D — Travel basics (optional but helpful)
- `rsvp.q.titleD`: “D) Travel (optional)”
- `rsvp.q.d1`: “Planned arrival date (approx.)”
- `rsvp.q.d2`: “Planned departure date (approx.)”
- `rsvp.q.d3`: “Are you flying into Podgorica (TGD)?”
  - answers: “Yes” / “No” / “Not sure”

Section E — Notes
- `rsvp.q.titleE`: “E) Notes”
- `rsvp.q.e1`: “Anything we should know?”

**Confirmation text placeholder**
- `rsvp.confirmation`: “Thank you — we can’t wait to celebrate with you. This website will be updated with details as we get closer.”

---

### 5.4 Event FAQ page (faq.html)

**Header**
- `faq.title`: “Event FAQ”
- `faq.subtitle`: “Helpful details • More to be added”

FAQ sections (render as accordion cards)

#### Basics
- `faq.basics.title`: “Basics”
- `faq.basics.q1`: “Where is the wedding?”
- `faq.basics.a1`: “Near Budva, Montenegro at Villa Mona Lisa.”
- `faq.basics.q2`: “What are the dates?”
- `faq.basics.a2`: “May 24–26, 2026. Many guests will arrive May 23.”

#### Dress code (placeholder)
- `faq.dress.title`: “Dress Code”
- `faq.dress.q1`: “What should I wear?”
- `faq.dress.a1`: “Dress code will be shared closer to the date. (Placeholder: TBD)”

#### Menu options (placeholder)
- `faq.menu.title`: “Menu”
- `faq.menu.q1`: “What will food be like?”
- `faq.menu.a1`: “Menu details will be shared closer to the date. (Placeholder: TBD)”

#### Gifts
- `faq.gifts.title`: “Gifts”
- `faq.gifts.q1`: “Is there a registry?”
- `faq.gifts.a1`: “Your presence is the biggest gift. More details (if any) will be shared later.”

#### Transport / getting around
- `faq.transport.title`: “Getting around”
- `faq.transport.q1`: “What’s the easiest way to get there?”
- `faq.transport.a1`: “Most guests will arrive via Podgorica Airport (TGD) and take a private transfer or taxi. Budget option: bus to Podgorica station, then bus to Budva.”

#### Updates
- `faq.updates.title`: “Updates”
- `faq.updates.q1`: “When will you share final details?”
- `faq.updates.a1`: “We’ll update the site closer to the date. Please check back for schedule timing, RSVP, dress code, and menu.”

---

### 5.5 Travel & Stay page (travel.html)

**Header**
- `travel.title`: “Travel & Stay”
- `travel.subtitle`: “How to get to Budva • Simple options”

#### Getting to Montenegro
- `travel.section1.title`: “Arriving”
- `travel.section1.body1`: “Most guests will fly into Podgorica Airport (TGD).”
- `travel.section1.body2`: “We recommend arriving on May 23 if possible.”

Optional note:
- `travel.section1.note`: “If you’re considering other airports, choose what’s easiest for your route.”

#### Transport from Podgorica Airport (TGD) to Budva area
- `travel.section2.title`: “From Podgorica Airport (TGD) to Budva”
- `travel.section2.intro`: “Private transfer is the easiest. Bus is the cheapest.”

**Option cards**
- `travel.opt1.title`: “Option 1 — Private transfer (recommended)”
- `travel.opt1.body`: “Door‑to‑door pickup, easiest with luggage or late arrivals.”
- `travel.opt2.title`: “Option 2 — Taxi”
- `travel.opt2.body`: “Confirm price before you start the ride.”
- `travel.opt3.title`: “Option 3 — Bus (budget)”
- `travel.opt3.body`: “Airport → Podgorica bus station → Budva, then taxi to the venue.”

#### Suggested transfer providers (publishable list)
Render as a list with names and brief notes. Use placeholders for links if needed.

- `travel.providers.title`: “Suggested transfer providers”
- Provider items:
  - `travel.providers.p1.name`: “Go Montenegro”
  - `travel.providers.p1.note`: “Private transfers • online booking”
  - `travel.providers.p2.name`: “Red Taxi (Podgorica)”
  - `travel.providers.p2.note`: “Taxi & airport pickups • call/WhatsApp”
  - `travel.providers.p3.name`: “Montenegro Travel Service”
  - `travel.providers.p3.note`: “Private transfers • request a quote”

#### Where to stay (do NOT mention villa sleeping)
- `travel.stay.title`: “Where to stay”
- `travel.stay.body1`: “We recommend staying in or near Budva for easiest access.”
- `travel.stay.body2`: “More specific recommendations will be added closer to the date.”

Optional bullet placeholders:
- `travel.stay.b1`: “Area suggestion #1 (TBD)”
- `travel.stay.b2`: “Area suggestion #2 (TBD)”
- `travel.stay.b3`: “Hotel/apartment suggestions (TBD)”

---

### 5.6 Contact page (contact.html)

**Header**
- `contact.title`: “Contact”
- `contact.subtitle`: “Questions? Reach out anytime.”

**Contact blocks**
- `contact.primary.title`: “For wedding questions”
- `contact.primary.body`: “Please contact us here:”
- placeholders:
  - `contact.primary.emailLabel`: “Email:”
  - `contact.primary.emailValue`: “TBD”
  - `contact.primary.phoneLabel`: “Phone / WhatsApp:”
  - `contact.primary.phoneValue`: “TBD”

**Day-of contact placeholder**
- `contact.dayof.title`: “Day‑of contact”
- `contact.dayof.body`: “We’ll share a day‑of contact closer to the date.”

---

## 6) Global placeholders (must appear somewhere on the site)

Cursor must include these placeholders as clearly labeled sections (best locations suggested):

### 6.1 Wedding color palette (placeholder)
Place on Home or FAQ (or both):
- `common.palette.title`: “Wedding Colors”
- `common.palette.body`: “Color palette will be shared closer to the date. (Placeholder: TBD)”

### 6.2 Dress code (placeholder)
Place on FAQ and in Schedule day cards:
- `common.dress.title`: “Dress Code”
- `common.dress.body`: “Details coming soon. (Placeholder: TBD)”

### 6.3 Menu options (placeholder)
Place on FAQ and RSVP:
- `common.menu.title`: “Menu”
- `common.menu.body`: “Details coming soon. (Placeholder: TBD)”

---

## 7) Ukrainian translations (uk.json) — provide complete equivalents

Below are recommended Ukrainian translations. Cursor should implement them as string values in `uk.json`.

### Navigation
- Home: “Головна”
- Schedule: “Розклад”
- RSVP: “RSVP”
- Event FAQ: “Питання та відповіді”
- Travel & Stay: “Дорога та проживання”
- Contact: “Контакти”

### Language modal
- “Choose language / Оберіть мову”
- English: “English”
- Ukrainian: “Українська”

### Home
- “Олег і Інна”
- “24–26 травня 2026 • Будва, Чорногорія”
- “Середземноморський настрій, романтика, камерність і веселощі.”
- “Переглянути розклад”
- “RSVP (деталі скоро)”
- “Дорога та проживання”
- “Ми дуже чекаємо, щоб відсвяткувати з вами”
- “Запрошуємо наших найближчих провести з нами довгі вихідні в Чорногорії.”
- “Сайт буде оновлюватися ближче до дати — будь ласка, заглядайте ще.”
- Venue:
  - “Локація”
  - “Villa Mona Lisa, біля Будви”
  - “Приватна вілла в пагорбах над Будвою з видом на Адріатику.”
- Dates:
  - “Дати”
  - “24–26 травня 2026 (ймовірний приїзд — 23 травня)”
- Quick Notes:
  - “Коротко”
  - bullets:
    - “Мови: англійська / українська”
    - “Розклад і RSVP з’являться скоро”
    - “Більшість гостей прилітає в аеропорт Подгориці (TGD)”
- Photos:
  - “Фото”
  - “Трохи наших моментів та натхнення Чорногорією.”

### Schedule
- “Розклад”
- “Довгі вихідні разом • Деталі скоро”
- “Орієнтовний план вихідних”
- “Точний час і локації підтвердимо ближче до дати.”
- Day cards:
  - “24 травня — Welcome”
  - “Вечірні вітальні напої та легкі закуски”
  - “Дрес-код: TBD”
  - “25 травня — День весілля”
  - “Церемонія + вечеря + святкування”
  - “Дрес-код: TBD”
  - “26 травня — After Party”
  - “Невимушена зустріч / бранч”
  - “Дрес-код: TBD”
- Callout:
  - “Якщо можете, плануйте приїзд до 23 травня.”

### RSVP
- “RSVP”
- “Посилання на RSVP опублікуємо ближче до дати.”
- “RSVP (скоро)”
- “Ми робимо RSVP максимально простим. Ви отримаєте посилання на коротку форму для підтвердження.”
- “Більшість гостей приїжджає парами; ми зберемо інформацію по кожній людині, щоб усе було комфортно.”
- Deadline:
  - “Дедлайн RSVP”
  - “TBD (оновимо цю сторінку)”
- Questionnaire headings:
  - “A) Про вас”
  - “Повне ім’я та прізвище”
  - “Email (необов’язково, для оновлень)”
  - “Телефон (необов’язково, для логістики в день події)”
  - “B) Присутність”
  - “Чи будете ви на весільному вікенді?”
  - “Так / Ні”
  - “Хто буде присутній?”
    - “Я”
    - “Мій/моя партнер(ка) (вкажіть ім’я)”
    - “Інше (уточніть)”
  - “На які події ви прийдете?”:
    - “24 травня — Welcome”
    - “25 травня — День весілля”
    - “26 травня — After Party”
  - “C) Їжа”
  - “Чи є у вас алергії або дієтичні обмеження?”
  - “Варіант меню (плейсхолдер — деталі скоро)”:
    - “Опція 1 (TBD)”
    - “Опція 2 (TBD)”
    - “Опція 3 (TBD)”
  - “D) Дорога (необов’язково)”
  - “Орієнтовна дата приїзду”
  - “Орієнтовна дата від’їзду”
  - “Ви прилітаєте в аеропорт Подгориці (TGD)?”
    - “Так / Ні / Не впевнений(-а)”
  - “E) Коментарі”
  - “Чи є щось, що нам варто знати?”
- Confirmation:
  - “Дякуємо — дуже чекаємо зустрічі. Сайт буде оновлюватися ближче до дати.”

### FAQ
- Title/subtitle:
  - “Питання та відповіді”
  - “Корисні деталі • Ще додамо інформацію”
- Basics:
  - “Основне”
  - “Де відбувається весілля?”
  - “Біля Будви, Чорногорія, на Villa Mona Lisa.”
  - “Які дати?”
  - “24–26 травня 2026. Багато гостей прилетять 23 травня.”
- Dress code placeholder:
  - “Дрес-код”
  - “Що вдягати?”
  - “Дрес-код повідомимо ближче до дати. (Placeholder: TBD)”
- Menu placeholder:
  - “Меню”
  - “Яка буде їжа?”
  - “Деталі меню повідомимо ближче до дати. (Placeholder: TBD)”
- Gifts:
  - “Подарунки”
  - “Чи буде реєстр подарунків?”
  - “Ваша присутність — найкращий подарунок. Якщо будуть деталі, повідомимо пізніше.”
- Transport:
  - “Як дістатися”
  - “Який найпростіший спосіб доїхати?”
  - “Більшість гостей прилітає в аеропорт Подгориці (TGD) і бере приватний трансфер або таксі. Бюджетний варіант: автобус до автовокзалу Подгориці, потім автобус до Будви.”
- Updates:
  - “Оновлення”
  - “Коли будуть фінальні деталі?”
  - “Ми оновимо сайт ближче до дати. Заглядайте за розкладом, RSVP, дрес-кодом і меню.”

### Travel & Stay
- “Дорога та проживання”
- “Як дістатися до Будви • Прості варіанти”
- Arriving:
  - “Приїзд”
  - “Більшість гостей прилітає в аеропорт Подгориці (TGD).”
  - “Рекомендуємо приїхати 23 травня, якщо можете.”
  - “Якщо розглядаєте інші аеропорти — обирайте найзручніший маршрут.”
- From TGD to Budva:
  - “З аеропорту Подгориці (TGD) до Будви”
  - “Найпростіше — приватний трансфер. Найдешевше — автобус.”
- Options:
  - “Варіант 1 — Приватний трансфер (рекомендуємо)”
  - “Зустріч в аеропорту й доставка до місця. Найзручніше з валізами або пізніми рейсами.”
  - “Варіант 2 — Таксі”
  - “Домовтеся про ціну перед поїздкою.”
  - “Варіант 3 — Автобус (бюджетно)”
  - “Аеропорт → автовокзал Подгориці → Будва, далі таксі до локації.”
- Providers:
  - “Рекомендовані сервіси трансферу”
  - “Go Montenegro — приватні трансфери • онлайн-бронювання”
  - “Red Taxi (Подгориця) — таксі та зустріч в аеропорту • дзвінок/WhatsApp”
  - “Montenegro Travel Service — приватні трансфери • запит ціни”
- Stay:
  - “Де зупинитися”
  - “Рекомендуємо зупинятися в Будві або поруч — так найзручніше.”
  - “Більш конкретні рекомендації додамо ближче до дати.”
  - bullets placeholders: “Район #1 (TBD)”, etc.

### Contact
- “Контакти”
- “Питання? Пишіть або телефонуйте.”
- “З питань щодо весілля”
- “Будь ласка, зв’яжіться з нами:”
- “Email: TBD”
- “Телефон / WhatsApp: TBD”
- “Контакт у день події”
- “Додамо контакт у день події ближче до дати.”

---

## 8) Content blocks Cursor should render as components

- Hero with photo background and text overlay
- “Quick Notes” icon bullet list
- Schedule placeholder cards (3)
- FAQ accordion
- Travel option cards + providers list
- Gallery grid with lightbox
- Contact cards

---

## 9) Notes for Cursor (content safety / what NOT to include)

- Do NOT mention:
  - number of bedrooms
  - sleeping capacity
  - who stays at the villa
- Keep RSVP and Schedule clearly labeled as “Details coming soon.”
- Don’t add registry links unless explicitly provided later.

