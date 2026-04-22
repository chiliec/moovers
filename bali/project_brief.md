# MAXX'S GROUP INTERNATIONAL — Project Brief

---

## 1. Продукт (простыми словами)

One-stop юридический и деловой сервис для иностранцев в Индонезии. Снимают весь стресс индонезийской бюрократии: виза, ВНЖ, открытие компании, недвижимость, таможня — под ключ, с 2007 года, 5 офисов по стране.

**Новинка:** личный кабинет — клиент загружает документы онлайн и видит статус заявки в реальном времени.

---

## 2. Аудитория

| Сегмент | Боль | Мотивация |
|--------|------|-----------|
| Экспат-физлицо (Бали / Джакарта) | Не понимает визовую систему, боится ошибки → депортация | Жить легально, без тревоги |
| Иностранный инвестор | Не знает как открыть PT PMA, теряется в лицензиях | Войти на рынок быстро и безопасно |
| Иностранная компания (выход на рынок) | Нет локального партнёра, незнание местных законов | Надёжный проводник, одно окно |
| Digital nomad / remote worker | Путается в типах виз, не знает что легально | Простое понятное решение |

---

## 3. Оффер

**Основной:**
> "We handle Indonesia's bureaucracy so you don't have to. Since 2007."

**Расширенный (для подзаголовка):**
> Visas, residency, company setup, property — all in one place. Track your documents online, anytime.

**Формула:** [Легальная жизнь/работа/бизнес в Индонезии] + [для иностранцев и компаний] + [за счёт 17 лет экспертизы + личного кабинета] + [единственный one-stop с онлайн-трекингом]

---

## 4. Gap Detection

| | |
|--|--|
| ⚠️ "Trusted & Reliable" | Пустые слова. Нужны цифры: 17 лет, X клиентов, X виз оформлено |
| ⚠️ 5 направлений = размытый фокус | Клиент не знает с чего начать. Нужен квиз/навигатор по ситуации |
| ⚠️ Нет контактного email | Только careers@ — рискованно для конверсии |
| ⚠️ Сайт упал | Нет срочности для редиректа, но есть срочность для запуска |
| 💡 Личный кабинет | Огромный дифференциатор. Конкуренты не предлагают — вынести в Hero |
| 💡 17 лет = 2007 год | Якорь доверия — использовать как headline |
| 💡 5 офисов | "Мы рядом где бы вы ни были в Индонезии" |
| 💡 Instagram 8400 | Social proof есть — подтянуть на сайт |

---

## 5. Тексты для лендинга

### Hero
**Заголовок:** We handle Indonesia's bureaucracy so you don't have to.
**Подзаголовок:** Visas, residency, company setup and more — trusted by expats and investors since 2007. Track your documents online in your personal dashboard.
**CTA primary:** Get a Free Consultation
**CTA secondary:** WhatsApp Us Now

---

### Problem
Living and doing business in Indonesia shouldn't mean drowning in paperwork.

Wrong visa type. Missed deadlines. Documents in Bahasa you can't read. One mistake can cost you months — or your stay in Indonesia.

---

### Solution
Maxx's Group has been solving exactly this since 2007.

We are Indonesia's one-stop legal and business service for foreigners — from your first visa to opening a company and buying property. One team. Five offices. Zero confusion.

---

### Benefits
- Legal clarity — we know every regulation so you don't have to
- One-stop — no running between 5 agencies
- 17 years on the market — we've seen every case
- Real-time tracking — upload docs and check status in your personal cabinet
- Local presence — offices in Jakarta, Bali (Ubud + Denpasar), Surabaya, Lombok

---

### How it works
1. **Consult** — free call or WhatsApp to understand your situation
2. **Upload** — submit your documents via personal cabinet
3. **Relax** — we handle everything, you track progress online

---

### Social proof
- Since 2007 · 5+ offices · 51–200 specialists
- Instagram: @maxxsgroupinternational (8,400+ followers)
- *(место для отзывов и кейсов — нужно собрать)*

---

### Services block

| Legal | Property | Export/Import | Hospitality | Recruitment |
|--|--|--|--|--|
| KITAS, KITAP, PT PMA, лицензии | Сделки с недвижимостью | Таможня, сертификация | Travel | Подбор персонала |

---

### CTA (финальный)
**Ready to make Indonesia simple?**
Book your free consultation today — our team in Jakarta, Bali, Surabaya or Lombok is ready to help.

[Get Started] [WhatsApp]

---

## 6. UX рекомендации

- **Стиль:** Тёплый профессиональный. Не холодный корпоратив, не пляжная расслабленность. Тон: надёжный друг с экспертизой.
- **Цвета:** Тропические нейтралы (кремовый, тёмно-зелёный, белый) + акцент. Не типичный "юридический синий".
- **Фото:** Реальные офисы + живые люди (не стоки). Бали-атмосфера без кича.
- **Mobile-first:** Главный CTA — WhatsApp (кнопка фиксированная снизу на мобайле).
- **Навигатор:** "What do you need?" — квиз из 2-3 кликов → вывод нужной услуги. Решает проблему размытого фокуса.
- **Личный кабинет:** Отдельный вход в шапке. В Hero — скриншот/мокап интерфейса как элемент доверия.

---

## 7. Структура сайта

```
PUBLIC (лендинг)
├── / — Hero + навигатор по услугам
├── /services/legal — KITAS, KITAP, PT PMA, лицензии
├── /services/property
├── /services/export-import
├── /services/hospitality
├── /services/recruitment
├── /offices — карта + контакты всех офисов
├── /about — история, команда, цифры
├── /blog — контент (SEO + доверие)
└── /contact

AUTH (личный кабинет)
├── /login
├── /register
├── /dashboard — обзор заявок
├── /applications — список всех дел
│   ├── /applications/:id — статус + таймлайн
│   └── /applications/:id/documents — загрузка файлов
├── /documents — все загруженные документы
├── /messages — чат с менеджером
└── /profile — данные клиента

ADMIN (внутренняя панель)
├── /admin/clients
├── /admin/applications — обновление статусов
├── /admin/documents — просмотр загрузок
└── /admin/messages
```

---

## 8. Контакты (справочно)

| Офис | Телефон |
|--|--|
| Jakarta (HQ) | +62 812-2822-9384, +62 813-8687-6886 |
| Surabaya | +62 895-3267-68860 |
| Ubud, Bali | +62 812-3776-2007, +62 853-3721-3413 |
| Denpasar/Kerobokan, Bali | +62 812-3600-5884, +62 878-6543-3591 |
| Lombok | +62 895-1047-3432 |

**HQ адрес:** Lippo Kuningan Building, 19F, Unit B, Jl. HR Rasuna Said Kav. B12, South Jakarta
**Email:** careers@maxxsgroup.com *(нужен general contact)*
**Соцсети:** Instagram @maxxsgroupinternational · Facebook /maxxsgroup · LinkedIn PT Maxx's Group Internasional
**Сайт:** maxxsgroup.com *(сейчас не работает)*

---

## 9. Риски и улучшения

- ⚠️ Нет кейсов и отзывов — критично для доверия. Собрать 5-7 до запуска.
- ⚠️ Один email (careers@) — нужен info@ или форма обратной связи
- ⚠️ Личный кабинет = сложная разработка. MVP вариант: статус через форму без real-time
- 💡 Multilingual: EN обязателен, добавить ZH и RU (аудитория есть)
- 💡 WhatsApp Business API — уведомления о статусе прямо в мессенджер
- 💡 SEO приоритеты: "bali visa consultant", "kitas bali", "PT PMA Indonesia"

---

## 10. Открытые вопросы

1. Сколько активных клиентов одновременно — влияет на архитектуру кабинета
2. Кто обновляет статусы — менеджеры вручную или автоматически?
3. Есть ли CRM/система учёта заявок сейчас?
4. Бюджет и сроки — MVP или полный продукт?
5. Приоритет языков: EN / RU / ZH / ID?
6. Нужен ли блог/SEO с первой версии?
