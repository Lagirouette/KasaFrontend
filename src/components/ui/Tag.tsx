export default function Tag({ children }: { children: React.ReactNode }) {
  return <span className="bg-chip inline-flex h-7 items-center rounded-[5px] px-3 text-xs">{children}</span>;
}

export function TagList({ items, label }: { items: string[]; label?: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}
