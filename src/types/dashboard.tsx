import type { NextPage } from 'next';
import { FiBox, FiUsers, FiCheckCircle, FiTrendingUp } from 'react-icons/fi';
import { VotingStats } from '@/types';
import React from 'react';

// Mock data based on the "Chairperson Dashboard" image
const stats: VotingStats = {
  totalProposals: 12,
  eligibleVoters: 9,
  votesCast: 5,
  votingActivity: 3, // This value from the image is ambiguous, representing it as is.
};

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: number | string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
    <div className={`p-3 rounded-full mr-4 ${color}`}>
      <Icon className="h-6 w-6 text-white" />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const DashboardPage: NextPage = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Chairperson Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={FiBox}
          label="Tổng đề xuất"
          value={stats.totalProposals}
          color="bg-blue-500"
        />
        <StatCard
          icon={FiUsers}
          label="Quyền biểu quyết"
          value={stats.eligibleVoters}
          color="bg-green-500"
        />
        <StatCard
          icon={FiCheckCircle}
          label="Đã vote"
          value={stats.votesCast}
          color="bg-yellow-500"
        />
        <StatCard
          icon={FiTrendingUp}
          label="Tỉ lệ đã vote"
          value={stats.votingActivity}
          color="bg-red-500"
        />
      </div>

      {/* The rest of the dashboard components (e.g., voter list) would go here */}
    </div>
  );
};

export default DashboardPage;
