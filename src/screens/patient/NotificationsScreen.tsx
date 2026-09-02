import React, { useState } from 'react';
import { Bell, Calendar, Pill, FileText, CheckCheck } from 'lucide-react';
import { Header } from '../../components/Header';
import { EmptyState } from '../../components/EmptyState';
import { INITIAL_NOTIFICATIONS } from '../../constants/mockData';
import { AppNotification } from '../../types';

export const NotificationsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const getIcon = (type: string) => {
    if (type === 'appointment') return <Calendar className="w-4 h-4 text-emerald-700" />;
    if (type === 'prescription') return <Pill className="w-4 h-4 text-blue-700" />;
    return <Bell className="w-4 h-4 text-slate-700" />;
  };

  return (
    <div id="notifications-screen" className="flex flex-col min-h-screen bg-slate-50/50 text-left">
      <Header
        title="Notifications"
        showBack
        rightAction={
          <button
            onClick={markAllAsRead}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 p-2"
          >
            Mark Read
          </button>
        }
      />

      <div className="p-4 space-y-3 flex-1 overflow-y-auto">
        {notifications.length === 0 ? (
          <EmptyState
            icon={Bell}
            title="No Notifications"
            description="You are all caught up! New updates from your doctor or hospital will appear here."
          />
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                notif.isRead
                  ? 'bg-white border-slate-100'
                  : 'bg-emerald-50/40 border-emerald-200/80 shadow-2xs'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-2xs">
                {getIcon(notif.type)}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">{notif.title}</h4>
                  <span className="text-[10px] text-slate-400">{notif.createdAt}</span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notif.message}</p>
              </div>

              {!notif.isRead && (
                <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
