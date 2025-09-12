# Аналитика портфолио

### Oписание
Это приложение поможет вам удобно анализировать просмотры вашего портфолио.

### Зависимости
- Hono (Web Server)
- Bun
- Sqlc
- Migrate

### Маршруты
- api/v1/session
  - **post**              api/v1/session/
  - **web socket**        api/v1/session/ws
  - **get**        *secure* api/v1/session/{id}
  - **patch**      *secure* api/v1/session/{id}
  - **delete**     *secure* api/v1/session/{id}
- api/v1/offer
  - *post*          api/v1/offer/
  - *get*    *secure* api/v1/offer/{id}
  - *delete* *secure* api/v1/offer/{id}
- api/v1/admin
  - *get*    *secure* api/v1/admin/{id} 
  - *patch*  *secure* api/v1/admin/{id} 
  - *delete* *secure* api/v1/admin/{id} 
- api/v1/auth
  - *post* *secure* api/v1/auth/login
  - *post* *secure* api/v1/auth/register
