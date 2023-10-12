export interface Node extends d3.SimulationNodeDatum {
    id: string;
    parent?: string;
}

export interface Link {
    source: string;
    target: string;
}

export interface GraphData {
    nodes: Node[];
    links: Link[];
}

export interface NetworkVisualizationProps {
    data: GraphData;
}
