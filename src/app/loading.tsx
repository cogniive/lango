import Image from "next/image";

export default function Loading() {
  return (
    <div className="h-full flex flex-col items-center justify-center min-h-screen">
      <div className="animate-pulse">
        <Image
          src="/mascot.svg"
          alt="Loading"
          width={120}
          height={120}
          className="animate-bounce"
        />
      </div>
      <p className="text-muted-foreground mt-4 text-lg">Loading...</p>
    </div>
  );
}
