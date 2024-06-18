export interface Toast {
    text: string,
    severity: Severity
}

export enum Severity {
    SUCCESS,
    ERROR,
    WARNING
}
