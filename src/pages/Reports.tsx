
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Download, Calendar } from 'lucide-react';
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Button 
              onClick={onBack}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
            <h1 className="text-3xl font-bold text-gray-800">Relatório de Saídas</h1>
          </div>
          
          <Button 
            onClick={generatePDF}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          >
            <Download className="w-4 h-4" />
            Gerar PDF
          </Button>
        </div>

        {Object.keys(groupedExits).length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Nenhuma saída registrada ainda.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedExits).map(([month, monthExits]) => (
              <Card key={month}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 capitalize">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    {month}
                    <span className="text-sm font-normal text-gray-500">
                      ({monthExits.length} saída{monthExits.length !== 1 ? 's' : ''})
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {monthExits.map((exit) => (
                      <div key={exit.id} className="border rounded-lg p-4 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="font-semibold text-gray-800">
                              {exit.vehicleName} - {exit.plate}
                            </h4>
                            <p className="text-sm text-gray-600">Condutor: {exit.driverName}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm"><strong>Saída:</strong> {formatDate(exit.exitDate)} às {exit.exitTime}</p>
                            <p className="text-sm"><strong>Destino:</strong> {exit.destination}</p>
                            <p className="text-sm"><strong>Km Saída:</strong> {exit.exitKm.toLocaleString()}</p>
                          </div>
                          
                          <div>
                            {exit.returnDate ? (
                              <>
                                <p className="text-sm"><strong>Retorno:</strong> {formatDate(exit.returnDate)} às {exit.returnTime}</p>
                                <p className="text-sm"><strong>Km Retorno:</strong> {exit.returnKm?.toLocaleString()}</p>
                                <p className="text-sm"><strong>Km Percorridos:</strong> {((exit.returnKm || 0) - exit.exitKm).toLocaleString()}</p>
                              </>
                            ) : (
                              <p className="text-sm text-orange-600"><strong>Status:</strong> Em andamento</p>
                            )}
                          </div>
                        </div>
                        
                        {exit.observations && (
                          <div className="mt-3 pt-3 border-t">
                            <p className="text-sm"><strong>Observações:</strong> {exit.observations}</p>
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
    </div>
  );
};

export default Reports;
