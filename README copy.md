# 🌍 Smart Tourist Safety System (STSS)

![Premium Interface](https://img.shields.io/badge/UI-Glassmorphism-blueviolet?style=for-the-badge)
![Security](https://img.shields.io/badge/Security-AES--256%20Encrypted-emerald?style=for-the-badge)
![AI](https://img.shields.io/badge/AI-Powered%20Itinerary-orange?style=for-the-badge)

A cutting-edge, modernized travel safety platform designed to provide tourists with peace of mind while exploring. Built with a premium **Glassmorphism UI**, the system offers real-time monitoring, AI-powered planning, and high-level administrative security.

---

## ✨ Key Features

### 🎒 For Tourists
- **Digital Tourist ID**: Blockchain-inspired identity verification for secure travel.
- **Magic AI Itinerary**: Instantly generate a safe and personalized 3-day travel plan simply by entering your stay address.
- **Personal Safety Map**: Real-time tracking with clear indicators for Safe Zones and Risk Areas.
- **Total Privacy**: Isolated dashboards ensuring your location and data are never visible to other tourists.

### 🚔 For Police & Admin
- **Command Center Dashboard**: Real-time overview of all active tourists with safety score metrics.
- **Secure Access**: Protected by high-level SHA-256 password hashing.
- **Public Demo Mode**: A beautiful showcase mode using realistic demo data for public viewing without exposing sensitive records.
- **Tourist Directory**: Detailed access to blood groups, emergency contacts, and passport info for rapid emergency response.

---

## 🔒 Security & Privacy

This system is built with a "Privacy First" architecture:
- **Database Encryption**: All tourist data is stored using **AES-256 encryption** via `crypto-js`. Even if the local storage is accessed, the data remains unreadable.
- **Password Hashing**: Administrative credentials are never stored in plain text. We utilize one-way **SHA-256 hashing** for secure login verification.
- **Data Isolation**: Tourists can only see their own telemetry; global data is strictly restricted to the Police Command Center.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite
- **Styling**: Tailwind CSS (Custom Premium Palette)
- **Icons**: Lucide React
- **AI Engine**: OpenRouter API (Claude-3 models)
- **Security**: CryptoJS (AES & SHA-256)
- **State Management**: React Context API

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm / yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Akshdangi/SmartTourist.git
   cd SmartTourist
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in the root directory and add your OpenRouter API Key:
   ```env
   VITE_OPENROUTER_API_KEY=your_api_key_here
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

---

## 📸 Screenshots

*(Coming Soon - A visual showcase of the website will be coming soon.)*

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Made with ❤️ for a safer world.
