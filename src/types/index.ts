export interface SolutionMetrics {
    boxesUsed: number;
    iteration: number;
    objective: number;
    runtime: number;
    efficiency: number;
    status: "idle" | "running" | "complete" | "error";
}
