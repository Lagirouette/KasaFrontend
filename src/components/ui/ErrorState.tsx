import { ButtonLink } from "./Button";

type Props = {
  code: string;
  title: string;
  message: string;
  action?: React.ReactNode;
  details?: string;
};

export default function ErrorState({ code, title, message, action, details }: Props) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <h1>
        <span aria-hidden className="text-primary block text-8xl font-black tracking-tight sm:text-9xl">
          {code}
        </span>
        <span className="sr-only">{title}</span>
      </h1>
      <p className="mt-4 max-w-[300px] text-xs sm:max-w-[360px] sm:text-sm">{message}</p>
      {details && <p className="text-muted mt-2 text-xs">{details}</p>}
      <div className="mt-6 flex w-[220px] flex-col gap-3">
        {action}
        <ButtonLink href="/" size="sm">
          Accueil
        </ButtonLink>
        <ButtonLink href="/#logements" size="sm">
          Logements
        </ButtonLink>
      </div>
    </div>
  );
}
