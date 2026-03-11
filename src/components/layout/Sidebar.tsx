'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Activity,
  BarChart3,
  Users,
  Trophy,
  Calendar,
  TrendingUp,
  Zap,
  Target,
  PieChart,
  Flame,
  Star,
} from 'lucide-react';

const navigation = [
  {
    name: 'Overview',
    items: [
      { name: 'Dashboard', href: '/', icon: Home },
      { name: 'Live Matches', href: '/live', icon: Activity, badge: '3' },
      { name: 'Schedule', href: '/schedule', icon: Calendar },
    ],
  },
  {
    name: 'Analytics',
    items: [
      { name: 'Win Probability', href: '/analytics/win-probability', icon: TrendingUp },
      { name: 'Pressure Index', href: '/analytics/pressure', icon: Zap },
      { name: 'Momentum', href: '/analytics/momentum', icon: Flame },
      { name: 'Match Insights', href: '/analytics/insights', icon: Target },
    ],
  },
  {
    name: 'Statistics',
    items: [
      { name: 'Player Stats', href: '/stats/players', icon: Users },
      { name: 'Team Rankings', href: '/stats/teams', icon: Trophy },
      { name: 'Leaderboards', href: '/stats/leaderboards', icon: Star },
      { name: 'Comparisons', href: '/stats/compare', icon: BarChart3 },
    ],
  },
  {
    name: 'Engagement',
    items: [
      { name: 'Predictions', href: '/predictions', icon: PieChart },
      { name: 'Simulator', href: '/simulator', icon: Target },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-16 bottom-0 w-64 bg-white dark:bg-primary-50 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
      <nav className="flex-1 px-4 py-6 space-y-8">
        {navigation.map((section) => (
          <div key={section.name}>
            <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {section.name}
            </h3>
            <ul className="mt-3 space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                        isActive
                          ? 'bg-secondary/10 text-secondary'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-primary-100'
                      }`}
                    >
                      <item.icon
                        className={`w-5 h-5 ${
                          isActive
                            ? 'text-secondary'
                            : 'text-gray-500 dark:text-gray-400 group-hover:text-secondary'
                        }`}
                      />
                      <span className="font-medium">{item.name}</span>
                      {item.badge && (
                        <span className="ml-auto px-2 py-0.5 text-xs font-semibold bg-danger text-white rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom Section - Quick Stats */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="bg-gradient-to-br from-secondary/10 to-accent/10 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Today&apos;s Highlights
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Live Matches</span>
              <span className="font-semibold text-secondary">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Upcoming</span>
              <span className="font-semibold text-accent">5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Completed</span>
              <span className="font-semibold text-gray-900 dark:text-white">12</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
