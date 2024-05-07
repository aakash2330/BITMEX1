import SymbolSearch from "@/components/form/symbolForm";
import Graph1 from "@/components/graph/Graph1";
import GraphPage from "@/components/graph/GraphPage";
import { GetFormattedDate } from "@/lib/date";
import axios from "axios";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  if (searchParams.symbol) {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/instrument`,
      {
        symbol: searchParams.symbol,
      },
    );
    const updatedData = data.data.map((s: any) => {
      return [
        GetFormattedDate(new Date(s.timestamp)),
        s.open,
        s.close,
        s.low,
        s.high,
      ];
    });
    console.log({ updatedData });
    return (
      <div key={Math.random()}>
        <Graph1 dataUnrefined={data.data} data={updatedData}></Graph1>
      </div>
    );
  }
}
