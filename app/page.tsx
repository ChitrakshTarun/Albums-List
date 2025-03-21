import AlbumList from "@/components/AlbumList";
import PlaybackWidget from "@/components/PlaybackWidget";

const IndexPage = async () => {
  return (
    <div className="flex flex-1 flex-col m-4 lg:m-8">
      <AlbumList layout="list" />
      <PlaybackWidget />
    </div>
  );
};

export default IndexPage;
