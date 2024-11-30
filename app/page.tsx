import AlbumList from "@/components/AlbumList";

const IndexPage = () => {
  return (
    <div className="flex flex-1 flex-col mx-4 lg:mx-8">
      <AlbumList layout="list" />
    </div>
  );
};

export default IndexPage;
