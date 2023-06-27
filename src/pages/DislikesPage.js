import Card from "../components/UI/Card/Card";
import ArrowBtn from "../components/UI/Button/ArrowBtn";
import { useEffect } from "react";
import { useCtx } from "../context/appContext";
import GridGeneral from "../components/UI/Grid/GridGeneral";
import Loading from "../components/Loading/Loading";

export default function DislikesPage() {
  const { content, getInfoFromDatabase, loading } = useCtx();

  useEffect(() => {
    getInfoFromDatabase("dislikes");
  }, []);

  return (
    <Card>
      <ArrowBtn title="dislikes" />
      {loading && <Loading />}
      {!loading && <GridGeneral content={content} />}
    </Card>
  );
}
