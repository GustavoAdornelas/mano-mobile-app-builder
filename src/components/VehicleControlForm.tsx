import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LogOut, Car, ArrowLeft, Calendar, Clock, User, MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface VehicleControlFormProps {
  onLogout: () => void;
  onBack?: () => void;
  onNavigateToReports?: () => void;
}

const VehicleControlForm = ({ onLogout, onBack, onNavigateToReports }: VehicleControlFormProps) => {
  const [cars, setCars] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [formData, setFormData] = useState({
    // Saída
    dataInicio: '',
    horaInicio: '',
    hodometroInicio: '',
    lotacaoDestino: '',
    
    // Término
    dataTermino: '',
    horaTermino: '',
    hodometroTermino: '',
  });

  useEffect(() => {
    // Carregar veículos do localStorage
    const savedCars = localStorage.getItem('vehicleControlCars');
    if (savedCars) {
      setCars(JSON.parse(savedCars));
    }

    // Carregar condutores do localStorage
    const savedDrivers = localStorage.getItem('vehicleControlDrivers');
    if (savedDrivers) {
      setDrivers(JSON.parse(savedDrivers));
    }
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCarSelect = (carId: string) => {
    const car = cars.find(c => c.id === parseInt(carId));
    setSelectedCar(car);
  };

  const handleDriverSelect = (driverId: string) => {
    const driver = drivers.find(d => d.id === parseInt(driverId));
    setSelectedDriver(driver);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCar || !selectedDriver) {
      toast.error('Por favor, selecione um veículo e um condutor');
      return;
    }

    // Criar novo registro de saída
    const newExit = {
      id: Date.now(),
      vehicleId: selectedCar.id,
      driverId: selectedDriver.id,
      vehicleName: `${selectedCar.marca} ${selectedCar.modelo}`,
      driverName: selectedDriver.nome,
      plate: selectedCar.placa,
      exitDate: formData.dataInicio,
      exitTime: formData.horaInicio,
      destination: formData.lotacaoDestino,
      exitKm: parseInt(formData.hodometroInicio),
      returnDate: formData.dataTermino || undefined,
      returnTime: formData.horaTermino || undefined,
      returnKm: formData.hodometroTermino ? parseInt(formData.hodometroTermino) : undefined,
    };

    // Salvar no localStorage
    const existingExits = localStorage.getItem('vehicleControlExits');
    const exits = existingExits ? JSON.parse(existingExits) : [];
    exits.push(newExit);
    localStorage.setItem('vehicleControlExits', JSON.stringify(exits));

    console.log('Dados do controle salvos:', newExit);

    toast.success('Controle de saída registrado com sucesso!');
    
    // Redirecionar para relatórios após 1 segundo
    setTimeout(() => {
      if (onNavigateToReports) {
        onNavigateToReports();
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button 
                onClick={onBack}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
            )}
            <div className="flex items-center gap-2">
              <Car className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Controle de Saída de Veículos</h1>
                <p className="text-gray-600">Sistema de Controle Interno</p>
              </div>
            </div>
          </div>
          <Button 
            onClick={onLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Seleção de Veículo e Condutor */}
          <Tabs defaultValue="vehicle" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="vehicle">Selecionar Veículo</TabsTrigger>
              <TabsTrigger value="driver" disabled={!selectedCar}>Selecionar Condutor</TabsTrigger>
            </TabsList>
            
            <TabsContent value="vehicle" className="mt-6">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-blue-50 border-b">
                  <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                    <Car className="w-5 h-5 mr-2 text-blue-600" />
                    Selecione o Veículo
                  </CardTitle>
                  <CardDescription>
                    Escolha o veículo que será utilizado na saída
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="car-select" className="text-sm font-medium text-gray-700">Veículo Disponível</Label>
                      <Select onValueChange={handleCarSelect}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Selecione um veículo" />
                        </SelectTrigger>
                        <SelectContent>
                          {cars.filter(car => car.status === 'Disponível').map((car) => (
                            <SelectItem key={car.id} value={car.id.toString()}>
                              {car.marca} {car.modelo} - {car.placa}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {selectedCar && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">Veículo Selecionado:</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div><strong>Marca:</strong> {selectedCar.marca}</div>
                          <div><strong>Modelo:</strong> {selectedCar.modelo}</div>
                          <div><strong>Placa:</strong> {selectedCar.placa}</div>
                          <div><strong>Ano:</strong> {selectedCar.ano}</div>
                          <div><strong>Cor:</strong> {selectedCar.cor}</div>
                          <div><strong>Hodômetro:</strong> {selectedCar.hodometro.toLocaleString()} km</div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="driver" className="mt-6">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-green-50 border-b">
                  <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                    <User className="w-5 h-5 mr-2 text-green-600" />
                    Selecione o Condutor
                  </CardTitle>
                  <CardDescription>
                    Escolha o condutor responsável pelo veículo
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="driver-select" className="text-sm font-medium text-gray-700">Condutor Disponível</Label>
                      <Select onValueChange={handleDriverSelect}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Selecione um condutor" />
                        </SelectTrigger>
                        <SelectContent>
                          {drivers.filter(driver => driver.status === 'Ativo').map((driver) => (
                            <SelectItem key={driver.id} value={driver.id.toString()}>
                              {driver.nome} - Matrícula: {driver.matricula}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {selectedDriver && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">Condutor Selecionado:</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div><strong>Nome:</strong> {selectedDriver.nome}</div>
                          <div><strong>Matrícula:</strong> {selectedDriver.matricula}</div>
                          <div><strong>Telefone:</strong> {selectedDriver.telefone}</div>
                          <div><strong>Setor:</strong> {selectedDriver.setor}</div>
                          <div><strong>CNH:</strong> {selectedDriver.habilitacao}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Dados da Saída - só aparecem se veículo e condutor estiverem selecionados */}
          {selectedCar && selectedDriver && (
            <>
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
                          required
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
                          required
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
                        required
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
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Término */}
                <Card className="shadow-lg border-0">
                  <CardHeader className="bg-red-50 border-b">
                    <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-red-600" />
                      Término (Opcional)
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
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default VehicleControlForm;
