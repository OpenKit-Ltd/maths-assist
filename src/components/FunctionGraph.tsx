import Plotly from "plotly.js-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import { Data, Layout } from "plotly.js";

const Plot = createPlotlyComponent(Plotly);

interface FunctionGraphProps {
  // Function type can be a string expression like 'x^2' or a function like (x) => x*x
  functions: Array<{
    expression: string | ((x: number) => number);
    color?: string;
    name?: string;
  }>;
  xRange?: [number, number];
  yRange?: [number, number];
  title?: string;
  showGrid?: boolean;
  showAxis?: boolean;
  points?: Array<{
    x: number;
    y: number;
    label?: string;
    color?: string;
  }>;
  width?: number;
  height?: number;
  className?: string;
}

export function FunctionGraph({
  functions,
  xRange = [-10, 10],
  yRange,
  title = "Function Graph",
  showGrid = true,
  showAxis = true,
  points = [],
  width = 600,
  height = 400,
  className = "",
}: FunctionGraphProps) {
  // Generate points for each function
  const plotData: Data[] = functions.map((func, index) => {
    const step = (xRange[1] - xRange[0]) / 100;
    const x: number[] = [];
    const y: number[] = [];

    for (let i = xRange[0]; i <= xRange[1]; i += step) {
      x.push(i);

      if (typeof func.expression === "string") {
        // Parse the string expression (very basic implementation)
        // In a real app, you'd use a math expression parser library
        try {
          // Replace common math notations with JavaScript equivalents
          let jsExpression = func.expression
            .replace(/\^/g, "**") // Replace ^ with **
            .replace(/sin\(/g, "Math.sin(") // Replace sin with Math.sin
            .replace(/cos\(/g, "Math.cos(") // Replace cos with Math.cos
            .replace(/tan\(/g, "Math.tan(") // Replace tan with Math.tan
            .replace(/sqrt\(/g, "Math.sqrt(") // Replace sqrt with Math.sqrt
            .replace(/pi/g, "Math.PI"); // Replace pi with Math.PI

          // Create a function from the expression
          const evalFunc = new Function("x", `return ${jsExpression};`);
          y.push(evalFunc(i));
        } catch (error) {
          console.error(
            `Error evaluating expression "${func.expression}":`,
            error
          );
          y.push(NaN);
        }
      } else if (typeof func.expression === "function") {
        try {
          y.push(func.expression(i));
        } catch (error) {
          console.error("Error in function evaluation:", error);
          y.push(NaN);
        }
      }
    }

    return {
      x,
      y,
      type: "scatter" as const,
      mode: "lines",
      name: func.name || `Function ${index + 1}`,
      line: {
        color: func.color || getDefaultColor(index),
        width: 2,
      },
    };
  });

  // Add points if any
  if (points.length > 0) {
    plotData.push({
      x: points.map((p) => p.x),
      y: points.map((p) => p.y),
      type: "scatter" as const,
      mode: "text+markers",
      text: points.map((p) => p.label || ""),
      textposition: "top center",
      marker: {
        size: 8,
        color: points.map((p) => p.color || "red"),
      },
      name: "Points",
    });
  }

  // Calculate y-axis range if not provided
  let calculatedYRange = yRange;
  if (!calculatedYRange) {
    // Use a more type-safe approach to extract y values
    const allY = plotData.flatMap((series) => {
      // Check if 'y' property exists and is an array
      if ("y" in series && Array.isArray(series.y)) {
        return series.y.filter((val) => !isNaN(val as number));
      }
      return [];
    });

    if (allY.length > 0) {
      const minY = Math.min(...(allY as number[]));
      const maxY = Math.max(...(allY as number[]));
      const range = maxY - minY;
      calculatedYRange = [minY - range * 0.1, maxY + range * 0.1];
    } else {
      calculatedYRange = [-10, 10];
    }
  }

  return (
    <div className={className}>
      <Plot
        data={plotData}
        layout={
          {
            title: title,
            width: width,
            height: height,
            xaxis: {
              range: xRange,
              zeroline: true,
              showgrid: showGrid,
              showline: showAxis,
              showticklabels: showAxis,
            },
            yaxis: {
              range: calculatedYRange,
              zeroline: true,
              showgrid: showGrid,
              showline: showAxis,
              showticklabels: showAxis,
              scaleanchor: "x",
              scaleratio: 1,
            },
            margin: { l: 50, r: 50, b: 50, t: 80 },
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            hovermode: "closest",
          } as Partial<Layout>
        }
        config={{ responsive: true, displayModeBar: false }}
      />
    </div>
  );
}

// Helper function to get colors for multiple functions
function getDefaultColor(index: number): string {
  const colors = [
    "#1f77b4", // blue
    "#ff7f0e", // orange
    "#2ca02c", // green
    "#d62728", // red
    "#9467bd", // purple
    "#8c564b", // brown
    "#e377c2", // pink
    "#7f7f7f", // gray
    "#bcbd22", // olive
    "#17becf", // teal
  ];

  return colors[index % colors.length];
}
