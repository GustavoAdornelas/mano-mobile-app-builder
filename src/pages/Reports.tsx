import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Download, Calendar } from 'lucide-react';
import PDFPreview from '@/components/PDFPreview';
import { toast } from 'sonner';

interface ReportsProps {
  onBack: () => void;
}

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

const Reports = ({ onBack }: ReportsProps) => {
  const [exits, setExits] = useState<VehicleExit[]>([]);
  const [groupedExits, setGroupedExits] = useState<{ [key: string]: VehicleExit[] }>({});
  const [showPDFPreview, setShowPDFPreview] = useState(false);

  useEffect(() => {
    const savedExits = localStorage.getItem('vehicleControlExits');
    if (savedExits) {
      const exitsData = JSON.parse(savedExits);
      setExits(exitsData);
      
      // Agrupar saídas por mês
      const grouped = exitsData.reduce((acc: { [key: string]: VehicleExit[] }, exit: VehicleExit) => {
        const date = new Date(exit.exitDate);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const monthName = date.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' });
        
        if (!acc[monthName]) {
          acc[monthName] = [];
        }
        acc[monthName].push(exit);
        return acc;
      }, {});
      
      setGroupedExits(grouped);
    }
  }, []);

  const generatePDF = () => {
    // Simular geração de PDF
    toast.success('PDF gerado com sucesso!');
    console.log('Gerando PDF com dados:', groupedExits);
  };

  const openPDFPreview = () => {
    setShowPDFPreview(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto p-3 sm:p-4 max-w-7xl">
        {/* Header - Mobile optimized */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Button 
              onClick={onBack}
              variant="outline"
              className="flex items-center gap-2 px-3 py-2"
              size="sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 leading-tight">
              Relatório de Saídas
            </h1>
          </div>
          
          <Button 
            onClick={openPDFPreview}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 w-full sm:w-auto"
            size="sm"
            disabled={Object.keys(groupedExits).length === 0}
          >
            <Download className="w-4 h-4" />
            Gerar PDF
          </Button>
        </div>

        {Object.keys(groupedExits).length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 text-sm sm:text-base">Nenhuma saída registrada ainda.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {Object.entries(groupedExits).map(([month, monthExits]) => (
              <Card key={month}>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-center gap-2 capitalize text-base sm:text-lg">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    {month}
                    <span className="text-xs sm:text-sm font-normal text-gray-500">
                      ({monthExits.length} saída{monthExits.length !== 1 ? 's' : ''})
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {monthExits.map((exit) => (
                      <div key={exit.id} className="border rounded-lg p-3 sm:p-4 bg-white">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
                          <div>
                            <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                              {exit.vehicleName} - {exit.plate}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-600">Condutor: {exit.driverName}</p>
                          </div>
                          
                          <div>
                            <p className="text-xs sm:text-sm"><strong>Saída:</strong> {formatDate(exit.exitDate)} às {exit.exitTime}</p>
                            <p className="text-xs sm:text-sm"><strong>Destino:</strong> {exit.destination}</p>
                            <p className="text-xs sm:text-sm"><strong>Km Saída:</strong> {exit.exitKm.toLocaleString()}</p>
                          </div>
                          
                          <div>
                            {exit.returnDate ? (
                              <>
                                <p className="text-xs sm:text-sm"><strong>Retorno:</strong> {formatDate(exit.returnDate)} às {exit.returnTime}</p>
                                <p className="text-xs sm:text-sm"><strong>Km Retorno:</strong> {exit.returnKm?.toLocaleString()}</p>
                                <p className="text-xs sm:text-sm"><strong>Km Percorridos:</strong> {((exit.returnKm || 0) - exit.exitKm).toLocaleString()}</p>
                              </>
                            ) : (
                              <p className="text-xs sm:text-sm text-orange-600"><strong>Status:</strong> Em andamento</p>
                            )}
                          </div>
                        </div>
                        
                        {exit.observations && (
                          <div className="mt-3 pt-3 border-t">
                            <p className="text-xs sm:text-sm"><strong>Observações:</strong> {exit.observations}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <PDFPreview 
        isOpen={showPDFPreview}
        onClose={() => setShowPDFPreview(false)}
        groupedExits={groupedExits}
      />
    </div>
  );
};

export default Reports;
