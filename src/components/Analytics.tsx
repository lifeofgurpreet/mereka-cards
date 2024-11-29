import React from 'react';
import { BarChart2, TrendingUp, Users, Globe, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export const Analytics: React.FC = () => {
  const mockData = {
    totalViews: 1234,
    totalSaves: 856,
    totalClicks: 432,
    recentLocations: [
      { city: 'San Francisco', country: 'USA', count: 45 },
      { city: 'London', country: 'UK', count: 32 },
      { city: 'Singapore', country: 'Singapore', count: 28 },
    ],
    dailyStats: [
      { date: '2024-03-01', views: 120, saves: 45, clicks: 67 },
      { date: '2024-03-02', views: 145, saves: 52, clicks: 78 },
      { date: '2024-03-03', views: 98, saves: 38, clicks: 45 },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track your digital business card performance
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Views"
            value={mockData.totalViews}
            icon={<Users className="h-6 w-6 text-indigo-600" />}
          />
          <StatCard
            title="Contacts Saved"
            value={mockData.totalSaves}
            icon={<BarChart2 className="h-6 w-6 text-green-600" />}
          />
          <StatCard
            title="Link Clicks"
            value={mockData.totalClicks}
            icon={<TrendingUp className="h-6 w-6 text-blue-600" />}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Stats Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Daily Performance</h3>
            <div className="h-64">
              {/* Implement chart here using your preferred charting library */}
              <div className="flex h-full items-end space-x-4">
                {mockData.dailyStats.map((stat) => (
                  <div key={stat.date} className="flex-1">
                    <div className="relative h-full">
                      <div
                        className="absolute bottom-0 w-full bg-indigo-200 rounded-t"
                        style={{ height: `${(stat.views / 150) * 100}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      {format(new Date(stat.date), 'MMM d')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Geographic Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Geographic Distribution</h3>
            <div className="space-y-4">
              {mockData.recentLocations.map((location) => (
                <div
                  key={`${location.city}-${location.country}`}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{location.city}</p>
                      <p className="text-xs text-gray-500">{location.country}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{location.count} views</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Card Viewed</p>
                      <p className="text-xs text-gray-500">San Francisco, USA</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="mt-1 text-3xl font-semibold text-gray-900">{value.toLocaleString()}</p>
      </div>
      {icon}
    </div>
  </div>
);