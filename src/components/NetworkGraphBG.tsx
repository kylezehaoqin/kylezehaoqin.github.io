import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import useWindowSize from '../hooks/useWindowSize';


type Node = d3.SimulationNodeDatum & {
  id: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
  r?: number;
  size: number;
};

type Link = d3.SimulationLinkDatum<Node> & {
  source: number | Node; // Allow source to be either number or Node
  target: number | Node; // Allow target to be either number or Node
};


const NetworkGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const {width, height} = useWindowSize();
  // console.log(width, height)

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    // const width = window.innerWidth;
    // const height = window.innerHeight;
    svg.attr("width", width).attr("height", height);

    const nodes: Node[] = Array.from({ length: 80 }, (_, index) => ({ id: index, size: 5 }));
    const links: Link[] = Array.from({ length: nodes.length - 1 }, (_, index) => ({
      source: index,
      target: Math.floor(Math.random() * (nodes.length - index)) + index,
    }));

    function handlePointerMove(event: MouseEvent) {
      const [x, y] = d3.pointer(event);
      nodes[0].fx = x - width / 2;
      nodes[0].fy = y - height / 2;
    }

    function ticked() {
      // Update link positions
      svg.selectAll<SVGLineElement, Link>("line")
        .attr("x1", (d) => (d.source as Node).x ?? 0)
        .attr("y1", (d) => (d.source as Node).y ?? 0)
        .attr("x2", (d) => (d.target as Node).x ?? 0)
        .attr("y2", (d) => (d.target as Node).y ?? 0);

      svg.selectAll<SVGCircleElement, Node>("circle")
        .attr("cx", (d) => d.x ?? 0)
        .attr("cy", (d) => d.y ?? 0);
    }

    function dragstarted(event: d3.D3DragEvent<SVGCircleElement, Node, unknown>, d: Node) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: d3.D3DragEvent<SVGCircleElement, Node, unknown>, d: Node) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGCircleElement, Node, unknown>, d: Node) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    const simulation = d3.forceSimulation<Node>(nodes)
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force('charge', d3.forceManyBody().strength(-60))
      .velocityDecay(0.05) // low friction
      .alphaTarget(0.01)
      .force('link', d3.forceLink(links)
        .distance(300)
        .id((d: d3.SimulationNodeDatum) => (d as Node).id)
      )
      .force("collide", d3.forceCollide(d => (d as Node).size + 1)
        // taking radius into account
        .radius((d: d3.SimulationNodeDatum) => (d as Node).id+1))
      .on('tick', ticked);

    
    let t = 0;
    d3.timer((elapsed) => {
      t = elapsed * 0.001; // update time variable
      // console.log(`Time: ${t}`);
      simulation.force('link', d3.forceLink(links)
        .distance(30 + Math.sin(t) * 50)
        .id((d: d3.SimulationNodeDatum) => (d as Node).id));
      
      const cx = width / 2;
      const cy = height / 2;
      // Rotate nodes
      // Use elapsed time to create a smooth rotation
      const angle = .001; 
      nodes.forEach((d) => {
        const dx = d.x || 0 - cx;
        const dy = d.y || 0 - cy;
        d.x = cx + dx * Math.cos(angle) - dy * Math.sin(angle);
        d.y = cy + dx * Math.sin(angle) + dy * Math.cos(angle);
      });
      
      simulation.force('x', d3.forceX().x(() => width / 2 - Math.sin(t) * 10));
      simulation.force('y', d3.forceY().y(() => height / 2 - Math.cos(t) * 30));
      simulation.force('collide', d3.forceCollide(100 + Math.sin(t) * 10))
      simulation.alpha(angle).restart(); // reheat the simulation
    });


    
    const drag = d3.drag<SVGCircleElement, Node>()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);

    // Create link elements
    svg.selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .style("stroke", "#000");

    // create node elements
    svg.selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", (d: d3.SimulationNodeDatum) => (d as Node).size)
      // .on("touchmove", event => event.preventDefault())
      // .on("pointermove", pointermoved)
      .on("mouseover", function(event: MouseEvent, d) {
        d3.select(this).attr("r", d.size * 2);  // Double the size on mouseover
      })
      .on("mouseout", function(event: MouseEvent, d) {
          d3.select(this).attr("r", d.size);  // Revert to original size on mouseout
      })
      .style("fill", "#fff")
      .call(drag)
    
    return () => {
      simulation.stop();
    };
  }, [width, height]);

  return (
    <svg 
      ref={svgRef} 
      style={{ top: 0, left: 0, position: 'absolute'}} 
      // width={window.innerWidth} 
      // height={window.innerHeight}
    />
  );
};

export default NetworkGraph;
