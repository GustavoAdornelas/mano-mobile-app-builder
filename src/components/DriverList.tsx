
import React, { useState } from 'react';
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
import { User, Phone, IdCard, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const DriverList = () => {
  const [drivers, setDrivers] = useState([
    {
      id: 1,
      nome: 'João Silva',
      matricula: '12345',
      telefone: '(11) 99999-9999',
      setor: 'Administrativo',
      status: 'Ativo',
      habilitacao: 'AB'
    },
    {
      id: 2,
      nome: 'Maria Santos',
      matricula: '12346',
      telefone: '(11) 88888-8888',
      setor: 'Vendas',
      status: 'Em Viagem',
      habilitacao: 'B'
    },
    {
      id: 3,
      nome: 'Pedro Costa',
      matricula: '12347',
      telefone: '(11) 77777-7777',
      setor: 'Operações',
      status: 'Ativo',
      habilitacao: 'AB'
    },
    {
      id: 4,
      nome: 'Ana Oliveira',
      matricula: '12348',
      telefone: '(11) 66666-6666',
      setor: 'RH',
      status: 'Ativo',
      habilitacao: 'B'
    },
    {
      id: 5,
      nome: 'Carlos Ferreira',
      matricula: '12349',
      telefone: '(11) 55555-5555',
      setor: 'TI',
      status: 'Em Viagem',
      habilitacao: 'AB'
    }
  ]);

  const getStatusColor = (status: string) => {
    return status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  const handleDeleteDriver = (driverId: number) => {
    const driverToDelete = drivers.find(driver => driver.id === driverId);
    setDrivers(drivers.filter(driver => driver.id !== driverId));
    toast.success(`Condutor ${driverToDelete?.nome} (matrícula: ${driverToDelete?.matricula}) foi removido com sucesso!`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {drivers.map((driver) => (
        <Card key={driver.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                {driver.nome}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(driver.status)}>
                  {driver.status}
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
                        Tem certeza que deseja excluir o condutor {driver.nome} (matrícula: {driver.matricula})? 
                        Esta ação não pode ser desfeita.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => handleDeleteDriver(driver.id)}
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
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <IdCard className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-600">Matrícula:</span>
                <span className="font-mono">{driver.matricula}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <span>{driver.telefone}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium text-gray-600">Setor:</span>
                <p>{driver.setor}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">CNH:</span>
                <p>{driver.habilitacao}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DriverList;
