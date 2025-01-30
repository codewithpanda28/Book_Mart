# Old Book Buy/Sell Platform

## Overview
This is an e-commerce platform where users can buy and sell used books. The application is built using Next.js, React, Redux, and Tailwind CSS. 

## Features
- User authentication (Login/Signup)
- Browse and search for books
- Buy and sell used books online
- Responsive design for all devices
- User profile and order management
- State management using Redux Toolkit

## Tech Stack
- **Frontend:** Next.js, React, Tailwind CSS
- **State Management:** Redux Toolkit, React Redux
- **Icons:** Lucide React, React Icons
- **Styling:** Tailwind CSS
- **Font:** Google Fonts (Roboto Mono)

## Important Notice
If you want to clone this GitHub repository, please **fork the repository and give it a star first** before proceeding with cloning.

## Folder Structure
```
project-folder/
│-- components/
│   │-- Header.tsx
│   │-- Footer.tsx
│   │-- NewBooks.tsx
│-- pages/
│   │-- layout.tsx
│   │-- page.tsx
│-- public/
│   │-- images/
│-- store/
│   │-- slice/
│   │   │-- userSlice.ts
│   │-- store.ts
│-- styles/
│-- .gitignore
│-- package.json
│-- README.md
```

## Dependencies
Ensure you have the following dependencies installed:

### Main Dependencies
```json
"next": "latest",
"react": "latest",
"react-dom": "latest",
"tailwindcss": "latest",
"redux": "latest",
"@reduxjs/toolkit": "latest",
"react-redux": "latest",
"lucide-react": "latest",
"react-icons": "latest"
```

## Installation & Setup
### 1. Fork and Star the Repository
Before cloning, please fork the repository and give it a star.

### 2. Clone the Repository
```sh
git clone https://github.com/codewithpanda28/Book_Mart.git
cd Book_Mart
```

### 3. Install Dependencies
```sh
yarn install
# or
npm install
```

### 4. Run the Development Server
```sh
yarn dev
# or
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the app in action.

### 5. Build the Project
```sh
yarn build
# or
npm run build
```

## Redux State Management
This project uses **Redux Toolkit** for efficient state management.

### 1. **Store Configuration (store.ts)**
Located in `store/`, the Redux store is configured as:
```ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### 2. **User Slice (userSlice.ts)**
Located in `store/slice/`, it manages authentication state:
```ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoginDialogOpen: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleLoginDialog: (state) => {
      state.isLoginDialogOpen = !state.isLoginDialogOpen;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { toggleLoginDialog, setUser } = userSlice.actions;
export default userSlice.reducer;
```

### 3. **Using Redux in Components**
In your components, you can access and dispatch actions using Redux:
```ts
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleLoginDialog } from '@/store/slice/userSlice';

const Component = () => {
  const dispatch = useDispatch();
  const isLoginOpen = useSelector((state: RootState) => state.user.isLoginDialogOpen);
  
  return (
    <button onClick={() => dispatch(toggleLoginDialog())}>Toggle Login</button>
  );
};
```

## Components
### 1. **Header.tsx**
- Contains navigation, search bar, and account options.
- Uses Redux to manage user authentication state.

### 2. **Footer.tsx**
- Displays footer details.

### 3. **NewBooks.tsx**
- Lists newly added books.

### 4. **layout.tsx**
- Main layout structure, including Header and Footer.

### 5. **page.tsx**
- Main home page displaying book categories and selling/buying steps.

## Future Enhancements
- User authentication system
- Payment gateway integration
- Book recommendation system
- Enhanced UI/UX improvements

## Author
- **Akash Kumar** (Frontend Developer)

## Connect with Me
- **Instagram**: [panda_creation_29](https://www.instagram.com/panda_creation_29?igsh=MXoydTd4cjF5MnFq)
- **LinkedIn**: [codewithpanda28](https://www.linkedin.com/in/codewithpanda28/)
- **GitHub**: [codewithpanda28](https://github.com/codewithpanda28?tab=repositories)

## License
This project is licensed under the MIT License.

