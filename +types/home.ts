export namespace Route {
  export interface LoaderArgs {
    request: Request;
    params: Record<string, string>;
  }
  
  export interface LoaderData {
    message: string;
  }
  
  export interface ComponentProps {
    loaderData: LoaderData;
    params: Record<string, string>;
  }
  
  export type MetaFunction = () => Array<
    | { title: string }
    | { name: string; content: string }
    | { property: string; content: string }
  >;
} 