
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, LogOut, UserPlus, CarFront } from 'lucide-react';
import CarList from '@/components/CarList';
import DriverList from '@/components/DriverList';
import VehicleControlForm from '@/components/VehicleControlForm';
import VehicleForm from '@/components/VehicleForm';
import DriverForm from '@/components/DriverForm';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [showControlForm, setShowControlForm] = useState(false);
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [showDriverForm, setShowDriverForm] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Sistema de Controle de Veículos</h1>
          <Button 
            onClick={onLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>

        <div className="flex justify-end items-center mb-6 gap-2">
          <Button 
            onClick={() => setShowVehicleForm(true)}
            variant="outline"
            className="bg-white hover:bg-gray-50"
          >
            <CarFront className="w-4 h-4 mr-2" />
            Cadastrar Veículo
          </Button>
          
          <Button 
            onClick={() => setShowDriverForm(true)}
            variant="outline"
            className="bg-white hover:bg-gray-50"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Cadastrar Condutor
          </Button>
          
          <Button 
            onClick={() => setShowControlForm(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Saída
          </Button>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Veículos</h2>
            <CarList />
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Condutores</h2>
            <DriverList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
