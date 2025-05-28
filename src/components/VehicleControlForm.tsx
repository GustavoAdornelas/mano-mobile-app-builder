
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Car, Calendar, Clock, User, MapPin, LogOut } from 'lucide-react';
import { toast } from 'sonner';

interface VehicleControlFormProps {
  onLogout: () => void;
}

const VehicleControlForm = ({ onLogout }: VehicleControlFormProps) => {
  const [formData, setFormData] = useState({
    // Dados do Veículo
    marca: '',
    modelo: '',
    placa: '',
    mesAno: '',
    
    // Saída
    dataInicio: '',
    horaInicio: '',
    hodometroInicio: '',
    lotacaoDestino: '',
    
    // Término
    dataTermino: '',
    horaTermino: '',
    hodometroTermino: '',
    
    // Condutor
    nomeLegal: '',
    matricula: '',
    rubrica: '',
    telefone: ''
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);
    toast.success('Controle de saída registrado com sucesso!');
    
    // Reset form
    setFormData({
      marca: '',
      modelo: '',
      placa: '',
      mesAno: '',
      dataInicio: '',
      horaInicio: '',
      hodometroInicio: '',
      lotacaoDestino: '',
      dataTermino: '',
      horaTermino: '',
      hodometroTermino: '',
      nomeLegal: '',
      matricula: '',
      rubrica: '',
      telefone: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Car className="w-6 h-6" />
                <CardTitle className="text-xl font-bold">Controle de Saída do Veículo</CardTitle>
              </div>
              <Button
                onClick={onLogout}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </CardHeader>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados do Veículo */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                <Car className="w-5 h-5 mr-2 text-blue-600" />
                Unidade de Lotação do veículo
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="marca" className="text-sm font-medium text-gray-700">Marca</Label>
                  <Input
                    id="marca"
                    value={formData.marca}
                    onChange={(e) => handleChange('marca', e.target.value)}
                    className="mt-1"
                    placeholder="Ex: Toyota"
                  />
                </div>
                <div>
                  <Label htmlFor="modelo" className="text-sm font-medium text-gray-700">Modelo</Label>
                  <Input
                    id="modelo"
                    value={formData.modelo}
                    onChange={(e) => handleChange('modelo', e.target.value)}
                    className="mt-1"
                    placeholder="Ex: Corolla"
                  />
                </div>
                <div>
                  <Label htmlFor="placa" className="text-sm font-medium text-gray-700">Placa</Label>
                  <Input
                    id="placa"
                    value={formData.placa}
                    onChange={(e) => handleChange('placa', e.target.value)}
                    className="mt-1"
                    placeholder="Ex: ABC-1234"
                  />
                </div>
                <div>
                  <Label htmlFor="mesAno" className="text-sm font-medium text-gray-700">Mês/Ano</Label>
                  <Input
                    id="mesAno"
                    value={formData.mesAno}
                    onChange={(e) => handleChange('mesAno', e.target.value)}
                    className="mt-1"
                    placeholder="Ex: 01/2024"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Início e Término */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Início */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-green-50 border-b">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-green-600" />
                  Início
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dataInicio" className="text-sm font-medium text-gray-700">Data</Label>
                    <Input
                      id="dataInicio"
                      type="date"
                      value={formData.dataInicio}
                      onChange={(e) => handleChange('dataInicio', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="horaInicio" className="text-sm font-medium text-gray-700">Hora</Label>
                    <Input
                      id="horaInicio"
                      type="time"
                      value={formData.horaInicio}
                      onChange={(e) => handleChange('horaInicio', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="hodometroInicio" className="text-sm font-medium text-gray-700">Hodômetro</Label>
                  <Input
                    id="hodometroInicio"
                    value={formData.hodometroInicio}
                    onChange={(e) => handleChange('hodometroInicio', e.target.value)}
                    className="mt-1"
                    placeholder="Ex: 15000"
                  />
                </div>
                <div>
                  <Label htmlFor="lotacaoDestino" className="text-sm font-medium text-gray-700">Lotação/Destino/Finalidade</Label>
                  <Input
                    id="lotacaoDestino"
                    value={formData.lotacaoDestino}
                    onChange={(e) => handleChange('lotacaoDestino', e.target.value)}
                    className="mt-1"
                    placeholder="Descreva o destino ou finalidade"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Término */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-red-50 border-b">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-red-600" />
                  Término
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dataTermino" className="text-sm font-medium text-gray-700">Data</Label>
                    <Input
                      id="dataTermino"
                      type="date"
                      value={formData.dataTermino}
                      onChange={(e) => handleChange('dataTermino', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="horaTermino" className="text-sm font-medium text-gray-700">Hora</Label>
                    <Input
                      id="horaTermino"
                      type="time"
                      value={formData.horaTermino}
                      onChange={(e) => handleChange('horaTermino', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="hodometroTermino" className="text-sm font-medium text-gray-700">Hodômetro</Label>
                  <Input
                    id="hodometroTermino"
                    value={formData.hodometroTermino}
                    onChange={(e) => handleChange('hodometroTermino', e.target.value)}
                    className="mt-1"
                    placeholder="Ex: 15100"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Condutor */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-blue-50 border-b">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Condutor
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="nomeLegal" className="text-sm font-medium text-gray-700">Nome Legal</Label>
                  <Input
                    id="nomeLegal"
                    value={formData.nomeLegal}
                    onChange={(e) => handleChange('nomeLegal', e.target.value)}
                    className="mt-1"
                    placeholder="Nome completo"
                  />
                </div>
                <div>
                  <Label htmlFor="matricula" className="text-sm font-medium text-gray-700">Matrícula</Label>
                  <Input
                    id="matricula"
                    value={formData.matricula}
                    onChange={(e) => handleChange('matricula', e.target.value)}
                    className="mt-1"
                    placeholder="Ex: 123456"
                  />
                </div>
                <div>
                  <Label htmlFor="rubrica" className="text-sm font-medium text-gray-700">Rubrica</Label>
                  <Input
                    id="rubrica"
                    value={formData.rubrica}
                    onChange={(e) => handleChange('rubrica', e.target.value)}
                    className="mt-1"
                    placeholder="Assinatura"
                  />
                </div>
                <div>
                  <Label htmlFor="telefone" className="text-sm font-medium text-gray-700">Telefone</Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) => handleChange('telefone', e.target.value)}
                    className="mt-1"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-semibold text-lg"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Registrar Controle de Saída
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default VehicleControlForm;
