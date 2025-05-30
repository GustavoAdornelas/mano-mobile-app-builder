
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    hodometro: 15000
  },
  {
    id: 2,
    marca: 'Volkswagen',
    modelo: 'Gol',
    placa: 'DEF-5678',
    ano: 2021,
    cor: 'Prata',
    hodometro: 22000
  },
  {
    id: 3,
    marca: 'Fiat',
    modelo: 'Uno',
    placa: 'GHI-9012',
    ano: 2020,
    cor: 'Azul',
    hodometro: 35000
  },
  {
    id: 4,
    marca: 'Ford',
    modelo: 'Ka',
    placa: 'JKL-3456',
    ano: 2023,
    cor: 'Vermelho',
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

  const handleDeleteCar = (carId: number) => {
    const carToDelete = cars.find(car => car.id === carId);
    const updatedCars = cars.filter(car => car.id !== carId);
    setCars(updatedCars);
    localStorage.setItem('vehicleControlCars', JSON.stringify(updatedCars));
    toast.success(`Veículo ${carToDelete?.marca} ${carToDelete?.modelo} (${carToDelete?.placa}) foi removido com sucesso!`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
      {cars.map((car) => (
        <Card key={car.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2 sm:pb-3">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2 flex-1 min-w-0">
                <Car className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                <span className="truncate">{car.marca} {car.modelo}</span>
              </CardTitle>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="h-7 w-7 sm:h-8 sm:w-8 text-red-600 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                  >
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-sm mx-auto">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-base">Confirmar exclusão</AlertDialogTitle>
                    <AlertDialogDescription className="text-sm">
                      Tem certeza que deseja excluir o veículo {car.marca} {car.modelo} (placa: {car.placa})? 
                      Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                    <AlertDialogCancel className="w-full sm:w-auto">Cancelar</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={() => handleDeleteCar(car.id)}
                      className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
                    >
                      Excluir
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3 pt-0">
            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
              <div>
                <span className="font-medium text-gray-600">Placa:</span>
                <p className="font-mono text-xs sm:text-sm">{car.placa}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Cor:</span>
                <p className="text-xs sm:text-sm">{car.cor}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                <span>{car.ano}</span>
              </div>
              <div className="flex items-center gap-1">
                <Fuel className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
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
