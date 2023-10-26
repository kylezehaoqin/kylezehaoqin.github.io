import { useState, useRef, useEffect, useLayoutEffect } from "react";
import * as d3 from "d3";
import useResizeObserver from "../hooks/useResizeObserver";
import  dataset  from '../ToolboxJson.json'

type NodeData = d3.SimulationNodeDatum & {
  id: number;
  img: string;
  size: number;
  x?: number;
  y?: number;
  fx?: number | null; // fx is optional and can be a number
  fy?: number | null; // fy is optional and can be a number
}

type LinkData = d3.SimulationLinkDatum<NodeData> & {
  source: number;
  target: number;
}





export default function ToolBox() {

  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  // Right after the component mounts, capture and set the dimensions.
  useEffect(() => {
    if (containerRef.current) {
        setDimensions({
            width: containerRef.current.clientWidth,
            height: containerRef.current.clientHeight,
        });
    }
  }, []);


  useResizeObserver(containerRef, (entry) => {
    if (dimensions) {
      // Check if the change in size is significant
      const widthChange = Math.abs(entry.contentRect.width - dimensions.width) / dimensions.width;
      const heightChange = Math.abs(entry.contentRect.height - dimensions.height) / dimensions.height;

      if (widthChange > 0.1 || heightChange > 0.1) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    }
  });

  useLayoutEffect(() => {
    if (!svgRef.current || !dimensions) return;

    const svg = d3.select(svgRef.current)
            .attr('width', dimensions.width)
            .attr('height', dimensions.height);

    function dragstarted(event: d3.D3DragEvent<SVGImageElement, NodeData, unknown>, d: NodeData) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: d3.D3DragEvent<SVGImageElement, NodeData, unknown>, d: NodeData) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGImageElement, NodeData, unknown>, d: NodeData) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
    
    svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(dataset.links)
    .enter().append("line")
    // .style("stroke-width", 2.5)
    .style("stroke", "#cccccc")
    .style("stroke-width", 1);
    
    svg.append("g")
    .attr("class", "nodes")
    .selectAll("image")
    .data(dataset.nodes)
    .enter().append("image")
    .attr("xlink:href", d => d.img)
    .attr("width", d => d.size)
    .attr("height", d => d.size)
    .call(
      d3.drag<SVGImageElement, NodeData>()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended)
      );

    const simulation = d3.forceSimulation<NodeData>(dataset.nodes)
      .force("link",
        d3.forceLink(dataset.links)
          .distance(100)
          .id((d) => (d as NodeData).id)
      )
      .force("center", d3.forceCenter(dimensions.width / 2, dimensions.height / 2.3))
      .force("charge", d3.forceManyBody().strength(-100))
      // .force("x", d3.forceX(dimensions.width / 2).strength(-0.5))
      // .force("y", d3.forceY(dimensions.height / 2).strength(-0.5))

      .on("tick", ticked);

    // simulation.force<d3.ForceLink<NodeData, LinkData>>("link")?.links(dataset.links);

    function ticked() {
      svg.selectAll<SVGLineElement, LinkData>("line")
    .attr("x1", d => ((d.source as NodeData).x ?? 0))
    .attr("y1", d => ((d.source as NodeData).y ?? 0))
    .attr("x2", d => ((d.target as NodeData).x ?? 0))
    .attr("y2", d => ((d.target as NodeData).y ?? 0));


      svg.selectAll<SVGImageElement, NodeData>("image")
        .attr("x", d => (d.x ?? 0) - d.size / 2)
        .attr("y", d => (d.y ?? 0) - d.size / 2);
    }

    return () => {
        simulation.stop()
        svg.selectAll("*").remove();
      }

  },[dimensions]);

  return (
    <div className="tool-box" ref={containerRef}>
      {dimensions && 
        <svg className="" ref={svgRef} ></svg>
      }
    </div>
  );
}