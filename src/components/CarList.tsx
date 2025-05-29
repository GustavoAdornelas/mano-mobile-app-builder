
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Car, Fuel, Calendar, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const initialCars = [
  {
    id: 1,
    marca: 'Chevrolet',
    modelo: 'Onix',
    placa: 'ABC-1234',
    ano: 2022,
    cor: 'Branco',
    status: 'Disponível',
    hodometro: 15000
  },
  {
    id: 2,
    marca: 'Volkswagen',
    modelo: 'Gol',
    placa: 'DEF-5678',
    ano: 2021,
    cor: 'Prata',
    status: 'Em Uso',
    hodometro: 22000
  },
  {
    id: 3,
    marca: 'Fiat',
    modelo: 'Uno',
    placa: 'GHI-9012',
    ano: 2020,
    cor: 'Azul',
    status: 'Disponível',
    hodometro: 35000
  },
  {
    id: 4,
    marca: 'Ford',
    modelo: 'Ka',
    placa: 'JKL-3456',
    ano: 2023,
    cor: 'Vermelho',
    status: 'Em Uso',
    hodometro: 8000
  }
];

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const savedCars = localStorage.getItem('vehicleControlCars');
    if (savedCars) {
      setCars(JSON.parse(savedCars));
    } else {
      setCars(initialCars);
      localStorage.setItem('vehicleControlCars', JSON.stringify(initialCars));
    }
  }, []);

  const getStatusColor = (status: string) => {
    return status === 'Disponível' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const handleDeleteCar = (carId: number) => {
    const carToDelete = cars.find(car => car.id === carId);
    const updatedCars = cars.filter(car => car.id !== carId);
    setCars(updatedCars);
    localStorage.setItem('vehicleControlCars', JSON.stringify(updatedCars));
    toast.success(`Veículo ${carToDelete?.marca} ${carToDelete?.modelo} (${carToDelete?.placa}) foi removido com sucesso!`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cars.map((car) => (
        <Card key={car.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Car className="w-5 h-5 text-blue-600" />
                {car.marca} {car.modelo}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(car.status)}>
                  {car.status}
                </Badge>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tem certeza que deseja excluir o veículo {car.marca} {car.modelo} (placa: {car.placa})? 
                        Esta ação não pode ser desfeita.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => handleDeleteCar(car.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Excluir
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium text-gray-600">Placa:</span>
                <p className="font-mono">{car.placa}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Cor:</span>
                <p>{car.cor}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>{car.ano}</span>
              </div>
              <div className="flex items-center gap-1">
                <Fuel className="w-4 h-4 text-gray-500" />
                <span>{car.hodometro.toLocaleString()} km</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CarList;
