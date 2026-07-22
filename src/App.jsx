import React, { useState, useEffect } from 'react';
import './index.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import ApiKeyModal from './components/ApiKeyModal';
import VideoEditor from './components/VideoModule/VideoEditor';
import ImageStudio from './components/ImageModule/ImageStudio';
import SlideStudio from './components/SlideModule/SlideStudio';
import { AI_MODELS } from './mock/aiData';
import { getSavedApiKey, initGeminiClient } from './services/geminiService';

export default function App() {
  const [activeTab, setActiveTab] = useState('video');
  const [collapsed, setCollapsed] = useState(false);
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0].id);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  // Initialize Gemini on first load if key is saved
  useEffect(() => {
    const savedKey = getSavedApiKey();
    if (savedKey) {
      initGeminiClient(savedKey);
    } else {
      // Show API key modal on first visit if no key
      const hasSeenModal = sessionStorage.getItem('nova_modal_seen');
      if (!hasSeenModal) {
        setShowApiKeyModal(true);
        sessionStorage.setItem('nova_modal_seen', 'true');
      }
    }
  }, []);

  const handleResetSession = () => {
    setActiveTab(activeTab);
  };

  const renderModule = () => {
    switch (activeTab) {
      case 'video':
        return <VideoEditor />;
      case 'image':
        return <ImageStudio />;
      case 'slide':
        return <SlideStudio />;
      default:
        return <VideoEditor />;
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main Content Area */}
      <div className="main-content">
        {/* Top Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          onResetSession={handleResetSession}
          onOpenApiKey={() => setShowApiKeyModal(true)}
        />

        {/* Active Module Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {renderModule()}
        </div>
      </div>

      {/* API Key Setup Modal */}
      {showApiKeyModal && (
        <ApiKeyModal
          onClose={() => setShowApiKeyModal(false)}
          onSaved={() => setShowApiKeyModal(false)}
        />
      )}
    </div>
  );
}
