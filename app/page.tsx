import React from "react"
import { redirect } from "next/navigation"

interface Props {
  className?: string;
}

const HomePage: React.FC<Props> = () => {
  redirect("/admin")
};

export default HomePage;