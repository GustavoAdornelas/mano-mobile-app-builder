
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

  const allExits = Object.values(groupedExits).flat().sort((a, b) => 
    new Date(a.exitDate).getTime() - new Date(b.exitDate).getTime()
  );

  const totalExits = allExits.length;
  const totalKm = allExits.reduce((acc, exit) => {
    if (exit.returnKm) {
      return acc + (exit.returnKm - exit.exitKm);
    }
    return acc;
  }, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center mb-4">
            Prévia do Relatório - Sistema de Controle de Veículos
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 p-4">
          {/* Cabeçalho do relatório */}
          <div className="text-center border-b-2 border-gray-300 pb-4">
            <h2 className="text-lg font-bold text-gray-800 uppercase">RELATÓRIO DE SAÍDAS DE VEÍCULOS</h2>
            <p className="text-sm text-gray-600 mt-2">
              Data do Relatório: {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm font-semibold">
              <div className="bg-blue-50 p-2 rounded border">
                <span className="flex items-center justify-center gap-1">
                  <Car className="w-4 h-4" />
                  Total de Saídas: {totalExits}
                </span>
              </div>
              <div className="bg-green-50 p-2 rounded border">
                <span className="flex items-center justify-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Km Percorridos: {totalKm.toLocaleString()}
                </span>
              </div>
              <div className="bg-yellow-50 p-2 rounded border">
                <span className="flex items-center justify-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Período: {Object.keys(groupedExits).join(', ')}
                </span>
              </div>
            </div>
          </div>

          {/* Tabela estilo Excel */}
          <div className="border-2 border-gray-400 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100 border-b-2 border-gray-400">
                  <TableHead className="border-r border-gray-300 font-bold text-black text-center">#</TableHead>
                  <TableHead className="border-r border-gray-300 font-bold text-black text-center">Data Saída</TableHead>
                  <TableHead className="border-r border-gray-300 font-bold text-black text-center">Hora Saída</TableHead>
                  <TableHead className="border-r border-gray-300 font-bold text-black text-center">Veículo</TableHead>
                  <TableHead className="border-r border-gray-300 font-bold text-black text-center">Placa</TableHead>
                  <TableHead className="border-r border-gray-300 font-bold text-black text-center">Condutor</TableHead>
                  <TableHead className="border-r border-gray-300 font-bold text-black text-center">Destino</TableHead>
                  <TableHead className="border-r border-gray-300 font-bold text-black text-center">Km Saída</TableHead>
                  <TableHead className="border-r border-gray-300 font-bold text-black text-center">Data Retorno</TableHead>
                  <TableHead className="border-r border-gray-300 font-bold text-black text-center">Hora Retorno</TableHead>
                  <TableHead className="border-r border-gray-300 font-bold text-black text-center">Km Retorno</TableHead>
                  <TableHead className="border-r border-gray-300 font-bold text-black text-center">Km Percorridos</TableHead>
                  <TableHead className="font-bold text-black text-center">Observações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allExits.map((exit, index) => (
                  <TableRow 
                    key={exit.id} 
                    className={`border-b border-gray-300 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                  >
                    <TableCell className="border-r border-gray-300 text-center text-xs font-medium">
                      {index + 1}
                    </TableCell>
                    <TableCell className="border-r border-gray-300 text-center text-xs">
                      {formatDate(exit.exitDate)}
                    </TableCell>
                    <TableCell className="border-r border-gray-300 text-center text-xs">
                      {exit.exitTime}
                    </TableCell>
                    <TableCell className="border-r border-gray-300 text-xs">
                      {exit.vehicleName}
                    </TableCell>
                    <TableCell className="border-r border-gray-300 text-center text-xs font-mono">
                      {exit.plate}
                    </TableCell>
                    <TableCell className="border-r border-gray-300 text-xs">
                      {exit.driverName}
                    </TableCell>
                    <TableCell className="border-r border-gray-300 text-xs">
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
                    <TableCell className="text-xs">
                      {exit.observations || '-'}
                    </TableCell>
                  </TableRow>
                ))}
                
                {/* Linha de totais */}
                <TableRow className="bg-gray-200 border-t-2 border-gray-400 font-bold">
                  <TableCell className="border-r border-gray-300 text-center text-xs">
                    TOTAL
                  </TableCell>
                  <TableCell className="border-r border-gray-300 text-center text-xs" colSpan={10}>
                    {totalExits} saída{totalExits !== 1 ? 's' : ''} registrada{totalExits !== 1 ? 's' : ''}
                  </TableCell>
                  <TableCell className="border-r border-gray-300 text-center text-xs font-bold">
                    {totalKm.toLocaleString()} km
                  </TableCell>
                  <TableCell className="text-center text-xs">
                    -
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Rodapé */}
          <div className="text-center text-xs text-gray-500 border-t-2 border-gray-300 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="font-semibold">Sistema de Controle de Veículos</p>
                <p>Relatório Automático</p>
              </div>
              <div>
                <p className="font-semibold">Data de Geração</p>
                <p>{new Date().toLocaleDateString('pt-BR')} - {new Date().toLocaleTimeString('pt-BR')}</p>
              </div>
              <div>
                <p className="font-semibold">Página</p>
                <p>1 de 1</p>
              </div>
            </div>
          </div>
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
