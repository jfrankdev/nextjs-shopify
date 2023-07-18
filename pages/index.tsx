import { useEffect } from "react";

export default function Home() {
  // redirect to ridge.com
  useEffect(() => {
    window.location.href = "https://www.ridge.com/";
  }
  , []);
  return <div />;
}