
export enum CaseStatus {
  REVISION = 'En Revisión',
  PROGRAMADA = 'Programada',
  RESUELTO = 'Resuelto',
  PROCESO = 'En Proceso',
  PENDIENTE = 'Pendiente'
}

export interface Case {
  id: string;
  asunto: string;
  estado: CaseStatus;
  fecha: string;
  icon: string;
}

export interface Course {
  id: string;
  title: string;
  type: string;
  instructor: string;
  date: string;
  image: string;
}
