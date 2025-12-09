import React, { Suspense, useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/authSlice";
import { toggleSidebar } from "../store/uiSlice";
import { fetchInventory, selectAllProducts } from "../store/inventorySlice";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  const { isSidebarOpen } = useAppSelector((state) => state.ui);
  const products = useAppSelector(selectAllProducts);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchInventory());
    }
  }, [dispatch, products.length]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: isSidebarOpen ? "250px" : "60px",
          backgroundColor: "#001529",
          color: "white",
          transition: "width 0.2s",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "1rem",
            fontWeight: "bold",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {isSidebarOpen ? "NexSales" : "NS"}
        </div>
        <nav style={{ flex: 1, padding: "1rem 0" }}>
          <Link
            to="/dashboard"
            style={{
              display: "block",
              padding: "0.75rem 1rem",
              color:
                location.pathname === "/dashboard"
                  ? "white"
                  : "rgba(255,255,255,0.65)",
              textDecoration: "none",
              backgroundColor:
                location.pathname === "/dashboard" ? "#1890ff" : "transparent",
            }}
          >
            {isSidebarOpen ? "Inventory" : "Inv"}
          </Link>
          <Link
            to="/dashboard/analytics"
            style={{
              display: "block",
              padding: "0.75rem 1rem",
              color: location.pathname.includes("analytics")
                ? "white"
                : "rgba(255,255,255,0.65)",
              textDecoration: "none",
              backgroundColor: location.pathname.includes("analytics")
                ? "#1890ff"
                : "transparent",
            }}
          >
            {isSidebarOpen ? "Analytics" : "Ana"}
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f0f2f5",
        }}
      >
        {/* Header */}
        <header
          style={{
            height: "64px",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 1.5rem",
            boxShadow: "0 1px 4px rgba(0,21,41,0.08)",
          }}
        >
          <button
            onClick={() => dispatch(toggleSidebar())}
            style={{
              cursor: "pointer",
              border: "none",
              background: "none",
              fontSize: "1.2rem",
            }}
          >
            ☰
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <span style={{ fontWeight: 500, color: "#555" }}>
              Welcome, {user?.name}
            </span>
            <button
              onClick={handleLogout}
              style={{
                padding: "0.4rem 1rem",
                border: "1px solid #ff4d4f",
                color: "#ff4d4f",
                borderRadius: "4px",
                cursor: "pointer",
                backgroundColor: "white",
                fontWeight: 600,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#ff4d4f";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.color = "#ff4d4f";
              }}
            >
              Logout
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div style={{ flex: 1, overflow: "auto", padding: "1.5rem" }}>
          <Suspense fallback={<div>Loading component...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
