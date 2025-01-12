import { PhotoLibrary } from "@/components/admin/PhotoLibrary";

const AdminMedia = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Médiathèque</h1>
      <PhotoLibrary showSelect={false} />
    </div>
  );
};

export default AdminMedia;