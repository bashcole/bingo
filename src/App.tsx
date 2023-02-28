import * as React from "react";
import { Routes, Route } from "react-router-dom";

import "./index.css";
import Home from "@/views/Home";
import Shared from "@/views/Shared";
import Leaderboard from "@/views/Leaderboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import Login from "./views/Login";
import Logout from "./views/Logout";
import GuestRoute from "./utils/GuestRoute";
import {default as Layout} from '@/components/layouts/main';
import NoMatch from "@/views/NoMatch";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="login" element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="shared/:board_id" element={<Shared />} />
          <Route path="logout" element={<Logout/>} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}
