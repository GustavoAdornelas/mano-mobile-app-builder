
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Car, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface VehicleFormProps {
  onBack: () => void;
}

const VehicleForm = ({ onBack }: VehicleFormProps) => {
  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    placa: '',
    ano: '',
    cor: '',
    hodometro: ''
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.marca || !formData.modelo || !formData.placa || !formData.ano || !formData.cor || !formData.hodometro) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    // Carregar veículos existentes
    const existingCars = JSON.parse(localStorage.getItem('vehicleControlCars') || '[]');
    
    // Verificar se a placa já existe
    const plateExists = existingCars.some(car => car.placa.toLowerCase() === formData.placa.toLowerCase());
    if (plateExists) {
      toast.error('Já existe um veículo cadastrado com essa placa');
      return;
    }

    // Criar novo veículo
    const newCar = {
      id: Date.now(),
      marca: formData.marca,
      modelo: formData.modelo,
      placa: formData.placa.toUpperCase(),
      ano: parseInt(formData.ano),
      cor: formData.cor,
      hodometro: parseInt(formData.hodometro),
      status: 'Disponível'
    };

    // Salvar no localStorage
    const updatedCars = [...existingCars, newCar];
    localStorage.setItem('vehicleControlCars', JSON.stringify(updatedCars));

    toast.success(`Veículo ${newCar.marca} ${newCar.modelo} cadastrado com sucesso!`);
    
    // Reset form
    setFormData({
      marca: '',
      modelo: '',
      placa: '',
      ano: '',
      cor: '',
      hodometro: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            onClick={onBack}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <div className="flex items-center gap-2">
            <Car className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Cadastrar Veículo</h1>
              <p className="text-gray-600">Adicione um novo veículo ao sistema</p>
            </div>
          </div>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="bg-blue-50 border-b">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
              <Car className="w-5 h-5 mr-2 text-blue-600" />
              Dados do Veículo
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="marca" className="text-sm font-medium text-gray-700">Marca *</Label>
                  <Input
                    id="marca"
                    value={formData.marca}
                    onChange={(e) => handleChange('marca', e.target.value)}
                    className="mt-1"
                    placeholder="Ex: Chevrolet"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="modelo" className="text-sm font-medium text-gray-700">Modelo *</Label>
                  <Input
                    id="modelo"
                    value={formData.modelo}
                    onChange={(e) => handleChange('modelo', e.target.value)}
                    className="mt-1"
                    placeholder="Ex: Onix"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="placa" className="text-sm font-medium text-gray-700">Placa *</Label>
                  <Input
                    id="placa"
                    value={formData.placa}
                    onChange={(e) => handleChange('placa', e.target.value.toUpperCase())}
                    className="mt-1"
                    placeholder="Ex: ABC-1234"
                    maxLength={8}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="ano" className="text-sm font-medium text-gray-700">Ano *</Label>
                  <Input
                    id="ano"
                    type="number"
                    value={formData.ano}
                    onChange={(e) => handleChange('ano', e.target.value)}
                    className="mt-1"
                    placeholder="Ex: 2023"
                    min="1900"
                    max="2030"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cor" className="text-sm font-medium text-gray-700">Cor *</Label>
                  <Select onValueChange={(value) => handleChange('cor', value)} value={formData.cor}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecione a cor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Branco">Branco</SelectItem>
                      <SelectItem value="Preto">Preto</SelectItem>
                      <SelectItem value="Prata">Prata</SelectItem>
                      <SelectItem value="Azul">Azul</SelectItem>
                      <SelectItem value="Vermelho">Vermelho</SelectItem>
                      <SelectItem value="Cinza">Cinza</SelectItem>
                      <SelectItem value="Verde">Verde</SelectItem>
                      <SelectItem value="Amarelo">Amarelo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="hodometro" className="text-sm font-medium text-gray-700">Hodômetro (km) *</Label>
                  <Input
                    id="hodometro"
                    type="number"
                    value={formData.hodometro}
                    onChange={(e) => handleChange('hodometro', e.target.value)}
                    className="mt-1"
                    placeholder="Ex: 15000"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold text-lg"
                >
                  <Car className="w-5 h-5 mr-2" />
                  Cadastrar Veículo
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VehicleForm;
