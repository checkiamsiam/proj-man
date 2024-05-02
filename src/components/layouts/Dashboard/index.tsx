"use client";
import React from "react";
import { AppLayout } from "./Dashboard";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AppLayout>{children}</AppLayout>
    </div>
  );
};

export default DashboardLayout;
