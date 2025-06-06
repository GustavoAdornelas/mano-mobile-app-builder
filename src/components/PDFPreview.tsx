
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Download, X, Calendar, Car, User, MapPin } from 'lucide-react';
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
    // Simular download do PDF
    toast.success('PDF salvo com sucesso!');
    console.log('PDF sendo salvo com dados:', groupedExits);
    
    // Em um app mobile real, o PDF seria salvo em:
    // - Android: pasta Downloads (/storage/emulated/0/Download/)
    // - iOS: pasta Documents da app ou através do sistema de compartilhamento
    // Usando Capacitor, seria algo como:
    // import { Filesystem, Directory } from '@capacitor/filesystem';
    // await Filesystem.writeFile({
    //   path: 'relatorio-saidas.pdf',
    //   data: pdfData,
    //   directory: Directory.Documents
    // });
    
    onClose();
  };

  const totalExits = Object.values(groupedExits).flat().length;
  const totalKm = Object.values(groupedExits).flat().reduce((acc, exit) => {
    if (exit.returnKm) {
      return acc + (exit.returnKm - exit.exitKm);
    }
    return acc;
  }, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center mb-4">
            Prévia do Relatório - Sistema de Controle de Veículos
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 p-4">
          {/* Cabeçalho do relatório */}
          <div className="text-center border-b pb-4">
            <h2 className="text-lg font-semibold text-gray-800">Relatório de Saídas de Veículos</h2>
            <p className="text-sm text-gray-600 mt-1">
              Período: {Object.keys(groupedExits).join(', ')}
            </p>
            <div className="flex justify-center gap-6 mt-3 text-sm">
              <span className="flex items-center gap-1">
                <Car className="w-4 h-4" />
                Total de saídas: {totalExits}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Km percorridos: {totalKm.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Conteúdo por mês */}
          {Object.entries(groupedExits).map(([month, monthExits]) => (
            <div key={month} className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3 capitalize flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                {month}
                <span className="text-sm font-normal text-gray-500">
                  ({monthExits.length} saída{monthExits.length !== 1 ? 's' : ''})
                </span>
              </h3>
              
              <div className="space-y-3">
                {monthExits.map((exit, index) => (
                  <div key={exit.id} className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="font-semibold text-gray-800">
                          {exit.vehicleName} - {exit.plate}
                        </p>
                        <p className="text-gray-600 flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {exit.driverName}
                        </p>
                      </div>
                      
                      <div>
                        <p><strong>Saída:</strong> {formatDate(exit.exitDate)} às {exit.exitTime}</p>
                        <p><strong>Destino:</strong> {exit.destination}</p>
                        <p><strong>Km Saída:</strong> {exit.exitKm.toLocaleString()}</p>
                      </div>
                      
                      <div>
                        {exit.returnDate ? (
                          <>
                            <p><strong>Retorno:</strong> {formatDate(exit.returnDate)} às {exit.returnTime}</p>
                            <p><strong>Km Retorno:</strong> {exit.returnKm?.toLocaleString()}</p>
                            <p className="text-green-600"><strong>Km Percorridos:</strong> {((exit.returnKm || 0) - exit.exitKm).toLocaleString()}</p>
                          </>
                        ) : (
                          <p className="text-orange-600"><strong>Status:</strong> Em andamento</p>
                        )}
                      </div>
                    </div>
                    
                    {exit.observations && (
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <p className="text-xs"><strong>Observações:</strong> {exit.observations}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Rodapé */}
          <div className="text-center text-xs text-gray-500 border-t pt-4">
            <p>Relatório gerado em {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR')}</p>
            <p>Sistema de Controle de Veículos</p>
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
