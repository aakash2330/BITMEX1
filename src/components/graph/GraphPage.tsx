"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { useDebounce } from "@/lib/debounce";
import SymbolSearch from "@/components/form/symbolForm";

const ReactEcharts = dynamic(() => import("echarts-for-react"), { ssr: false });
const upColor = "#ec0000";
const upBorderColor = "#8A0000";
const downColor = "#00da3c";
const downBorderColor = "#008F28";
// Each item: open，close，lowest，highest
function splitData(rawData: any) {
  const categoryData = [];
  const values = [];
  for (var i = 0; i < rawData.length; i++) {
    categoryData.push(rawData[i].splice(0, 1)[0]);
    values.push(rawData[i]);
  }
  return {
    categoryData: categoryData,
    values: values,
  };
}

export default function GraphPage({
  data,
  symbol,
}: {
  data: any;
  symbol: string;
}) {
  const data1 = splitData(data);
  return (
    <div>
      <div className="flex justify-center relative gap-2 text-white flex-col  items-center"></div>
      <ReactEcharts
        style={{ height: "40rem" }}
        option={{
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
            },
          },
          grid: {
            left: "10%",
            right: "10%",
            bottom: "15%",
          },
          xAxis: {
            type: "category",
            data: data1.categoryData,
            boundaryGap: false,
            axisLine: { onZero: false },
            splitLine: { show: false },
            min: "dataMin",
            max: "dataMax",
          },
          yAxis: {
            scale: true,
            splitArea: {
              show: true,
            },
          },
          dataZoom: [
            {
              type: "inside",
              start: 50,
              end: 100,
            },
            {
              show: true,
              type: "slider",
              top: "90%",
              start: 50,
              end: 100,
            },
          ],
          series: [
            {
              name: symbol,
              type: "candlestick",
              data: data1.values,
              itemStyle: {
                color: upColor,
                color0: downColor,
                borderColor: upBorderColor,
                borderColor0: downBorderColor,
              },

              markLine: {
                data: [
                  [
                    {
                      name: "from lowest to highest",
                      type: "min",
                      valueDim: "lowest",
                      symbol: "circle",
                      symbolSize: 2,
                      label: {
                        show: true,
                      },
                    },
                    {
                      type: "max",
                      valueDim: "highest",
                      symbol: "circle",
                      symbolSize: 2,
                      label: {
                        show: true,
                      },
                    },
                  ],
                ],
              },
            },
          ],
        }}
      />
    </div>
  );
}
