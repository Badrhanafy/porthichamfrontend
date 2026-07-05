import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";



export default function About() {
  const [isVisible, setIsVisible] = useState(false);
 

  return (
    <section
      className="flex h-screen items-center justify-center bg-black px-6 sm:mt-20 md:px-12"
    >
      <h2>EL HACHIMI FILMS </h2>
      <h4>Beeind the lens</h4>
    </section>
  );
}