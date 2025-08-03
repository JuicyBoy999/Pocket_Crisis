# Pocket Crisis Plan - Mobile App

A React Native mobile application for mental health support, built with Expo.

## Features
- **Crisis Plan Setup**: Add calming tools, trusted contacts, reasons to stay, and comforting content
- **Emotion-Tagged Journaling**: Write thoughts, tag emotions, and reflect later
- **Emotion Heatmap**: View emotional trends over the past 7 days
- **MindEase Chat**: AI assistant for emotional support
- **Smart Search**: Search journal entries by keywords or emotion filters

## Development Setup

### Prerequisites
- Node.js (v16 or later)
- npm or yarn
- Expo CLI: `npm install -g @expo/cli`
- EAS CLI: `npm install -g eas-cli`

### Installation
```bash
npm install
```

### Running the App
```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

### Building for Production

#### Android (Google Play Store)
```bash
# Build AAB for Play Store
eas build --platform android --profile production

# Submit to Play Store
eas submit --platform android
```

#### iOS (App Store)
```bash
# Build for App Store
eas build --platform ios --profile production

# Submit to App Store
eas submit --platform ios
```

### Preview Builds
```bash
# Build APK for testing
eas build --platform android --profile preview
```

## Project Structure
```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── welcome/      # Welcome screen
│   ├── setup/        # Setup flow screens
│   ├── crisis/       # Crisis mode screens
│   ├── journal/      # Journal functionality
│   └── chat/         # AI chat feature
├── context/          # React Context for state management
└── types/            # TypeScript type definitions
```

## Key Technologies
- **React Native** with **Expo** for cross-platform development
- **TypeScript** for type safety
- **AsyncStorage** for local data persistence
- **Expo Router** for navigation
- **React Native Vector Icons** for icons
- **Expo AV** for media playback
- **Expo Image Picker** for media selection

## Publishing to App Stores

### Google Play Store
1. Create a Google Play Console account
2. Configure `eas.json` with your app details
3. Build with `eas build --platform android --profile production`
4. Submit with `eas submit --platform android`

### Apple App Store
1. Create an Apple Developer account
2. Configure `eas.json` with your app details
3. Build with `eas build --platform ios --profile production`
4. Submit with `eas submit --platform ios`

## App Store Requirements
- **Privacy Policy**: Required for both stores
- **App Icons**: 1024x1024 for both platforms
- **Screenshots**: Various sizes for different devices
- **App Description**: Compelling description highlighting mental health support features

## License
This project is for mental health support and educational purposes.