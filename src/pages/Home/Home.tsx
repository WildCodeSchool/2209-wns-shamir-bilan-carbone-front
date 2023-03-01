import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { AGRIBALYSE_QUERY } from "../../gql/queries";
import { useNavigate } from "react-router-dom";

interface IFood {
  _i?: any;
  _id?: string;
  name?: string;
  group?: string;
  subgroup?: string;
  empreinte?: number;
}

const Home = () => {
  const [searchTerm, setSearchTerm] = useState<string | null>("");
  const [filteredData, setFilteredData] = useState<IFood[]>([]);
  const [allData, setAllData] = useState<IFood[]>([]);

  const { data, loading, error } = useQuery(AGRIBALYSE_QUERY, {
    onCompleted: ({ results }) => {
      setAllData(results);
      setFilteredData(results);
    },
  });

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    setFilteredData(
      allData.filter((carbonItem) =>
        carbonItem.name?.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  console.log(data);

  return (
    <div>
      <span>home component</span>
      <input
        value={searchTerm ?? ""}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Recherche"
      />
    </div>
  );
};

export default Home;
