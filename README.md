📖 Project Overview

**SAS Ai** (Smart Attendance System AI / Script Analysis System AI) is a handwriting recognition platform designed to close the gap between physical writing and digital text. Leveraging the power of Large Multimodal Models (LMMs), specifically **Google Gemini 1.5 Flash**, it provides real-time, high-accuracy OCR (Optical Character Recognition) for handwritten notes, drawings, and documents.

The project features two implementations:
1.  **Modern Web App (React/Vite)**: A full-featured, responsive dashboard with history tracking and advanced UI.
2.  **Prototype App (Streamlit)**: A rapid prototype for testing core functionality.

##  Features

-   **Dual Input Modes**:
    -   **Drawing Canvas**: Freehand drawing tool to write characters or words directly on screen.
    -   **Image Upload**: Upload images (PNG, JPG) of handwritten notes for analysis.
-   **Advanced AI Analysis**:
    -   **Text Recognition**: Accurate transcription of cursive and print handwriting.
    -   **Confidence Scoring**: Real-time confidence metrics for predictions.
    -   **Language Detection**: Automatically identifies the language of the handwritten text.
    -   **Probability Distribution**: Visual breakdown of character/token probabilities.
-   **History & Analytics**:
    -   Track all past predictions with timestamps and results.
    -   Visualize confidence trends over time.
-   **Security**:
    -   Role-based access control (Admin/User).
    -   Secure authentication flow.

## Tech Stack

### Frontend (Main Application)
-   **Framework**: React 19 (Vite)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **Icons**: Lucide React
-   **Charts**: Recharts

### AI & Backend Services
-   **AI Model**: Google Gemini 1.5 Flash (via Google Gen AI SDK)
-   **Service Layer**: Client-side API integration (`@google/genai`)

### Prototype (Python Version)
-   **Framework**: Streamlit
-   **Libraries**: Pandas, Plotly, Pillow, Streamlit-Drawable-Canvas

## 🔒 Authentication (Default Credentials)

For testing purposes, the default credentials are:
-   **Username**: `admin`
-   **Password**: `admin`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
