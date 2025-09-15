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
## 🛠️ Tech Stack  

![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)  ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)  ![Pinia](https://img.shields.io/badge/Pinia-F7DF1E?style=for-the-badge&logo=pinia&logoColor=white)  ![Vue Router](https://img.shields.io/badge/Vue%20Router-CA4245?style=for-the-badge&logo=vue.js&logoColor=white)  ![i18n](https://img.shields.io/badge/i18n-000000?style=for-the-badge&logo=googletranslate&logoColor=white)  
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)  ![DummyJSON](https://img.shields.io/badge/DummyJSON-000000?style=for-the-badge&logo=json&logoColor=white)  
![PrimeVue](https://img.shields.io/badge/PrimeVue-3E83F8?style=for-the-badge&logo=prime&logoColor=white)  ![PrimeIcons](https://img.shields.io/badge/PrimeIcons-000000?style=for-the-badge&logo=materialdesignicons&logoColor=white)  
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)  ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)  
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)  ![VeeValidate](https://img.shields.io/badge/Vee--Validate-42b883?style=for-the-badge&logo=veevalidate&logoColor=white)  
![Yup](https://img.shields.io/badge/Yup-000000?style=for-the-badge&logo=json&logoColor=white)  










