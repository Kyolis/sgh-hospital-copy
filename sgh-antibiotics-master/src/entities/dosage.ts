export enum DosageType {
  GREATER,
  FROM_TO,
  LESSER_OR_EQUAL
}

export class Dosage {
  type: DosageType;
  value: string;
  clcr: number;
  clcrLow: number;
  clcrHigh: number;
}
