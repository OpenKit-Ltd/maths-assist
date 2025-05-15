import React from "react";
import Plotly from "plotly.js-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import { Data, Layout } from "plotly.js";

const Plot = createPlotlyComponent(Plotly);

// Define shape types
type ShapeType = "rectangle" | "triangle" | "circle" | "pythagorean" | "custom";

interface ShapeProps {
  type: ShapeType;
  params: {
    // Rectangle
    width?: number;
    height?: number;

    // Triangle
    base?: number;
    height2?: number;
    sideA?: number;
    sideB?: number;
    sideC?: number;

    // Circle
    radius?: number;

    // Pythagorean
    a?: number;
    b?: number;

    // Custom
    points?: Array<[number, number]>;
  };
  showLabels?: boolean;
  title?: string;
  className?: string;
  width?: number;
  height?: number;
}

export function ShapeDiagram({
  type,
  params,
  showLabels = true,
  title = "",
  className = "",
  width = 500,
  height = 400,
}: ShapeProps) {
  // Create shape data and layout based on the type
  const createShapeData = () => {
    switch (type) {
      case "rectangle": {
        const { width = 4, height = 3 } = params;
        const vertices = [
          [0, 0],
          [width, 0],
          [width, height],
          [0, height],
          [0, 0],
        ];

        const data: Data[] = [
          {
            x: vertices.map((v) => v[0]),
            y: vertices.map((v) => v[1]),
            type: "scatter" as const,
            mode: "lines",
            line: { color: "blue", width: 2 },
            fill: "toself",
            fillcolor: "rgba(0, 0, 255, 0.1)",
            name: "Rectangle",
          },
        ];

        if (showLabels) {
          data.push({
            x: [width / 2],
            y: [0],
            text: [`${width}`],
            mode: "text",
            textposition: "bottom center",
            showlegend: false,
            hoverinfo: "none",
            type: "scatter" as const,
          });

          data.push({
            x: [0],
            y: [height / 2],
            text: [`${height}`],
            mode: "text",
            textposition: "middle left",
            showlegend: false,
            hoverinfo: "none",
            type: "scatter" as const,
          });
        }

        return {
          data,
          layout: {
            title: title || `Rectangle: ${width} × ${height}`,
            xaxis: { range: [-1, width + 1], zeroline: true },
            yaxis: {
              range: [-1, height + 1],
              zeroline: true,
              scaleanchor: "x",
            },
            showlegend: false,
          },
        };
      }

      case "triangle": {
        const { base = 4, height2 = 3 } = params;
        const vertices = [
          [0, 0],
          [base, 0],
          [0, height2],
          [0, 0],
        ];

        const data: Data[] = [
          {
            x: vertices.map((v) => v[0]),
            y: vertices.map((v) => v[1]),
            type: "scatter" as const,
            mode: "lines",
            line: { color: "green", width: 2 },
            fill: "toself",
            fillcolor: "rgba(0, 255, 0, 0.1)",
            name: "Triangle",
          },
        ];

        if (showLabels) {
          data.push({
            x: [base / 2],
            y: [0],
            text: [`${base}`],
            mode: "text",
            textposition: "bottom center",
            showlegend: false,
            hoverinfo: "none",
            type: "scatter" as const,
          });

          data.push({
            x: [0],
            y: [height2 / 2],
            text: [`${height2}`],
            mode: "text",
            textposition: "middle left",
            showlegend: false,
            hoverinfo: "none",
            type: "scatter" as const,
          });
        }

        return {
          data,
          layout: {
            title: title || `Triangle: base ${base}, height ${height2}`,
            xaxis: { range: [-1, base + 1], zeroline: true },
            yaxis: {
              range: [-1, height2 + 1],
              zeroline: true,
              scaleanchor: "x",
            },
            showlegend: false,
          },
        };
      }

      case "circle": {
        const { radius = 3 } = params;

        // Generate points for a circle
        const points = 100;
        const x: number[] = [];
        const y: number[] = [];

        for (let i = 0; i <= points; i++) {
          const angle = (i / points) * 2 * Math.PI;
          x.push(radius * Math.cos(angle));
          y.push(radius * Math.sin(angle));
        }

        const data: Data[] = [
          {
            x,
            y,
            type: "scatter" as const,
            mode: "lines",
            line: { color: "red", width: 2 },
            fill: "toself",
            fillcolor: "rgba(255, 0, 0, 0.1)",
            name: "Circle",
          },
        ];

        if (showLabels) {
          // Add radius label
          data.push({
            x: [radius / 2],
            y: [0],
            text: [`r = ${radius}`],
            mode: "text",
            showlegend: false,
            hoverinfo: "none",
            type: "scatter" as const,
          });

          // Add a line showing the radius
          data.push({
            x: [0, radius],
            y: [0, 0],
            type: "scatter" as const,
            mode: "lines",
            line: { color: "black", width: 1, dash: "dash" },
            showlegend: false,
          });
        }

        return {
          data,
          layout: {
            title: title || `Circle: radius ${radius}`,
            xaxis: { range: [-radius - 1, radius + 1], zeroline: true },
            yaxis: {
              range: [-radius - 1, radius + 1],
              zeroline: true,
              scaleanchor: "x",
            },
            showlegend: false,
          },
        };
      }

      case "pythagorean": {
        const { a = 3, b = 4 } = params;
        const c = Math.sqrt(a * a + b * b);

        // Create the right triangle
        const vertices = [
          [0, 0],
          [a, 0],
          [a, b],
          [0, 0],
        ];

        const data: Data[] = [
          {
            x: vertices.map((v) => v[0]),
            y: vertices.map((v) => v[1]),
            type: "scatter" as const,
            mode: "lines",
            line: { color: "blue", width: 2 },
            fill: "toself",
            fillcolor: "rgba(0, 0, 255, 0.1)",
            name: "Pythagorean Triangle",
          },
        ];

        if (showLabels) {
          // Label for side a
          data.push({
            x: [a / 2],
            y: [0],
            text: [`a = ${a}`],
            mode: "text",
            textposition: "bottom center",
            showlegend: false,
            hoverinfo: "none",
            type: "scatter" as const,
          });

          // Label for side b
          data.push({
            x: [a],
            y: [b / 2],
            text: [`b = ${b}`],
            mode: "text",
            textposition: "middle right",
            showlegend: false,
            hoverinfo: "none",
            type: "scatter" as const,
          });

          // Label for hypotenuse c
          data.push({
            x: [a / 2],
            y: [b / 2],
            text: [`c = ${c.toFixed(2)}`],
            mode: "text",
            textposition: "middle center",
            showlegend: false,
            hoverinfo: "none",
            type: "scatter" as const,
          });

          // Right angle marker
          data.push({
            x: [a, a - 0.5, a - 0.5],
            y: [0, 0, 0.5],
            type: "scatter" as const,
            mode: "lines",
            line: { color: "black", width: 1 },
            showlegend: false,
          });
        }

        // Add the Pythagorean theorem formula
        data.push({
          x: [a / 2],
          y: [-1],
          text: [`a² + b² = c²`],
          mode: "text",
          textposition: "bottom center",
          showlegend: false,
          hoverinfo: "none",
          type: "scatter" as const,
        });

        data.push({
          x: [a / 2],
          y: [-1.5],
          text: [`${a}² + ${b}² = ${c.toFixed(2)}²`],
          mode: "text",
          textposition: "bottom center",
          showlegend: false,
          hoverinfo: "none",
          type: "scatter" as const,
        });

        return {
          data,
          layout: {
            title:
              title ||
              `Pythagorean Triangle: a=${a}, b=${b}, c=${c.toFixed(2)}`,
            xaxis: { range: [-1, a + 1], zeroline: true },
            yaxis: { range: [-2, b + 1], zeroline: true, scaleanchor: "x" },
            showlegend: false,
          },
        };
      }

      case "custom": {
        const {
          points = [
            [0, 0],
            [1, 1],
            [2, 0],
            [0, 0],
          ],
        } = params;

        // Calculate bounds for the axes
        const xs = points.map((p) => p[0]);
        const ys = points.map((p) => p[1]);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);
        const rangeX = maxX - minX;
        const rangeY = maxY - minY;

        const data: Data[] = [
          {
            x: points.map((p) => p[0]),
            y: points.map((p) => p[1]),
            type: "scatter" as const,
            mode: "lines",
            line: { color: "purple", width: 2 },
            fill: "toself",
            fillcolor: "rgba(128, 0, 128, 0.1)",
            name: "Custom Shape",
          },
        ];

        return {
          data,
          layout: {
            title: title || "Custom Shape",
            xaxis: {
              range: [minX - rangeX * 0.1, maxX + rangeX * 0.1],
              zeroline: true,
            },
            yaxis: {
              range: [minY - rangeY * 0.1, maxY + rangeY * 0.1],
              zeroline: true,
              scaleanchor: "x",
            },
            showlegend: false,
          },
        };
      }

      default:
        return {
          data: [],
          layout: {
            title: "Invalid Shape Type",
            showlegend: false,
          },
        };
    }
  };

  const { data, layout } = createShapeData();

  return (
    <div className={className}>
      <Plot
        data={data}
        layout={
          {
            ...layout,
            width,
            height,
            margin: { l: 40, r: 40, b: 40, t: 60 },
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
          } as Partial<Layout>
        }
        config={{ responsive: true, displayModeBar: false }}
      />
    </div>
  );
}
