# NutriBack API

NutriBack API is the backend service powering the **NutriCheck** app, a nutritional platform designed to promote a healthy lifestyle through goal tracking and social engagement. The API provides user authentication, recipe management, social interactions, AI-powered features, and dietary planning.

## Features

### 🔐 Authentication

- Utilizes **JWT authentication** with **PassportJS**.
- Passwords are **hashed using SHA256** and salted upon registration.

### 👤 Account Management

- Users can modify their account details, such as **name, email, and username**.

### 👥 Social Features

- Users can **follow** and **unfollow** others to personalize their feed.

### 🍽️ Recipe Management

- A core feature of NutriCheck, the API includes **\~500k recipes** sourced from [food.com](https://food.com).
- Recipes contain **macro and micronutrients**, ingredients, steps, duration, and more.
- Users can:
    - Get **recipe recommendations**.
    - **Search** recipes by keyword or properties.
    - **Create new recipes** and share them with the community.

### 💬 Posts & Comments

- Users can leave **comments (posts)** on recipes.
- A large dataset of **millions of posts** from [food.com](https://food.com) is integrated.
- Posts include:
    - **User message** about the recipe.
    - **Rating system** (1-5 stars).

### 🤖 AI-Powered Intelligence

The API integrates artificial intelligence features to enhance the user experience:

- **AI Chat**: A structured chatbot responding to **nutritional questions**.
- **AI Recipe Generator**: The AI can generate new recipes.
- **Scan-to-Create**: Generates a recipe based on an uploaded **photo**.
- **Scan-to-Log**: Estimates the **caloric value** of a food item from a **photo**.
- **Modify Recipe**: Personalizes recipes based on user **preferences and allergens**.

### 📊 Dietary Plan & Calorie Tracking

- Users can log **recipes, foods, and calories**.
- Progress tracking towards **caloric intake goals**.
- Endpoints to retrieve **target progress**.

## 🛠️ Tech Stack

- **Framework**: Built with **NestJS**.
- **Database**: **PostgreSQL**.
- **ORM**: Uses **Drizzle ORM** for database communication.
- **Authentication**: **PassportJS** with **JWT**.
- **Data Parsing**: Large datasets of recipes and posts were parsed using **Python & Pandas**.

## 🚀 Getting Started

### Installation

```sh
# Clone the repository
git clone https://github.com/NutriChek/NutriBack.git

# Install dependencies
bun install
```

### Environment Variables

Create a `.env` file and configure your environment variables:

```env
JWT_SECRET="secret"
DB_URL="postgres://user:password@localhost:5432/databse"
GEMINI_API_KEY="API_KEY"
GEMINI_MODEL="gemini-1.5-flash-002"
```

### Running the API

```sh
# Start the development server
bun dev
```

### API Documentation

An OpenAPI json can also be found in the project files