# 🌾 AgriTrace

**AgriTrace** is a production-ready, full-stack agricultural supply chain traceability application. It provides end-to-end transparency, immutable-like logs, and AI-powered insights to ensure food safety and quality from farm to consumer.

## 🚀 Features

- **Role-Based Access Control**: Customized dashboards for Farmers, Transporters, Warehouses, Distributors, and Retailers.
- **Batch Tracking**: Unique ID generation (`AGRI-XXXXX`) for every crop batch.
- **Immutable Logs**: Append-only supply chain events with automatic status updates.
- **QR Code Integration**: Every batch generates a QR code for instant public verification.
- **AI Insights**: Gemini-powered analysis for freshness scores and risk detection.
- **Public Search**: consumers can track any batch via ID or QR code without logging in.

## 🛠️ Tech Stack

- **Frontend**: React (Vite) + Tailwind CSS v4 + Framer Motion
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose)
- **AI**: Gemini Flash 1.5 (via OpenRouter)
- **Auth**: JWT-based authentication with Bcrypt hashing

## 👥 Test Accounts

Use these credentials to explore the different stakeholder perspectives in the supply chain.

| Role | Email | Password |
| :--- | :--- | :--- |
| **Farmer** | `frank_farmer@gmail.com` | `frankfarmer` |
| **Transporter** | `tracey_transporter@gmail.com` | `traceytransporter` |
| **Warehouse** | `walter_warehouse@gmail.com` | `walterwarehouse` |
| **Distributor** | `diana_distributor@gmail.com` | `dianadistributor` |
| **Retailer** | `rebecca_retailer@gmail.com` | `rebeccaretailer` |

---

## 🏗️ Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or Atlas)

### 2. Setup Server
```bash
cd server
npm install
# Create a .env file with:
# PORT=5000
# MONGODB_URI=your_mongodb_uri
# JWT_SECRET=your_secret
# OPENROUTER_API_KEY=your_key
npm run dev
```

### 3. Setup Client
```bash
cd client
npm install
npm run dev
```

## 📄 License
This project is for demonstration and hackathon purposes.
