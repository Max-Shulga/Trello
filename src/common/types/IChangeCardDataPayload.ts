import { ICard } from '../interfaces/ICard';

export type IChangeCardDataPayload = Partial<ICard> & { list_id: number };
