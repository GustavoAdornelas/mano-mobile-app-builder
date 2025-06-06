
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Download, X, Calendar, Car, MapPin } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';

interface VehicleExit {
  id: number;
  vehicleId: number;
  driverId: number;
  vehicleName: string;
  driverName: string;
  plate: string;
  exitDate: string;
  exitTime: string;
  destination: string;
  exitKm: number;
  returnDate?: string;
  returnTime?: string;
  returnKm?: number;
  observations?: string;
}

interface PDFPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  groupedExits: { [key: string]: VehicleExit[] };
}

const PDFPreview = ({ isOpen, onClose, groupedExits }: PDFPreviewProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const downloadPDF = () => {
    toast.success('PDF salvo com sucesso!');
    console.log('PDF sendo salvo com dados:', groupedExits);
    onClose();
  };

  const allExits = Object.values(groupedExits).flat();
  
  // Agrupar por veículo
  const groupedByVehicle = allExits.reduce((acc: { [key: string]: VehicleExit[] }, exit) => {
    const vehicleKey = `${exit.vehicleName} - ${exit.plate}`;
    if (!acc[vehicleKey]) {
      acc[vehicleKey] = [];
    }
    acc[vehicleKey].push(exit);
    return acc;
  }, {});

  // Ordenar saídas por data dentro de cada veículo
  Object.keys(groupedByVehicle).forEach(vehicleKey => {
    groupedByVehicle[vehicleKey].sort((a, b) => 
      new Date(a.exitDate).getTime() - new Date(b.exitDate).getTime()
    );
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center mb-4">
            Prévia do Relatório - Sistema de Controle de Veículos
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-8 p-4">
          {/* Cabeçalho do relatório */}
          <div className="text-center border-b-2 border-gray-300 pb-4">
            <h2 className="text-lg font-bold text-gray-800 uppercase">RELATÓRIO DE SAÍDAS DE VEÍCULOS</h2>
            <p className="text-sm text-gray-600 mt-2">
              Data do Relatório: {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR')}
            </p>
          </div>

          {/* Relatório por veículo */}
          {Object.entries(groupedByVehicle).map(([vehicleKey, vehicleExits]) => {
            const firstExit = vehicleExits[0];
            const totalKmVehicle = vehicleExits.reduce((acc, exit) => {
              if (exit.returnKm) {
                return acc + (exit.returnKm - exit.exitKm);
              }
              return acc;
            }, 0);

            return (
              <div key={vehicleKey} className="break-after-page">
                {/* Informações do Veículo */}
                <div className="bg-blue-50 p-4 rounded border-2 border-blue-300 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-semibold">
                    <div className="flex items-center gap-2">
                      <Car className="w-5 h-5 text-blue-600" />
                      <span>Veículo: {firstExit.vehicleName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Placa: {firstExit.plate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Condutor: {firstExit.driverName}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-sm">
                    <div className="bg-white p-2 rounded border">
                      <span className="flex items-center justify-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Total de Saídas: {vehicleExits.length}
                      </span>
                    </div>
                    <div className="bg-white p-2 rounded border">
                      <span className="flex items-center justify-center gap-1">
                        <MapPin className="w-4 h-4" />
                        Km Percorridos: {totalKmVehicle.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tabela de saídas */}
                <div className="border-2 border-gray-400 rounded-lg overflow-hidden mb-6">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-100 border-b-2 border-gray-400">
                        <TableHead className="border-r border-gray-300 font-bold text-black text-center w-24">Data Saída</TableHead>
                        <TableHead className="border-r border-gray-300 font-bold text-black text-center w-20">Hora Saída</TableHead>
                        <TableHead className="border-r border-gray-300 font-bold text-black text-center w-32">Destino</TableHead>
                        <TableHead className="border-r border-gray-300 font-bold text-black text-center w-24">Km Saída</TableHead>
                        <TableHead className="border-r border-gray-300 font-bold text-black text-center w-24">Data Retorno</TableHead>
                        <TableHead className="border-r border-gray-300 font-bold text-black text-center w-20">Hora Retorno</TableHead>
                        <TableHead className="border-r border-gray-300 font-bold text-black text-center w-24">Km Retorno</TableHead>
                        <TableHead className="border-r border-gray-300 font-bold text-black text-center w-24">Km Percorridos</TableHead>
                        <TableHead className="font-bold text-black text-center">Observações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vehicleExits.map((exit, index) => (
                        <TableRow 
                          key={exit.id} 
                          className={`border-b border-gray-300 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                        >
                          <TableCell className="border-r border-gray-300 text-center text-xs">
                            {formatDate(exit.exitDate)}
                          </TableCell>
                          <TableCell className="border-r border-gray-300 text-center text-xs">
                            {exit.exitTime}
                          </TableCell>
                          <TableCell className="border-r border-gray-300 text-xs px-2">
                            {exit.destination}
                          </TableCell>
                          <TableCell className="border-r border-gray-300 text-center text-xs">
                            {exit.exitKm.toLocaleString()}
                          </TableCell>
                          <TableCell className="border-r border-gray-300 text-center text-xs">
                            {exit.returnDate ? formatDate(exit.returnDate) : '-'}
                          </TableCell>
                          <TableCell className="border-r border-gray-300 text-center text-xs">
                            {exit.returnTime || '-'}
                          </TableCell>
                          <TableCell className="border-r border-gray-300 text-center text-xs">
                            {exit.returnKm ? exit.returnKm.toLocaleString() : '-'}
                          </TableCell>
                          <TableCell className="border-r border-gray-300 text-center text-xs font-medium">
                            {exit.returnKm ? ((exit.returnKm - exit.exitKm).toLocaleString()) : '-'}
                          </TableCell>
                          <TableCell className="text-xs px-2">
                            {exit.observations || '-'}
                          </TableCell>
                        </TableRow>
                      ))}
                      
                      {/* Linha de totais do veículo */}
                      <TableRow className="bg-gray-200 border-t-2 border-gray-400 font-bold">
                        <TableCell className="border-r border-gray-300 text-center text-xs" colSpan={6}>
                          TOTAL DO VEÍCULO: {vehicleExits.length} saída{vehicleExits.length !== 1 ? 's' : ''} registrada{vehicleExits.length !== 1 ? 's' : ''}
                        </TableCell>
                        <TableCell className="border-r border-gray-300 text-center text-xs font-bold" colSpan={2}>
                          {totalKmVehicle.toLocaleString()} km
                        </TableCell>
                        <TableCell className="text-center text-xs">
                          -
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* Campo de assinatura */}
                <div className="border-2 border-gray-300 rounded-lg p-6 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-sm mb-4 text-center">ASSINATURA DO RESPONSÁVEL</h4>
                      <div className="border-b-2 border-gray-400 h-16 mb-2"></div>
                      <p className="text-xs text-center text-gray-600">
                        Nome: _________________________________
                      </p>
                      <p className="text-xs text-center text-gray-600 mt-1">
                        Data: ___/___/______
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-4 text-center">VISTO DA CHEFIA</h4>
                      <div className="border-b-2 border-gray-400 h-16 mb-2"></div>
                      <p className="text-xs text-center text-gray-600">
                        Nome: _________________________________
                      </p>
                      <p className="text-xs text-center text-gray-600 mt-1">
                        Data: ___/___/______
                      </p>
                    </div>
                  </div>
                </div>

                {/* Rodapé do veículo */}
                <div className="text-center text-xs text-gray-500 border-t border-gray-300 pt-4 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="font-semibold">Sistema de Controle de Veículos</p>
                      <p>Relatório por Veículo</p>
                    </div>
                    <div>
                      <p className="font-semibold">Veículo</p>
                      <p>{firstExit.vehicleName} - {firstExit.plate}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Data de Geração</p>
                      <p>{new Date().toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button 
            onClick={onClose}
            variant="outline"
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancelar
          </Button>
          <Button 
            onClick={downloadPDF}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          >
            <Download className="w-4 h-4" />
            Salvar PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PDFPreview;
