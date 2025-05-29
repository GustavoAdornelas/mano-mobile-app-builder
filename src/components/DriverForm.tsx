
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface DriverFormProps {
  onBack: () => void;
}

const DriverForm = ({ onBack }: DriverFormProps) => {
  const [formData, setFormData] = useState({
    nome: '',
    matricula: '',
    telefone: '',
    setor: '',
    habilitacao: ''
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.matricula || !formData.telefone || !formData.setor || !formData.habilitacao) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    // Carregar condutores existentes
    const existingDrivers = JSON.parse(localStorage.getItem('vehicleControlDrivers') || '[]');
    
    // Verificar se a matrícula já existe
    const matriculaExists = existingDrivers.some(driver => driver.matricula === formData.matricula);
    if (matriculaExists) {
      toast.error('Já existe um condutor cadastrado com essa matrícula');
      return;
    }

    // Verificar se a CNH já existe
    const cnhExists = existingDrivers.some(driver => driver.habilitacao === formData.habilitacao);
    if (cnhExists) {
      toast.error('Já existe um condutor cadastrado com essa CNH');
      return;
    }

    // Criar novo condutor
    const newDriver = {
      id: Date.now(),
      nome: formData.nome,
      matricula: formData.matricula,
      telefone: formData.telefone,
      setor: formData.setor,
      habilitacao: formData.habilitacao,
      status: 'Ativo'
    };

    // Salvar no localStorage
    const updatedDrivers = [...existingDrivers, newDriver];
    localStorage.setItem('vehicleControlDrivers', JSON.stringify(updatedDrivers));

    toast.success(`Condutor ${newDriver.nome} cadastrado com sucesso!`);
    
    // Reset form
    setFormData({
      nome: '',
      matricula: '',
      telefone: '',
      setor: '',
      habilitacao: ''
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
            <User className="w-8 h-8 text-green-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Cadastrar Condutor</h1>
              <p className="text-gray-600">Adicione um novo condutor ao sistema</p>
            </div>
          </div>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="bg-green-50 border-b">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
              <User className="w-5 h-5 mr-2 text-green-600" />
              Dados do Condutor
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nome" className="text-sm font-medium text-gray-700">Nome Completo *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => handleChange('nome', e.target.value)}
                  className="mt-1"
                  placeholder="Ex: João Silva Santos"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="matricula" className="text-sm font-medium text-gray-700">Matrícula *</Label>
                  <Input
                    id="matricula"
                    value={formData.matricula}
                    onChange={(e) => handleChange('matricula', e.target.value)}
                    className="mt-1"
                    placeholder="Ex: 123456"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="telefone" className="text-sm font-medium text-gray-700">Telefone *</Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) => handleChange('telefone', e.target.value)}
                    className="mt-1"
                    placeholder="Ex: (11) 99999-9999"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="setor" className="text-sm font-medium text-gray-700">Setor *</Label>
                  <Input
                    id="setor"
                    value={formData.setor}
                    onChange={(e) => handleChange('setor', e.target.value)}
                    className="mt-1"
                    placeholder="Ex: Administrativo"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="habilitacao" className="text-sm font-medium text-gray-700">CNH *</Label>
                  <Input
                    id="habilitacao"
                    value={formData.habilitacao}
                    onChange={(e) => handleChange('habilitacao', e.target.value)}
                    className="mt-1"
                    placeholder="Ex: 12345678901"
                    required
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-semibold text-lg"
                >
                  <User className="w-5 h-5 mr-2" />
                  Cadastrar Condutor
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DriverForm;
