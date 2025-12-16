# Todo Oodles 📝

A modern, feature-rich Todo application built with Expo and React Native. Manage your tasks efficiently with categorized task lists, beautiful UI, and smooth user experience.

![Expo](https://img.shields.io/badge/Expo-~54.0.29-blue.svg)
![React Native](https://img.shields.io/badge/React%20Native-0.81.5-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-~5.9.2-blue.svg)

## ✨ Features

### 🎯 Task Management
- **Current Tasks**: Active tasks you're working on
- **Upcoming Tasks**: Tasks scheduled for later
- **Completed Tasks**: Finished tasks for reference

### 🎨 User Experience
- **Beautiful UI**: Clean, modern interface with gradient headers
- **Smooth Animations**: Haptic feedback and smooth transitions
- **Responsive Design**: Works seamlessly on different screen sizes
- **Empty States**: Helpful messages when no tasks exist
- **Real-time Updates**: Instant UI updates when tasks are modified

### 🔧 Core Functionality
- Add new tasks with title validation
- Mark tasks as completed
- Delete tasks with confirmation
- Task categorization and filtering
- Progress tracking (pending vs completed)
- Task counter badges
- Modal-based task creation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Expo CLI (`npm install -g @expo/cli`)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todo-oodles
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   npx expo start
   ```

4. **Run on device/emulator**
   - **iOS Simulator**: Press `i` in the terminal
   - **Android Emulator**: Press `a` in the terminal
   - **Expo Go**: Scan the QR code with Expo Go app

### Available Scripts

```bash
# Start development server
npm start

# Start on specific platforms
npm run android    # Android emulator
npm run ios        # iOS simulator
npm run web        # Web browser

# Development tools
npm run reset-project  # Reset to fresh template
npm run lint          # Run ESLint
```

## 📱 Screenshots

The app features three main screens:

1. **Home**: Welcome screen with app overview
2. **Tasks**: Main task management interface with:
   - Gradient header with task summary
   - Three categorized sections (Current, Upcoming, Completed)
   - Add task floating action button
   - Modal-based task creation
   - Task actions (complete, delete)
3. **Profile**: User profile and settings

## 🏗️ Architecture


### Tech Stack
- **Framework**: Expo SDK ~54.0.29
- **UI Library**: React Native 0.81.5
- **Navigation**: Expo Router with file-based routing
- **Language**: TypeScript ~5.9.2
- **Icons**: FontAwesome5 via @expo/vector-icons
- **State Management**: Redux Toolkit with React Redux
- **Animations**: React Native Reanimated


### Project Structure
```
todo-oodles/
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Home screen
│   │   ├── tasks.tsx      # Tasks management
│   │   ├── profile.tsx    # User profile
│   │   └── _layout.tsx    # Tab layout
│   ├── _layout.tsx        # Root layout
│   └── modal.tsx          # Modal components
├── components/            # Reusable UI components
│   ├── ui/               # UI primitives
│   └── themed-*          # Theme components
├── store/                # Redux store configuration
│   ├── index.ts          # Store setup and exports
│   └── tasksSlice.ts     # Tasks slice with reducers
├── hooks/                # Custom React hooks
│   └── useTask.ts        # Task selection hook
├── constants/            # App constants
└── assets/               # Static assets
```


### State Management
The app uses Redux Toolkit for robust state management with the following features:

- **Task Model**: `{ id: string, title: string, status: 'current' | 'upcoming' | 'completed' }`
- **Store Configuration**: Configured with `configureStore` from Redux Toolkit
- **Actions**: `addTask`, `deleteTask`, `markTaskDone`, `moveTaskToUpcoming`
- **Custom Hooks**: `useTasks()` for easy task selection and filtering
- **State Slices**: Organized with `createSlice` for modular state management

## 🎨 UI Components

### Key Components
- **Section**: Task category container with icon and count
- **TaskItem**: Individual task with actions
- **Modal**: Add task modal with input validation
- **Gradient Header**: Beautiful header with task summary

### Styling
- Uses React Native StyleSheet
- Consistent color scheme and spacing
- Shadow and elevation for depth
- Responsive layouts with flexbox

## 🔧 Development

### Environment Setup
1. Install Node.js 18+
2. Install Expo CLI globally: `npm install -g @expo/cli`
3. Install project dependencies: `npm install`

### Code Style
- TypeScript for type safety
- ESLint configuration for code quality
- Consistent naming conventions
- Modular component structure

### Customization
- **Theme**: Modify colors in component styles
- **Icons**: Change FontAwesome icons in components
- **Store**: Extend task store with additional actions
- **UI**: Customize styles and layouts

## 📦 Dependencies

### Main Dependencies
- `@expo/vector-icons`: Icon library
- `expo-router`: File-based routing
- `react-native-gesture-handler`: Gesture handling
- `expo-haptics`: Haptic feedback

### Development Dependencies
- `@types/react`: TypeScript types
- `typescript`: TypeScript compiler
- `eslint`: Code linting
- `eslint-config-expo`: Expo ESLint config

## 🚀 Deployment

### Building for Production

1. **Install EAS CLI**
   ```bash
   npm install -g @expo/cli eas-cli
   ```

2. **Configure EAS**
   ```bash
   eas build:configure
   ```

3. **Build for platforms**
   ```bash
   eas build --platform android
   eas build --platform ios
   ```

### Expo Application Services (EAS)
- **EAS Build**: Native app builds for iOS and Android
- **EAS Submit**: Submit to App Store and Google Play
- **EAS Update**: Over-the-air updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain consistent code style
- Add proper error handling
- Write meaningful commit messages
- Test on multiple platforms

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Expo](https://expo.dev) for the amazing development platform
- [React Native](https://reactnative.dev) for the cross-platform framework
- [FontAwesome](https://fontawesome.com) for the beautiful icons
- [Expo Router](https://docs.expo.dev/router/introduction/) for file-based routing

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Expo documentation](https://docs.expo.dev/)
2. Review existing [Issues](https://github.com/your-repo/todo-oodles/issues)
3. Create a new issue with detailed description

---

**Happy Task Managing! 🎉**
