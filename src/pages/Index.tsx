
import React, { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import VehicleControlForm from '@/components/VehicleControlForm';
import { toast } from 'sonner';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username: string, password: string) => {
    // Simulação de autenticação simples
    if (username && password) {
      setIsLoggedIn(true);
      toast.success(`Bem-vindo, ${username}!`);
    } else {
      toast.error('Por favor, preencha todos os campos');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast.info('Você foi desconectado');
  };

  return (
    <>
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <VehicleControlForm onLogout={handleLogout} />
      )}
    </>
  );
};

export default Index;
