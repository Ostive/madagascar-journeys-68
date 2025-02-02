import { useState } from "react";
import { PhotoLibrary } from "@/components/admin/PhotoLibrary";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminMedia = () => {
  const [activeTab, setActiveTab] = useState("destinations");

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Médiathèque</h1>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="destinations">Destinations</TabsTrigger>
          <TabsTrigger value="circuits">Circuits</TabsTrigger>
          <TabsTrigger value="blogs">Articles</TabsTrigger>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
        </TabsList>

        <TabsContent value="destinations">
          <PhotoLibrary bucket="destinations" />
        </TabsContent>

        <TabsContent value="circuits">
          <PhotoLibrary bucket="circuits" />
        </TabsContent>

        <TabsContent value="blogs">
          <PhotoLibrary bucket="blogs" />
        </TabsContent>

        <TabsContent value="users">
          <PhotoLibrary bucket="users" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminMedia;