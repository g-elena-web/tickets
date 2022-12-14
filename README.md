## 1. Билеты на событие ##

Предлагаю следующий конечный вид таблицы:

id  | order_id  | event_id  | event_date          | ticket_type  | ticket_price  | barcode   | user_id  | created
--- | --------- | --------- | ------------------- | ------------ | ------------  | --------- | -------- | -------------------
1   | 001       | 003       | 2021-08-21 13:00:00 | "Взрослый"   | 700           | 11111111  | 00451    | 2021-01-11 13:22:09
2   | 002       | 006       | 2021-07-29 18:00:00 | "Детский"    | 800           | 22222222  | 00364    | 2021-01-12 16:62:08
3   | 002       | 006       | 2021-07-29 18:00:00 | "Детский"    | 800           | 33333333  | 00364    | 2021-01-12 16:62:08
4   | 003       | 003       | 2021-08-15 17:00:00 | "Взрослый"   | 700           | 44444444  | 00015    | 2021-01-13 10:08:45
5   | 003       | 003       | 2021-08-15 17:00:00 | "Взрослый"   | 700           | 55555555  | 00015    | 2021-01-13 10:08:45
6   | 003       | 003       | 2021-08-15 17:00:00 | "Взрослый"   | 700           | 66666666  | 00015    | 2021-01-13 10:08:45
7   | 003       | 003       | 2021-08-15 17:00:00 | "Взрослый"   | 700           | 77777777  | 00015    | 2021-01-13 10:08:45
8   | 003       | 003       | 2021-08-15 17:00:00 | "Детский"    | 450           | 88888888  | 00015    | 2021-01-13 10:08:45
9   | 003       | 003       | 2021-08-15 17:00:00 | "Детский"    | 450           | 99999999  | 00015    | 2021-01-13 10:08:45

Где:

- `order_id`: номер заказа
- `ticket_type`: тип билета (Взрослый, Детский, Льготный, Групповой) (тип данных - enum)
- `ticket_price`: стоимость купленного билета
- `barcode`: уникальный штрих код для каждого индивидуального билета

Считаю, что удобнее будет указывать тип каждого купленного билета в отдельном столбце ticket_type. Таким образом, мы сможем легко добавлять новые типы билетов в будущем, просто добавив новое значение в enum список, привязанный к данному столбцу.

Для того, чтобы хранить уникальный штрих код для каждого билета, потребуется новая строка таблицы для каждого купленного билета. Поэтому добавляем столбец order_id, чтобы можно было отследить билеты, купленные в одном заказе. Хранить итоговую сумму покупки по каждому заказу при этом не требуется, так как её можно вычислить с помощью запроса к базе данных.

## 2. Время из A в B ##

Страница создана при помощи React и Bootstrap. Весь код доступен в репозитории.

Демо готовой страницы [здесь](https://g-elena-web.github.io/tickets/).
