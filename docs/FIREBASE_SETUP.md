# Firebase Console — настройка для StockForge AI

## 1. Authentication → Sign-in method

- Включите **Email/Password** (первый провайдер).
- При необходимости включите **Google** и укажите support email.

## 2. Authorized domains

**Authentication → Settings → Authorized domains** добавьте:

- `localhost` (для разработки)
- `stockforgeai.com`
- `www.stockforgeai.com` (если используете)

## 3. Web app config (для .env.local)

В **Project settings (шестерёнка) → General → Your apps** выберите веб-приложение (или создайте) и скопируйте:

- `apiKey`
- `authDomain`
- `projectId`
- `storageBucket`
- `messagingSenderId`
- `appId`

Вставьте в `.env.local` (см. `env.local.example`):

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

**Важно:** это конфиг для **клиентского** приложения. Сервисный аккаунт (private key) **не** кладите в репозиторий и **не** используйте в браузере — только на сервере при необходимости (например, Admin SDK).

## 4. Email verification template (опционально)

**Authentication → Templates → Email address verification:**

- Можно изменить текст письма и имя отправителя.
- Ссылка подтверждения по умолчанию ведёт на страницу Firebase; при кастомном домене настройте **Action URL** в настройках проекта при необходимости.

## 5. После настройки

1. Скопируйте `env.local.example` в `.env.local` и заполните значениями из п. 3.
2. Перезапустите `npm run dev`.
3. Проверьте: регистрация → письмо уходит → toast «Письмо отправлено»; неподтверждённый пользователь не попадает на `/portfolios`; после подтверждения — доступ есть; logout работает.
