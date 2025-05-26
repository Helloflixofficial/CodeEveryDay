import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import React from "react";

const Investment = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Investment Guide
        </h2>
        <Tabs defaultValue="plot" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="plot">Plot Investment</TabsTrigger>
            <TabsTrigger value="flat">Flat vs Plot</TabsTrigger>
          </TabsList>
          <TabsContent value="plot" className="p-6 bg-card rounded-lg shadow">
            <h3 className="text-2xl font-semibold mb-4">
              Is buying a plot a good investment?
            </h3>
            <p className="mb-4">
              Bhot sare log es topic per baat karna chata hai per soch mai pad
              jate hai ki kisse es bare mai baat kare to ab aap humhare sath
              judiye or apne investment ko bahter bnaiye.
            </p>
            <p>
              Plot ya land mai investment karna acha hota hai but depend karta
              ki aapne plot ya land es jagha select kiya hai. Hum aapke liye
              acha or bahter location ki talash ko pura karte hai or aapne
              investment ko ek ache return mai badalte hai.
            </p>
          </TabsContent>
          <TabsContent value="flat" className="p-6 bg-card rounded-lg shadow">
            <h3 className="text-2xl font-semibold mb-4">
              Is plot better than flat?
            </h3>
            <p className="mb-4">
              Humse se jayada tar log confuse he rhte hai ki kha invest kare
              plot mai ya flat mai. Aaj hum aapko batate hai ki hum es bare mai
              kya sochte hai.
            </p>
            <p>
              Humahre hisab se yeh puri trha aapke upper depend karta hai ji
              aapki need kya hai, plot ya land jyada kimat aur anukul ki
              sambhavna pardhan karta hai jabki flat aapki jarut ke hisab se
              aapko sambhavit roop se aasan financing pardhan karta hai.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Investment;
