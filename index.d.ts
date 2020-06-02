type ModaxInstanceActionClick = () => boolean | void;
type ModaxInstanceAction =
  | {
      text: string;
      action?: ModaxInstanceActionClick;
    }
  | string
  | ModaxInstanceActionClick;

type ModaxInstancePrompt = {
  placeholder?: string;
  value?: any;
  rows?: number | string;
  multline?: boolean;
  type?: string;
};

type ModaxInstanceDefaults = {
  okText: string;
  cancelText: string;
  titleText: string;
  loadingText: string;
  width: string | number;
  height: string | number;
  toastTime: number;
  toastAlign: "top" | "middle" | "bottom";
  shadow: "dark" | "light";
  placeholder: string;
};
interface ModaxInstance {
  show(closeOthers?: boolean): ModaxInstance;
  close(): ModaxInstance;
  title(text: string): ModaxInstance;
  content(text: string): ModaxInstance;
  action(act: ModaxInstanceAction): ModaxInstance;
  shadow(type: "light" | "dark" | boolean): ModaxInstance;
  escClose(val: boolean): ModaxInstance;
  shadowClose(val: boolean): ModaxInstance;
  ok(act: ModaxInstanceAction): ModaxInstance;
  ok(text: string, click?: ModaxInstanceActionClick): ModaxInstance;
  cancel(act: ModaxInstanceAction): ModaxInstance;
  cancel(text: string, click?: ModaxInstanceActionClick): ModaxInstance;
  width(val: string | number): ModaxInstance;

  // plugins
  toast(text: string, time?: number): ModaxInstance;
  middle(): ModaxInstance;
  bottom(): ModaxInstance;
  overlap(): ModaxInstance;
  loading(time?: number): ModaxInstance;
  prompt(opt: ModaxInstancePrompt): ModaxInstance;
  plugin(name: string, fn: () => void, opt?: any): ModaxInstance;
}

interface ModaxManager {
  (id?: string | number): ModaxInstance;
  close(id?: string | number): void;
  defaults: ModaxInstanceDefaults;
}

declare const Modax: ModaxManager;
export default Modax;
