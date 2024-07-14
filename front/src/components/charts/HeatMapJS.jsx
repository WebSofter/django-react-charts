import { useEffect, useRef } from "react";
import h337 from 'heatmap.js'
const Heatmap = () => {
  const heatmapRef = useRef(null);

  useEffect(() => {
    if (heatmapRef.current && h337) {
      const heatmapInstance = h337.create({
        container: heatmapRef.current,
      });

      const points = [{ x: 50, y: 100, value: 10 }];

      heatmapInstance.setData({
        data: points,
        max: 100,
        config: {
          // radius: 50,
          renderer: "svg",
          gradient: {
            0: "rgb(255,0,0)",
          },
        //   maxOpacity: 1,
        //   minOpacity: 0,
        //   blur: 100,
        //   xField: "x",
        //   yField: "y",
        //   valueField: "value",
        //   plugins: {},
        },
      });
    }
  }, []);

  return (
    <div
      id="heatmapArea"
      ref={heatmapRef}
      style={{
        width: "400px",
        height: "400px",
        position: "relative",
        border: "black solid 4px",
        borderRadius: "50%",
      }}
    />
  );
};

export default Heatmap;
