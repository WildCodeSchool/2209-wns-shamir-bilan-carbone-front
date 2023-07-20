import { GETALL_CONS } from "../../gql/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { VictoryChart, VictoryLine, VictoryAxis } from "victory";

interface ConsumptionData {
  x: Date;
  y: number;
}

const Recap = () => {
  const { userId } = useParams<{ userId: any }>();

  const { loading, error, data } = useQuery(GETALL_CONS, {
    variables: { userId: parseInt(userId) },
  });
  console.log("dataFromDB", data);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred.</div>;
  }

  let consumptionData: ConsumptionData[] = [];
  if (data && data.getConsByUser) {
    consumptionData = data.getConsByUser.map((consumption: any) => ({
      x: new Date(consumption.createdAt),
      y: parseFloat(consumption.empreinte),
    }));

    console.log("consumptionData", consumptionData);
  }

  // const customTickFormat = (tick: any) => {
  //   return tick.toFixed(2);
  // };

  const minDate =
    consumptionData.length > 0 ? consumptionData[0].x : new Date();
  const maxDate =
    consumptionData.length > 0
      ? consumptionData[consumptionData.length - 1].x
      : new Date();

  return (
    <div>
      {/* {data && data.getConsByUser && (
        <ul>
          {data.getConsByUser.map((consumption: any) => (
            <li key={consumption.id}>
              {consumption.description} - {consumption.empreinte} -
              {consumption.createdAt}
            </li>
          ))}
        </ul>
      )} */}

      {data && data.getConsByUser && (
        <VictoryChart
          height={200}
          width={800}
          scale={{ x: "time", y: "linear" }}
          domain={{
            // x: [new Date("2023-05-01"), new Date("2023-06-30")],
            x: [minDate, maxDate],
            y: [0, 10],
          }}
        >
          <VictoryAxis tickFormat={(date) => date.toLocaleDateString()} />
          <VictoryAxis dependentAxis />
          <VictoryLine data={consumptionData} />
        </VictoryChart>
      )}
    </div>
  );
};
export default Recap;
