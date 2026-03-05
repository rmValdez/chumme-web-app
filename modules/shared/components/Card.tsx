import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "glass" | "glass-light" | "solid";
}

export const Card = ({ children, className, variant = "glass" }: CardProps) => {
  const baseStyles = "rounded-2xl p-6 transition-all duration-300";

  const variants = {
    glass: "glass hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]",
    "glass-light": "glass-light",
    solid: "bg-background-secondary border border-border-default",
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className || ""}`}>
      {children}
    </div>
  );
};
