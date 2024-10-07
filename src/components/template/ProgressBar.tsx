'use client';

import React from 'react';
import { FaUser, FaInfoCircle, FaMapMarkerAlt, FaPhone, FaUserTie, FaClipboardCheck } from 'react-icons/fa'; // Importando o novo ícone

interface ProgressBarProps {
  currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const steps = [
    { name: 'Dados Básicos', icon: FaUser },
    { name: 'Informação Adicional', icon: FaInfoCircle },
    { name: 'Endereço', icon: FaMapMarkerAlt },
    { name: 'Contato', icon: FaPhone },
    { name: 'Responsável', icon: FaUserTie },
    { name: 'Atividade', icon: FaClipboardCheck }, // Nova etapa adicionada
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="relative">
        {/* Barra de Progresso */}
        <div className="absolute top-1/2 left-[10%] w-[80%] h-0.5 bg-gray-200 transform -translate-y-1/2">
          <div
            className="absolute top-0 left-0 h-full bg-lime-600 transition-all duration-300 ease-in-out"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
        {/* Ícones e Texto */}
        <div className="relative z-10 flex justify-between items-center">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col items-center ${index < currentStep ? 'cursor-pointer' : ''}`}
              style={{ flex: 1, textAlign: 'center' }}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  index + 1 === currentStep
                    ? 'bg-lime-600 text-white'
                    : index + 1 < currentStep
                    ? 'bg-lime-200 text-lime-700'
                    : 'bg-gray-200 text-gray-500'
                } transition-all duration-300 ease-in-out`}
              >
                <step.icon className="w-5 h-5" />
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  index + 1 === currentStep ? 'text-lime-600' : 'text-gray-500'
                }`}
              >
                {step.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
