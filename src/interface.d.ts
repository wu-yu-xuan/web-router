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
  type Callback = (history: History, location: Location) => void;
}
