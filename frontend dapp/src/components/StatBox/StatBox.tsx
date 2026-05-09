import './StatBox.css';

interface StatBoxProps {
  title: string;
  value: string | number;
  icon?: string;
  trend?: 'up' | 'down';
  trendValue?: string;
  color?: 'primary' | 'success' | 'danger' | 'warning';
}

export function StatBox({
  title,
  value,
  icon,
  trend,
  trendValue,
  color = 'primary',
}: StatBoxProps) {
  return (
    <div className={`stat-box stat-box-${color}`}>
      {icon && <div className="stat-icon">{icon}</div>}
      <div className="stat-content">
        <div className="stat-title">{title}</div>
        <div className="stat-value">{value}</div>
        {trend && trendValue && (
          <div className={`stat-trend trend-${trend}`}>
            <span className="trend-icon">{trend === 'up' ? '📈' : '📉'}</span>
            <span>{trendValue}</span>
          </div>
        )}
      </div>
    </div>
  );
}
