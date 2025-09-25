import React from "react"
import { redirect } from "next/navigation"

interface Props {
  // Add any props that might be passed from parent components
}

const HomePage: React.FC<Props> = (props) => {
  redirect("/admin")
};

export default HomePage;