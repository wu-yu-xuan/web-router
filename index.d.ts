declare module 'web-router' {
  interface History<State = {}> {
    readonly length: number;
    readonly state: State;
    back(): void;
    forward(): void;
    go(delta?: number): void;
    push(url: string, state?: State): void;
    replace(url: string, state?: State): void;
  }
  interface Location {
    readonly hash: string;
    readonly host: string;
    readonly hostname: string;
    readonly href: string;
    readonly pathname: string;
    readonly port: string;
    readonly protocol: string;
    readonly origin: string;
  }
  interface LinkProps
    extends Omit<
      React.DetailedHTMLProps<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
      >,
      'href'
    > {
    to: string;
  }
  function Link(props: LinkProps): React.ReactElement;
  interface RedirectProps {
    to: string;
    push?: boolean;
  }
  function Redirect(props: RedirectProps): React.ReactElement;
  function Router(props: React.PropsWithChildren<{}>): React.ReactElement;
  type Callback = (history: History, location: Location) => void;
  function useHistory<State = {}>(): History<State>;
  function useLocation(): Location;
  function useParams<T extends Params = Params>(): T;
  type RouteProps = React.PropsWithChildren<{ path: string }>;
  function Route(props: RouteProps): React.ReactElement;
  interface Params {
    [key: string]: string;
  }
  function Switch(): React.ReactElement;
}
