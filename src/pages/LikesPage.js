import Card from "../components/UI/Card/Card";
import ArrowBtn from "../components/UI/Button/ArrowBtn";
import { useCtx } from "../context/appContext";
import { useEffect } from "react";
import GridGeneral from "../components/UI/Grid/GridGeneral";
import Loading from "../components/Loading/Loading";

export default function LikesPage() {
  const { content, getInfoFromDatabase, loading } = useCtx();

  useEffect(() => {
    getInfoFromDatabase("likes");
  }, []);

  return (
    <Card>
      <ArrowBtn title="likes" />
      {loading && <Loading />}
      {!loading && <GridGeneral content={content} />}
    </Card>
  );
}
