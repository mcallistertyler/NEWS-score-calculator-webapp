export enum MeasurementType {
    TEMP = "TEMP",
    HR = "HR",
    RR = "RR",
}

interface Measurement {
    type: MeasurementType;
    value?: number;
}

export interface NewsMeasurementData {
    measurements: Measurement[];
}

export interface NewsMeasurementResponse {
    score: number;
}

