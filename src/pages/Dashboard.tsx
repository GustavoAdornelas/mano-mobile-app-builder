
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, LogOut, UserPlus, CarFront, FileText } from 'lucide-react';
import CarList from '@/components/CarList';
import DriverList from '@/components/DriverList';
import VehicleControlForm from '@/components/VehicleControlForm';
import VehicleForm from '@/components/VehicleForm';
import DriverForm from '@/components/DriverForm';
import Reports from '@/pages/Reports';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [showControlForm, setShowControlForm] = useState(false);
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [showDriverForm, setShowDriverForm] = useState(false);
  const [showReports, setShowReports] = useState(false);

  if (showControlForm) {
    return (
      <VehicleControlForm 
        onLogout={onLogout}
        onBack={() => setShowControlForm(false)}
      />
    );
  }

  if (showVehicleForm) {
    return (
      <VehicleForm 
        onBack={() => setShowVehicleForm(false)}
      />
    );
  }

  if (showDriverForm) {
    return (
      <DriverForm 
        onBack={() => setShowDriverForm(false)}
      />
    );
  }

  if (showReports) {
    return (
      <Reports 
        onBack={() => setShowReports(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto p-3 sm:p-4 max-w-7xl">
        {/* Header - Mobile optimized */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 leading-tight">
            Sistema de Controle de Veículos
          </h1>
          <Button 
            onClick={onLogout}
            variant="outline"
            className="flex items-center gap-2 w-full sm:w-auto"
            size="sm"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>

        {/* Action Buttons - Mobile optimized grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-6">
          <Button 
            onClick={() => setShowVehicleForm(true)}
            variant="outline"
            className="bg-white hover:bg-gray-50 h-12 text-sm"
          >
            <CarFront className="w-4 h-4 mr-2" />
            Cadastrar Veículo
          </Button>
          
          <Button 
            onClick={() => setShowDriverForm(true)}
            variant="outline"
            className="bg-white hover:bg-gray-50 h-12 text-sm"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Cadastrar Condutor
          </Button>
          
          <Button 
            onClick={() => setShowReports(true)}
            variant="outline"
            className="bg-white hover:bg-gray-50 h-12 text-sm"
          >
            <FileText className="w-4 h-4 mr-2" />
            Relatórios
          </Button>
          
          <Button 
            onClick={() => setShowControlForm(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-12 text-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Saída
          </Button>
        </div>

        {/* Content sections - Mobile optimized spacing */}
        <div className="space-y-6 sm:space-y-8">
          <div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">Veículos</h2>
            <CarList />
          </div>
          
          <div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">Condutores</h2>
            <DriverList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
