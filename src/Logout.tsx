import AppLayout from "./AppLayout";

export default function Logout() {
  return (
    <>
      <AppLayout activeNav="logout">
        <div className="container page">
          <p>Logging out...</p>
        </div>
      </AppLayout>
    </>
  );
}
