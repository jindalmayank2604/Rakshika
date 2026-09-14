import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { SafetyProvider } from './context/SafetyContext';
import { NotificationProvider } from './context/NotificationContext';

// Components & UI
import { Sidebar } from './components/layout/Sidebar';
import { AppHeader } from './components/layout/AppHeader';
import { MobileNav } from './components/layout/MobileNav';
import { FloatingAIAssistant } from './components/ai/FloatingAIAssistant';
import { ToastContainer } from './components/ui/Toast';
import { InstallPWABanner } from './components/ui/InstallPWA';
import { Modal } from './components/ui/Modal';
import { SOSButton } from './components/safety/SOSButton';
import { FloatingSOS } from './components/safety/FloatingSOS';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { SafetyMapPage } from './pages/SafetyMapPage';
import { ReportIncidentPage } from './pages/ReportIncidentPage';
import { MyReportsPage } from './pages/MyReportsPage';
import { EmergencyContactsPage } from './pages/EmergencyContactsPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';

// Authenticated App Shell Layout
const AppShell = ({ children }) => {
  const [sosModalOpen, setSosModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-linen dark:bg-[#3a1322] flex text-wine-plum dark:text-bone transition-colors duration-300">
      {/* Desktop & Tablet Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader onOpenSOS={() => setSosModalOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-24 lg:pb-10 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Floating Global AI Assistant */}
      <FloatingAIAssistant />

      {/* Mobile Bottom Navigation */}
      <MobileNav />
      <FloatingSOS onOpenSOS={() => setSosModalOpen(true)} />

      {/* SOS Modal Trigger for Mobile / Header button */}
      <Modal
        isOpen={sosModalOpen}
        onClose={() => setSosModalOpen(false)}
        title="WeSafe Emergency SOS Trigger"
        maxWidth="max-w-md"
      >
        <div className="text-center py-2">
          <p className="text-xs text-dust-grey-dark dark:text-silver mb-4">
            Press and hold the circle below for 3 seconds to alert your emergency circle with live GPS coordinates.
          </p>
          <SOSButton isModal={true} onClose={() => setSosModalOpen(false)} />
        </div>
      </Modal>

      {/* Toast Notifications */}
      <ToastContainer />

      {/* PWA Install Banner */}
      <InstallPWABanner />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ThemeProvider>
        <AuthProvider>
          <SafetyProvider>
            <NotificationProvider>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/onboarding" element={<OnboardingPage />} />

                {/* Authenticated Dashboard Routes */}
                <Route path="/dashboard" element={<AppShell><DashboardPage /></AppShell>} />
                <Route path="/map" element={<AppShell><SafetyMapPage /></AppShell>} />
                <Route path="/report" element={<AppShell><ReportIncidentPage /></AppShell>} />
                <Route path="/my-reports" element={<AppShell><MyReportsPage /></AppShell>} />
                <Route path="/contacts" element={<AppShell><EmergencyContactsPage /></AppShell>} />
                <Route path="/ai-assistant" element={<AppShell><AIAssistantPage /></AppShell>} />
                <Route path="/notifications" element={<AppShell><NotificationsPage /></AppShell>} />
                <Route path="/profile" element={<AppShell><ProfilePage /></AppShell>} />
                <Route path="/settings" element={<AppShell><SettingsPage /></AppShell>} />
                <Route path="/admin" element={<AppShell><AdminDashboardPage /></AppShell>} />

                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </NotificationProvider>
          </SafetyProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
