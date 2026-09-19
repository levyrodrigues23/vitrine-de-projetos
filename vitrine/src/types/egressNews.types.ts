export interface EgressNews {
  id: string;
  title: string;
  description: string;
  protagonist: string;
  /** Data ISO (AAAA-MM-DD), para permitir ordenação e formatação consistentes. */
  date: string;
}
