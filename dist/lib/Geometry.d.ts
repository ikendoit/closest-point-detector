declare const geometry: {
    calcLength: (point1: number[], point2: number[]) => number;
    getMirrorPointOnLine: (point1: number[], point2: number[], pointOrigin: number[]) => number[] | null;
    pointOnLine: (point1: number[], point2: number[], pointToCheck: number[], toFixedConst?: number) => boolean;
};
export default geometry;
