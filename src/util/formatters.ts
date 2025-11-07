import { differenceInDays, formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Formatação padrão BR (ex: "03/11/2025")
export const dateFormatter = new Intl.DateTimeFormat('pt-BR');

/**
 * Mostra quantos dias passaram desde a criação ou a data formatada,
 * dependendo se já se passaram 30 dias.
 */
export function formatProjectDate(createdAt: Date): string {
  const now = new Date();
  const days = differenceInDays(now, createdAt);

  if (days < 31) {
    // Mostra algo como "há 5 dias" ou "há cerca de 2 semanas"
    return formatDistance(createdAt, now, { locale: ptBR, addSuffix: true });
  } else {
    // Mostra a data formatada padrão
    return dateFormatter.format(createdAt);
  }
}
