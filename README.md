#  Vue Mini Dashboard  


Mini dashboard مبني باستخدام **Vue 3 + Vite + TypeScript** 🎯  

## 🎯 الهدف
المشروع معمول بهدف التدريب على:  
- بناء نظم معقدة وقابلة للتوسع  
- التعامل مع **CRUD operations**  
- إدارة الحالة (**state management**)  
- الـ **Authentication & Router Guards**  
- دعم **i18n** (تعدد اللغات)  

## 🌐 البيانات
المشروع حاليًا بيستخدم [DummyJSON API](https://dummyjson.com) كمصدر بيانات تجريبي لتسهيل تطوير الواجهة الأمامية بدون الحاجة إلى Backend كامل.
--------

##  Features  

- **Authentication**: Login/Logout + Router Guards  
- **Dashboard Navigation**: Sidebar + Overview Page  
- **Entities with CRUD operations**:
  - Users (Create, Read, Update, Delete)  
  - Recipes (CRUD)  
  - Products (CRUD)  
  - Carts (List, Details, Manage)  
  - Posts & Comments (Nested CRUD)  
  - Todos (CRUD + Mark Done/Pending)  
  - Quotes (CRUD)  
- **User Profile**: View/Edit personal info  
- **i18n**: دعم تعدد اللغات (locales)  
- **Scalable Architecture**:  
  - `components/` → Reusable UI components  
  - `views/` → Pages  
  - `stores/` → State management (Pinia)  
  - `router/` → Routes + Guards  
  - `composables/` → Reusable logic hooks  
  - `plugins/` → Project-wide plugins (axios, i18n…)  
  - `schema/` → Validation schemas  

---
# System design

<img width="3833" height="3985" alt="image" src="https://github.com/user-attachments/assets/f9eefda9-09dd-4944-9d39-dae8d48ce775" />

[View on Eraser](https://app.eraser.io/workspace/ZaRVw1rPPvdxW0UMAI97?origin=share)


-------

## 📂 Project Structure  

```bash
src/
  assets/        # Static assets
  components/    # Reusable UI components
  composables/   # Custom Vue composition hooks
  locales/       # i18n translations
  plugins/       # Global plugins (axios, i18n…)
  router/        # App routes + navigation guards
  schema/        # Validation schemas
  stores/        # Pinia stores (state management)
  views/         # Pages (Dashboard, Login, Overview…)
  App.vue        # Root component
  main.ts        # App entry point
```
-----------
#  Installation  

### Clone the repository
```git clone https://github.com/TherealZoux/Vue-mini-dash.git```

```cd Vue-mini-dash```

# Install dependencies
```npm install```

# Run the project
```npm run dev```

# Build for production
```npm run build```

---------
# Tech Stack
Vue 3
Vite
TypeScript
Pinia
Vue router
I18n
Axios










