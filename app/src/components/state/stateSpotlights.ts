import { PARAIBA_SPOTLIGHT } from './paraibaSpotlight.data';

export type StateSpotlightContent = {
  label: string;
  title: string;
  description: string;
  pillars: string[];
};

export const STATE_SPOTLIGHTS: Record<string, StateSpotlightContent> = {
  PB: PARAIBA_SPOTLIGHT,
};
