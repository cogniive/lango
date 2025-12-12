import { Fragment, PropsWithChildren, Suspense } from "react";
import Loading from "../loading";
import { Header } from "@/components";

const MainLayout = ({ children }: PropsWithChildren) => {

  return (
  <Fragment>
    <Header />
    <main className="h-full pt-[60px]">
      <Suspense fallback={<Loading />}>
        <div className="mx-auto h-full max-w-[1056px]">{children}</div>
      </Suspense>
    </main>
  </Fragment>
)};

export default MainLayout;
