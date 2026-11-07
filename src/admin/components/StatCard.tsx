import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon, ArrowUpRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
  trend?: string;
  trendPositive?: boolean;
  actionLink?: string;
  actionLabel?: string;
  iconBgColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  subtitle,
  trend,
  trendPositive = true,
  actionLink,
  actionLabel = 'Manage',
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-[#B69A69]/40 transition-all flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {title}
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
            {value}
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#B69A69] border border-amber-200/60 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-1.5 truncate">
          {trend && (
            <span
              className={`font-semibold ${
                trendPositive ? 'text-emerald-600' : 'text-slate-500'
              }`}
            >
              {trend}
            </span>
          )}
          {subtitle && <span className="text-slate-500 truncate">{subtitle}</span>}
        </div>

        {actionLink && (
          <Link
            to={actionLink}
            className="text-slate-600 hover:text-[#B69A69] font-semibold inline-flex items-center space-x-0.5 shrink-0 transition-colors py-1 px-1.5 -mr-1.5 rounded-lg hover:bg-slate-50 min-h-[36px]"
          >
            <span>{actionLabel}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default StatCard;

