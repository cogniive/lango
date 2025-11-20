import { Fragment, PropsWithChildren } from "react";
import { Header } from "@/components";

const MainLayout = ({ children }: PropsWithChildren) => (
  <Fragment>
    <Header />

    <main className="h-full pt-[60px]">
      <div className="mx-auto h-full max-w-[1056px]">{children}</div>
    </main>
  </Fragment>
);

export default MainLayout;
