import SymbolSearch from "@/components/form/symbolForm";
import GraphPage from "@/components/graph/GraphPage";
import axios from "axios";

function GetFormattedDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedDate = `${year}/${month}/${day}`;
  return formattedDate;
}

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  if (searchParams.symbol) {
    const { data } = await axios.post("http://localhost:3000/api/instrument", {
      symbol: searchParams.symbol,
    });
    const updatedData = data.data.map((s: any) => {
      return [
        GetFormattedDate(new Date(s.timestamp)),
        s.open,
        s.close,
        s.low,
        s.high,
      ];
    });
    return (
      <div key={Math.random()}>
        <SymbolSearch
          defaultSymbol={searchParams.symbol as string}
        ></SymbolSearch>
        <GraphPage data={updatedData}></GraphPage>
      </div>
    );
  } else return <SymbolSearch></SymbolSearch>;
}
