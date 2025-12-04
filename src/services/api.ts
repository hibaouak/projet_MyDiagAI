// API Service for Flask backend communication

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Types
export interface PatientInfo {
  name: string;
  age: number;
  gender: string;
}

export interface DiagnosticRequest {
  patient: PatientInfo;
  symptoms: string[];
}

export interface Disease {
  name: string;
  probability: number;
}

export interface DiagnosticResponse {
  diseases: Disease[];
  diagnosticId?: string;
}

// API Functions
export const submitDiagnostic = async (data: DiagnosticRequest): Promise<DiagnosticResponse> => {
  const response = await fetch(`${API_BASE_URL}/diagnostic`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Erreur lors du diagnostic');
  }

  return response.json();
};

export const getHistory = async (): Promise<any[]> => {
  const response = await fetch(`${API_BASE_URL}/history`);
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération de l\'historique');
  }

  return response.json();
};

export const getStatistics = async (): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/statistics`);
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des statistiques');
  }

  return response.json();
};
