import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs: Crumb[];
  action?: React.ReactNode;
}

export default function PageHeader({ title, breadcrumbs, action }: PageHeaderProps) {
  return (
    <div className="page-header">
      <div>
        <h1 className="page-title">{title}</h1>
        <ul className="breadcrumb">
          {breadcrumbs.map((crumb, i) => (
            <li
              key={i}
              className={`breadcrumb-item ${i === breadcrumbs.length - 1 ? "active" : ""}`}
            >
              {crumb.href ? <Link href={crumb.href}>{crumb.label}</Link> : crumb.label}
            </li>
          ))}
        </ul>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}