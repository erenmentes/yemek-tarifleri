# 🍽️ Yemek Tarifleri Backend (NestJS)

> 🇹🇷 Aşağıda önce Türkçe, sonra İngilizce açıklama bulunmaktadır.  
> 🇬🇧 Below you can find Turkish first, then the English version.

---

## 🇹🇷 Proje Özeti

Bu proje, **Yemek Tarifleri** için geliştirilmiş bir **NestJS + TypeORM + PostgreSQL** backend API’sidir. Kullanıcılar kayıt olabilir, giriş yapabilir, kategorilere bağlı tarifler oluşturabilir, tariflere malzeme ekleyebilir ve yorum yapabilir.

- ⚙️ Framework: **NestJS**
- 🗄️ Veritabanı: **PostgreSQL** (`yemek_tarifleri` şeması)
- 🧩 ORM: **TypeORM** (entity tabanlı ilişkiler)
- 🔐 Kimlik Doğrulama: **JWT** tabanlı auth + custom `AuthGuard`
- 📖 Dokümantasyon: **Swagger UI** (`/api` endpoint’i)

---

## 🇹🇷 Mimari ve Katmanlar

Proje klasik NestJS katmanlı yapıyı kullanır:

- `src/auth`: Kullanıcı kayıt & login, JWT üretimi
- `src/category`: Kategorilerin CRUD işlemleri
- `src/ingredients`: Malzemelerin CRUD işlemleri
- `src/recipes`: Tarif CRUD ve tarif-malzemeleri ilişkileri
- `src/entities/entities`: Tüm TypeORM entity tanımları
- `src/guards/auth.guard.ts`: JWT doğrulayan guard
- `src/main.ts`: Uygulama bootstrap + Swagger kurulumu
- `src/app.module.ts`: Global modüller ve TypeORM konfigürasyonu

---

## 🇹🇷 Veritabanı Tasarımı ve İlişkiler

Veritabanı `yemek_tarifleri` şeması altında çalışır ve aşağıdaki ana tabloları içerir:

### 👤 Users (`Users.ts`)

- `user_id` (PK)
- `username` (unique)
- `password`
- `role` (ör: `User`, ileride `Admin` vs.)
- İlişkiler:
  - Bir **kullanıcı** birden çok **tarife** sahip olabilir: `OneToMany(Users -> Recipes)`
  - Bir **kullanıcı** birden çok **yorum** yazabilir: `OneToMany(Users -> Comments)`

### 🧆 Categories (`Categories.ts`)

- `category_id` (PK)
- `category_name` (unique)
- İlişkiler:
  - Bir **kategori**, birden çok **tarife** sahiptir: `OneToMany(Categories -> Recipes)`

### 🧂 Ingredients (`Ingredients.ts`)

- `ingredient_id` (PK)
- `ingredient_name` (unique)
- İlişkiler:
  - Bir **malzeme**, birden çok **tarifte** kullanılabilir: `OneToMany(Ingredients -> Recipes)`

> Not: Çoktan-çoğa için ayrıca `RecipeIngredients` tablosu da kullanılmaktadır.

### 📖 Recipes (`Recipes.ts`)

- `recipe_id` (PK)
- `recipe_title`
- `recipe_content`
- `recipe_createdate`
- İlişkiler:
  - Bir **tarif**, bir **kullanıcı**ya aittir: `ManyToOne(Recipes -> Users)`
  - Bir **tarif**, bir **kategori**ye bağlıdır: `ManyToOne(Recipes -> Categories)`
  - Bir **tarif**, birden çok **malzeme** ile eşlenir (fiziksel bağlantı `RecipeIngredients` entity’si ile yönetilir)

### 🧮 RecipeIngredients (`RecipeIngredients.ts`)

Bu tablo, **tarif** ve **malzeme** arasındaki **çoktan-çoğa** ilişkiyi modellemek için kullanılır.

- `recipe` (ManyToOne -> `Recipes`)
- `ingredient` (ManyToOne -> `Ingredients`)
- `onDelete: 'CASCADE'` ile, bir tarif veya malzeme silindiğinde ilişkili satırlar da otomatik silinir.

### 💬 Comments (`Comments.ts`)

- `comment_id` (PK)
- `content`
- `user` (ManyToOne -> `Users`)

> İleride tariflere bağlı yorumlar vs. için yeni ilişkiler eklenebilir.

---

## 🇹🇷 Auth ve JWT Akışı

- `/auth/signup`: Yeni kullanıcı oluşturur.
- `/auth/login`: Kullanıcı adı + şifre ile giriş yapar; JWT `access_token` döner.
- JWT üretimi `AuthService` içinde `JwtService` kullanılarak yapılır.
- `AuthGuard`:
  - `Authorization: Bearer <token>` header’ından token’ı alır.
  - `JwtService.verifyAsync` ile `JWT_SECRET` kullanarak doğrular.
  - Doğrulanan payload’ı `request.user` içine koyar.
- `RecipesController` üzerindeki bazı endpoint’ler `@UseGuards(AuthGuard)` ile korunur.

---

## 🇹🇷 Swagger Dokümantasyonu

- `src/main.ts` içinde `DocumentBuilder` ile Swagger konfigüre edilmiştir.
- Swagger UI endpoint’i: **`http://localhost:3000/api`**
- Controller ve DTO’larda `@ApiTags`, `@ApiOperation`, `@ApiBody`, `@ApiProperty` decorator’ları kullanılmıştır.
- Bu sayede:
  - Endpoint açıklamaları
  - Request body şemaları
  - Örnek değerler
  - Auth gerektiren endpoint’ler
  Swagger arayüzünde net bir şekilde görünür.

---

## 🇹🇷 Kurulum ve Çalıştırma

### 1️⃣ Bağımlılıkların kurulması

```bash
npm install
```

### 2️⃣ .env dosyası oluşturma

Örnek dosya: `.env.example`

```bash
cp .env.example .env
```

`.env` içindeki değerleri kendi ortamına göre güncelle:

- `JWT_SECRET` – güçlü ve tahmin edilmesi zor bir secret
- `JWT_EXPIRES_IN` – saniye cinsinden token ömrü (örn: `3600`)
- `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`, `DB_SCHEMA`

### 3️⃣ Veritabanı

- PostgreSQL kurulu olmalı.
- `yemek_tarifleri` isimli şema ve ilgili tablolar oluşturulmuş olmalı. (Proje, halihazırda var olan bir şemayı kullanmak üzere konfigüre edilmiştir.)
- `TypeOrmModule.forRoot` içinde env’den okunan değerler kullanılır.

### 4️⃣ Geliştirme ortamında çalıştırma

```bash
npm run start:dev
```

- Uygulama: `http://localhost:3000`
- Swagger UI: `http://localhost:3000/api`

### 5️⃣ Testler

```bash
npm test
# veya
npm run test:e2e
```

---

## 🇹🇷 Önemli Endpoint’ler (Özet)

### Auth
- `POST /auth/signup` – Kullanıcı kaydı
- `POST /auth/login` – JWT token al

### Category
- `GET /category/all` – Tüm kategoriler
- `POST /category/create` – Yeni kategori oluştur
- `DELETE /category/delete` – Kategori sil
- `PATCH /category/update` – Kategori adı güncelle

### Ingredients
- `GET /ingredients/all` – Tüm malzemeler
- `POST /ingredients/create` – Yeni malzeme oluştur
- `DELETE /ingredients/delete` – Malzeme sil
- `PATCH /ingredients/update` – Malzeme adı güncelle

### Recipes
- `GET /recipes/all` – Tüm tarifler
- `GET /recipes/:id` – ID’ye göre tarif detayı
- `POST /recipes/create` – Yeni tarif oluştur (Auth gerekli)
- `DELETE /recipes/delete` – Tarif sil (Auth gerekli)
- `PATCH /recipes/update` – Tarif güncelle (Auth gerekli)

> Tüm detaylar için Swagger UI’ı kullanabilirsiniz.

---

## 🇹🇷 Tarif Oluşturma Akışı (Recipe + Ingredients)

1. İstek body’si `CreateRecipeDTO` yapısına uyar.
2. `author` username’i ile istek atan kullanıcının varlığı kontrol edilir.
3. `category_name` mevcut değilse, otomatik olarak yeni bir kategori oluşturulur.
4. Tarif kaydedilir (`Recipes` tablosu).
5. `IngredientList` içindeki her item için:
   - İlgili malzeme adı mevcut değilse `Ingredients` tablosuna eklenir.
   - `RecipeIngredients` tablosuna tarif-malzeme ilişkisi oluşturulur.

Böylece tarifler, kategoriler, malzemeler ve kullanıcılar arasında zengin bir ilişki ağı kurulmuş olur. 🔗

---

## 🇬🇧 Project Overview

This project is a **NestJS + TypeORM + PostgreSQL** backend API for a **Recipe Management** application. Users can sign up, log in, create recipes with categories and ingredients, and interact with the data through a RESTful API.

- ⚙️ Framework: **NestJS**
- 🗄️ Database: **PostgreSQL** (`yemek_tarifleri` schema)
- 🧩 ORM: **TypeORM**
- 🔐 Authentication: **JWT** with a custom `AuthGuard`
- 📖 API Docs: **Swagger UI** at `/api`

---

## 🇬🇧 Architecture & Modules

The app follows a typical layered NestJS architecture:

- `src/auth`: User registration & login, JWT issuing
- `src/category`: Category CRUD operations
- `src/ingredients`: Ingredient CRUD operations
- `src/recipes`: Recipe CRUD and recipe–ingredient relations
- `src/entities/entities`: All TypeORM entities
- `src/guards/auth.guard.ts`: JWT-based authorization guard
- `src/main.ts`: App bootstrap & Swagger setup
- `src/app.module.ts`: Root module, TypeORM configuration

---

## 🇬🇧 Database Design & Relations

The database uses the `yemek_tarifleri` schema with the following main tables:

### 👤 Users

- `user_id` (PK)
- `username` (unique)
- `password`
- `role`
- Relations:
  - One user -> many recipes (`OneToMany(Users -> Recipes)`)
  - One user -> many comments (`OneToMany(Users -> Comments)`)

### 🧆 Categories

- `category_id` (PK)
- `category_name` (unique)
- Relations:
  - One category -> many recipes (`OneToMany(Categories -> Recipes)`)

### 🧂 Ingredients

- `ingredient_id` (PK)
- `ingredient_name` (unique)
- Relations:
  - One ingredient -> many recipes (`OneToMany(Ingredients -> Recipes)`)

> Additionally, `RecipeIngredients` is used to model a many‑to‑many style relation between recipes and ingredients.

### 📖 Recipes

- `recipe_id` (PK)
- `recipe_title`
- `recipe_content`
- `recipe_createdate`
- Relations:
  - Many recipes -> one user (`ManyToOne(Recipes -> Users)`)
  - Many recipes -> one category (`ManyToOne(Recipes -> Categories)`)
  - Recipes are linked to multiple ingredients through `RecipeIngredients`.

### 🧮 RecipeIngredients

This table represents the **many-to-many style** relation between recipes and ingredients.

- `recipe` (ManyToOne -> `Recipes`)
- `ingredient` (ManyToOne -> `Ingredients`)
- `onDelete: 'CASCADE'` ensures that when a recipe or ingredient is deleted, related rows are removed as well.

### 💬 Comments

- `comment_id` (PK)
- `content`
- `user` (ManyToOne -> `Users`)

---

## 🇬🇧 Auth & JWT Flow

- `POST /auth/signup`: Creates a new user.
- `POST /auth/login`: Authenticates with username & password and returns a JWT `access_token`.
- `AuthService` issues tokens using Nest’s `JwtService`.
- `AuthGuard`:
  - Extracts token from `Authorization: Bearer <token>` header.
  - Verifies the token using `JWT_SECRET` from environment variables.
  - Attaches the decoded payload to `request.user`.
- Some recipe endpoints are protected with `@UseGuards(AuthGuard)`.

---

## 🇬🇧 Swagger API Documentation

- Configured in `src/main.ts` using `DocumentBuilder`.
- Swagger UI: **`http://localhost:3000/api`**
- Controllers & DTOs use `@ApiTags`, `@ApiOperation`, `@ApiBody`, `@ApiProperty` to enrich docs.
- You can explore and test all endpoints directly from Swagger UI.

---

## 🇬🇧 Setup & Run

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Environment variables

Use `.env.example` as a template:

```bash
cp .env.example .env
```

Adjust values:

- `JWT_SECRET` – strong secret key
- `JWT_EXPIRES_IN` – lifetime in seconds (e.g. `3600`)
- `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`, `DB_SCHEMA`

### 3️⃣ Database

- Make sure PostgreSQL is running.
- Ensure the `yemek_tarifleri` schema and tables exist.
- TypeORM is configured to connect using the values from `.env`.

### 4️⃣ Run in development mode

```bash
npm run start:dev
```

- App: `http://localhost:3000`
- Swagger UI: `http://localhost:3000/api`

### 5️⃣ Tests

```bash
npm test
# or
npm run test:e2e
```

---

## 🇬🇧 Key Endpoints (Summary)

### Auth
- `POST /auth/signup` – Register user
- `POST /auth/login` – Login, get JWT token

### Category
- `GET /category/all` – List all categories
- `POST /category/create` – Create category
- `DELETE /category/delete` – Delete category
- `PATCH /category/update` – Update category name

### Ingredients
- `GET /ingredients/all` – List all ingredients
- `POST /ingredients/create` – Create ingredient
- `DELETE /ingredients/delete` – Delete ingredient
- `PATCH /ingredients/update` – Update ingredient name

### Recipes
- `GET /recipes/all` – List all recipes
- `GET /recipes/:id` – Get recipe by ID
- `POST /recipes/create` – Create recipe (requires Auth)
- `DELETE /recipes/delete` – Delete recipe (requires Auth)
- `PATCH /recipes/update` – Update recipe (requires Auth)

---

## 🇬🇧 Recipe Creation Flow

1. The request body follows the `CreateRecipeDTO` structure.
2. The `author` username is used to find the owner user.
3. Category is fetched by `category_name`; if it doesn’t exist, it is created.
4. The recipe is stored in the `Recipes` table.
5. For each entry in `IngredientList`:
   - If the ingredient doesn’t exist, it is created in `Ingredients`.
   - A link is created in `RecipeIngredients` between the recipe and the ingredient.

This creates a rich graph of relations between users, recipes, categories, ingredients, and (optionally) comments. 🔗

---

## 🤝 Katkı / Contributing

- Pull request’ler ve issue’lar memnuniyetle karşılanır.  
- Contributions and issues are welcome!

---

## 📄 Lisans / License

Bu proje eğitim ve öğrenme amaçlı hazırlanmıştır.  
This project is intended for educational and learning purposes.
