import { useAuth } from "../auth/AuthContext";

type ActiveNav = "home" | "editor" | "settings" | "login" | "logout";

interface NavigationBarProps {
  activeNav?: ActiveNav;
}

function getNavClass(activeNav: ActiveNav, item: ActiveNav): string {
  return activeNav === item ? "nav-link active" : "nav-link";
}

export default function NavigationBar({ activeNav = "home" }: NavigationBarProps) {

  const { isAuthenticated } = useAuth();

  return (
    <>
      <nav className="navbar navbar-light">
        <div className="container">
          <a className="navbar-brand" href="/public#">
            conduit
          </a>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <a className={getNavClass(activeNav, "home")} href="/public#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className={getNavClass(activeNav, "editor")} href="/public#/editor">
                <i className="ion-compose" />
                &nbsp;New Article
              </a>
            </li>
            <li className="nav-item">
              <a className={getNavClass(activeNav, "settings")} href="/public#/settings">
                <i className="ion-gear-a" />
                &nbsp;Settings
              </a>
            </li>
            <>
              {isAuthenticated ? (
                <li className="nav-item">
                  <a className={getNavClass(activeNav, "logout")} href="/public#/logout">
                    Logout
                  </a>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <a className={getNavClass(activeNav, "login")} href="/public#/login">
                      Sign in
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/public#/register">
                      Sign up
                    </a>
                  </li>
                </>
              )}
            </>
          </ul>
        </div>
      </nav>
    </>
  );
}
